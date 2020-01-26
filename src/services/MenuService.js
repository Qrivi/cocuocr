import Axios from 'axios'
import moment from 'moment'
import dayRepository from '../domain/repositories/DayRepository'
import Constants from '../constants'
import OcrService from './OcrService'
import Logger from '../utils/Logger'
import Tools from '../utils/Tools'

const ocrService = new OcrService()

export default class MenuService {
  static async fetchCurrentMenuImageUrl () {
    try {
      return await Axios.get(Constants.CORDA_MENU_HOMEPAGE)
        .then(response => response.data.match(Constants.CORDA_MENU_REGEX)[0])
    } catch (error) {
      throw new Error('The Corda Cuisine website appears to be offline')
    }
  }

  static async fetchAsBuffer (url) {
    try {
      return Axios.get(url, { responseType: 'arraybuffer' })
        .then(response => Buffer.from(response.data, 'binary'))
    } catch (error) {
      throw new Error('The Corda Cuisine responded in a weird fashion')
    }
  }

  // Test method below
  static async getCurrent () {
    let menu

    try {
      menu = await Axios.get(Constants.CORDA_MENU_HOMEPAGE)
        .then(response => response.data.match(Constants.CORDA_MENU_REGEX)[0])
        .then(image => Axios.get(image, { responseType: 'arraybuffer' }))
        .then(response => Buffer.from(response.data, 'binary'))
    } catch (error) {
      throw new Error('The Corda Cuisine website appears to be offline')
    }

    await ocrService.init(menu)

    const results = await Promise.all([
      ocrService.read(Constants.MONDAY_DATA),
      ocrService.read(Constants.TUESDAY_DATA),
      ocrService.read(Constants.WEDNESDAY_DATA),
      ocrService.read(Constants.THURSDAY_DATA),
      ocrService.read(Constants.FRIDAY_DATA),
    ])

    await ocrService.kill()

    return results
  }

  // Test method below
  static async testRepository () {
    const testDay = {
      date: new Date(),
      soup: 'lekkere soep',
      main: 'friet met frietjes',
      vegetarian: 'beetje gras',
      wpp: 'ronde pizza',
    }

    return dayRepository.create(testDay)
  }

  static async fetchMenuPersistently () {
    Logger.log('MenuService', 'Attempting to update the database with this week\'s menu data…')

    const weekNumber = moment().isoWeek()
    const menuUrl = await this.fetchCurrentMenuImageUrl()
    if (!menuUrl.includes(`${weekNumber}-scaled`)) {
      const timeout = process.env.FETCH_TIMEOUT || Constants.DEFAULT_FETCH_TIMEOUT
      Logger.warning('MenuService', `Website doesn't have the menu for this week — rechecking in ${timeout / 60} minutes`)
      await Tools.sleep(timeout)
      return this.fetchMenuPersistently()
    }

    const menuBuffer = await this.fetchAsBuffer(menuUrl)
    await ocrService.init(menuBuffer)
    const results = (await Promise.all([
      ocrService.read(Constants.RECURRING_DATA),
      ocrService.read(Constants.MONDAY_DATA),
      ocrService.read(Constants.TUESDAY_DATA),
      ocrService.read(Constants.WEDNESDAY_DATA),
      ocrService.read(Constants.THURSDAY_DATA),
      ocrService.read(Constants.FRIDAY_DATA),
    ])).map(result => Tools.flatten(result))
    await ocrService.kill()

    moment.locale('nl')
    const thisWeek = {
      data: {
        week: weekNumber,
        year: moment().year(),
        image: menuBuffer.toString('base64'),
        url: menuUrl,
        fetched: moment(),
      },
      monday: {
        ...results[1],
        date: moment(results[1].date, 'D/MMM').add(8, 'hours'),
      },
      tuesday: {
        ...results[2],
        date: moment(results[2].date, 'D/MMM').add(8, 'hours'),
      },
      wednesday: {
        ...results[3],
        date: moment(results[3].date, 'D/MMM').add(8, 'hours'),
      },
      thursday: {
        ...results[4],
        date: moment(results[4].date, 'D/MMM').add(8, 'hours'),
      },
      friday: {
        ...results[5],
        date: moment(results[5].date, 'D/MMM').add(8, 'hours'),
      },
      recurring: results[0],
    }

    return thisWeek
  }
}
