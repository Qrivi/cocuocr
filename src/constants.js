export default class Constants {
  static get TESSERACT_WORKERS () {
    // Specifies how many workers to create for Tesseract.js. More is faster (but also heavier?).
    return 5
  }

  static get CORDA_MENU_HOMEPAGE () {
    return 'https://corda.be/corda-cuisine/'
  }

  static get CORDA_MENU_REGEX () {
    return /https:\/\/corda\.be\/wp-content\/uploads\/\d{4}\/\d{2}\/\d{4}-corda-cuisine-\d{1,2}-[a-z-]+-\d{1,2}-scaled\.jpg/mi
  }

  static get MONDAY_SOUP_BOX () {
    return { day: 'Monday', type: 'soup', top: 344, left: 470, width: 430, height: 105 }
  }

  static get TUESDAY_SOUP_BOX () {
    return { day: 'Tuesday', type: 'soup', top: 344, left: 900, width: 430, height: 105 }
  }

  // TODO add other boxes
}
