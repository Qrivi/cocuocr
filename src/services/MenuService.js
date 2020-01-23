import Axios from 'axios'
import Constants from '../constants'
import OcrService from './OcrService'

const ocrService = new OcrService()

export default class MenuService {
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

    const results = {
      monday: await ocrService.read(Constants.MONDAY_DATA),
      tuesday: await ocrService.read(Constants.TUESDAY_DATA),
      wednesday: await ocrService.read(Constants.WEDNESDAY_DATA),
      thursday: await ocrService.read(Constants.THURSDAY_DATA),
      friday: await ocrService.read(Constants.FRIDAY_DATA)
    }

    ocrService.kill()

    return results
  }
}
