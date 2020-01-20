import Ocr from '../utils/Ocr'
import Constants from '../constants'

export default class MenuService {
  static async getCurrent () {
    return Ocr.readMenu([Constants.MONDAY_SOUP_BOX, Constants.TUESDAY_SOUP_BOX])
  }
}
