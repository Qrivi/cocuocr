import Axios from 'axios'
import dayRepository from '../domain/repositories/DayRepository'
import Constants from '../constants'
import OcrService from './OcrService'
import Logger from '../utils/Logger'

const ocrService = new OcrService()

export default class MenuService {
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
      ocrService.read(Constants.FRIDAY_DATA)
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
      wpp: 'ronde pizza'
    }

    return dayRepository.create(testDay)
  }

  static async fetchMenuPersistently () {
    Logger.log('tmp', 'This bad boy is not yet implemented')
  }
}
