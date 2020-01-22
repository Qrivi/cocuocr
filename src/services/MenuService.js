import Axios from 'axios'
import Ocr from '../utils/Ocr'
import Constants from '../constants'

const ocr = new Ocr()

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

    await ocr.init(menu)

    const results = {
      monday: await ocr.read(Constants.MONDAY_DATA, 'Monday'),
      tuesday: await ocr.read(Constants.TUESDAY_DATA, 'Tuesday'),
      wednesday: await ocr.read(Constants.WEDNESDAY_DATA, 'Wednesday'),
      thursday: await ocr.read(Constants.THURSDAY_DATA, 'Thursday'),
      friday: await ocr.read(Constants.FRIDAY_DATA, 'Friday')
    }

    ocr.kill()

    return results
  }
}
