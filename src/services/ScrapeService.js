import Axios from 'axios'
import moment from 'moment'
import Constants from '../constants'
import MenuService from './MenuService'
import OcrService from './OcrService'
import Logger from '../utils/Logger'
import Tools from '../utils/Tools'

const ocrService = new OcrService()

export default class ScrapeService {
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

  static async fetchMenuPersistently () {
    Logger.log('ScrapeService', 'Attempting to update the database with this week\'s menu data…')

    const weekNumber = moment().isoWeek()
    const menuUrl = await ScrapeService.fetchCurrentMenuImageUrl()
    if (!menuUrl.includes(`${weekNumber}-scaled`)) {
      const timeout = process.env.FETCH_TIMEOUT || Constants.DEFAULT_FETCH_TIMEOUT
      Logger.warning('ScrapeService', `Website doesn't have the menu for this week — rechecking in ${timeout / 60} minutes`)
      await Tools.sleep(timeout)
      return ScrapeService.fetchMenuPersistently()
    }

    if (await MenuService.exists(menuUrl)) {
      Logger.warning('ScrapeService', 'It appears data from this week\'s menu was already processed before — aborting')
      return false
    }

    try {
      const menuBuffer = await ScrapeService.fetchAsBuffer(menuUrl)
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
        week: {
          week: weekNumber,
          year: moment().year(),
          image: menuBuffer.toString('base64'),
          url: menuUrl,
          fetched: moment(),
          recurring: results[0],
        },
        monday: {
          ...results[1],
          date: moment(results[1].date, 'D/MMM').hour(8),
        },
        tuesday: {
          ...results[2],
          date: moment(results[2].date, 'D/MMM').hour(8),
        },
        wednesday: {
          ...results[3],
          date: moment(results[3].date, 'D/MMM').hour(8),
        },
        thursday: {
          ...results[4],
          date: moment(results[4].date, 'D/MMM').hour(8),
        },
        friday: {
          ...results[5],
          date: moment(results[5].date, 'D/MMM').hour(8),
        },
      }

      return MenuService.insertWeek(thisWeek)
    } catch (error) {
      // Failing cron job silently. 🤫
    }
  }
}
