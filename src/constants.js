export default class Constants {
  // This file should not be edited (often): tweakable defaults can be set in a .env file.

  static get DEFAULT_PORT () {
    return 8080
  }

  static get DEFAULT_MONGO_URL () {
    return 'mongodb://localhost:27017/cocudb'
  }

  static get DEFAULT_CRON_SCHEDULE () {
    return '0 7 * * 1' // When the app should check the Corda Cuisine website for a menu update.
  }

  static get DEFAULT_TESSERACT_WORKERS () {
    return 5 // Amount of Tesseract.js process an image. More is faster (but also heavier? 5 seems to be the sweet spot).
  }

  static get CORDA_MENU_HOMEPAGE () {
    return 'https://corda.be/corda-cuisine/'
  }

  static get CORDA_MENU_REGEX () {
    return /https:\/\/corda\.be\/wp-content\/uploads\/\d{4}\/\d{2}\/\d{4}-corda-cuisine-\d{1,2}-[a-z-]+-\d{1,2}-scaled\.jpg/mi
  }

  static get MENU_OFFSET () {
    return 470 // Horizontal offset from the left to the first column.
  }

  static get DATE_OFFSET () {
    return 175 // Vertical offset from the top to the row with the dates.
  }

  static get SOUP_OFFSET () {
    return 345 // Vertical offset from the top to the soup row.
  }

  static get DISH_OFFSET () {
    return 700 // Vertical offset from the top to the dishes row.
  }

  static get RECT_WIDTH () {
    return 405 // The width of a column on the menu.
  }

  static get DATE_HEIGHT () {
    return 55 // Height of a rectangle containing the date.
  }

  static get SOUP_HEIGHT () {
    return 100 // Height of a rectangle containing a soup.
  }

  static get DISH_HEIGHT () {
    return 137 // Height of a rectangle containing a dish.
  }

  static get RECURRING_SOUP_HEIGHT () {
    return 88 // Height of a rectangle containing a recurring soup.
  }

  static get RECT_MARGIN () {
    return -5 // Extra space around the "standard" rectangle to search for text.
  }

  static get RECURRING_DATA () {
    return {
      tomatoSoup: {
        top: this.SOUP_OFFSET + this.SOUP_HEIGHT - this.RECT_MARGIN,
        left: this.MENU_OFFSET,
        width: this.RECT_WIDTH * 5,
        height: this.RECURRING_SOUP_HEIGHT + this.RECT_MARGIN * 2
      },
      vegetarianSoup: {
        top: this.SOUP_OFFSET + this.SOUP_HEIGHT - this.RECT_MARGIN + this.RECURRING_SOUP_HEIGHT,
        left: this.MENU_OFFSET,
        width: this.RECT_WIDTH * 5,
        height: this.RECURRING_SOUP_HEIGHT + this.RECT_MARGIN * 2
      },
      bigBoySoup: {
        top: this.SOUP_OFFSET + this.SOUP_HEIGHT - this.RECT_MARGIN + this.RECURRING_SOUP_HEIGHT * 2,
        left: this.MENU_OFFSET,
        width: this.RECT_WIDTH * 5,
        height: this.RECURRING_SOUP_HEIGHT + this.RECT_MARGIN * 2
      }
    }
  }

  static get MONDAY_DATA () {
    return {
      date: {
        top: this.DATE_OFFSET - this.RECT_MARGIN,
        left: this.MENU_OFFSET - this.RECT_MARGIN,
        width: this.RECT_WIDTH + this.RECT_MARGIN * 2,
        height: this.DATE_HEIGHT + this.RECT_MARGIN * 2
      },
      soup: {
        top: this.SOUP_OFFSET - this.RECT_MARGIN,
        left: this.MENU_OFFSET - this.RECT_MARGIN,
        width: this.RECT_WIDTH + this.RECT_MARGIN * 2,
        height: this.SOUP_HEIGHT + this.RECT_MARGIN * 2
      },
      main: {
        top: this.DISH_OFFSET - this.RECT_MARGIN,
        left: this.MENU_OFFSET - this.RECT_MARGIN,
        width: this.RECT_WIDTH + this.RECT_MARGIN * 2,
        height: this.DISH_HEIGHT + this.RECT_MARGIN * 2
      },
      vegetarian: {
        top: this.DISH_OFFSET - this.RECT_MARGIN + this.DISH_HEIGHT,
        left: this.MENU_OFFSET - this.RECT_MARGIN,
        width: this.RECT_WIDTH + this.RECT_MARGIN * 2,
        height: this.DISH_HEIGHT + this.RECT_MARGIN * 2
      },
      wpp: {
        top: this.DISH_OFFSET - this.RECT_MARGIN + this.DISH_HEIGHT * 2,
        left: this.MENU_OFFSET - this.RECT_MARGIN,
        width: this.RECT_WIDTH + this.RECT_MARGIN * 2,
        height: this.DISH_HEIGHT + this.RECT_MARGIN * 2
      }
    }
  }

  static get TUESDAY_DATA () {
    return {
      date: {
        top: this.DATE_OFFSET - this.RECT_MARGIN,
        left: this.MENU_OFFSET - this.RECT_MARGIN + this.RECT_WIDTH,
        width: this.RECT_WIDTH + this.RECT_MARGIN * 2,
        height: this.DATE_HEIGHT + this.RECT_MARGIN * 2
      },
      soup: {
        top: this.SOUP_OFFSET - this.RECT_MARGIN,
        left: this.MENU_OFFSET - this.RECT_MARGIN + this.RECT_WIDTH,
        width: this.RECT_WIDTH + this.RECT_MARGIN * 2,
        height: this.SOUP_HEIGHT + this.RECT_MARGIN * 2
      },
      main: {
        top: this.DISH_OFFSET - this.RECT_MARGIN,
        left: this.MENU_OFFSET - this.RECT_MARGIN + this.RECT_WIDTH,
        width: this.RECT_WIDTH + this.RECT_MARGIN * 2,
        height: this.DISH_HEIGHT + this.RECT_MARGIN * 2
      },
      vegetarian: {
        top: this.DISH_OFFSET - this.RECT_MARGIN + this.DISH_HEIGHT,
        left: this.MENU_OFFSET - this.RECT_MARGIN + this.RECT_WIDTH,
        width: this.RECT_WIDTH + this.RECT_MARGIN * 2,
        height: this.DISH_HEIGHT + this.RECT_MARGIN * 2
      },
      wpp: {
        top: this.DISH_OFFSET - this.RECT_MARGIN + this.DISH_HEIGHT * 2,
        left: this.MENU_OFFSET - this.RECT_MARGIN + this.RECT_WIDTH,
        width: this.RECT_WIDTH + this.RECT_MARGIN * 2,
        height: this.DISH_HEIGHT + this.RECT_MARGIN * 2
      }
    }
  }

  static get WEDNESDAY_DATA () {
    return {
      date: {
        top: this.DATE_OFFSET - this.RECT_MARGIN,
        left: this.MENU_OFFSET - this.RECT_MARGIN + this.RECT_WIDTH * 2,
        width: this.RECT_WIDTH + this.RECT_MARGIN * 2,
        height: this.DATE_HEIGHT + this.RECT_MARGIN * 2
      },
      soup: {
        top: this.SOUP_OFFSET - this.RECT_MARGIN,
        left: this.MENU_OFFSET - this.RECT_MARGIN + this.RECT_WIDTH * 2,
        width: this.RECT_WIDTH + this.RECT_MARGIN * 2,
        height: this.SOUP_HEIGHT + this.RECT_MARGIN * 2
      },
      main: {
        top: this.DISH_OFFSET - this.RECT_MARGIN,
        left: this.MENU_OFFSET - this.RECT_MARGIN + this.RECT_WIDTH * 2,
        width: this.RECT_WIDTH + this.RECT_MARGIN * 2,
        height: this.DISH_HEIGHT + this.RECT_MARGIN * 2
      },
      vegetarian: {
        top: this.DISH_OFFSET - this.RECT_MARGIN + this.DISH_HEIGHT,
        left: this.MENU_OFFSET - this.RECT_MARGIN + this.RECT_WIDTH * 2,
        width: this.RECT_WIDTH + this.RECT_MARGIN * 2,
        height: this.DISH_HEIGHT + this.RECT_MARGIN * 2
      },
      wpp: {
        top: this.DISH_OFFSET - this.RECT_MARGIN + this.DISH_HEIGHT * 2,
        left: this.MENU_OFFSET - this.RECT_MARGIN + this.RECT_WIDTH * 2,
        width: this.RECT_WIDTH + this.RECT_MARGIN * 2,
        height: this.DISH_HEIGHT + this.RECT_MARGIN * 2
      }
    }
  }

  static get THURSDAY_DATA () {
    return {
      date: {
        top: this.DATE_OFFSET - this.RECT_MARGIN,
        left: this.MENU_OFFSET - this.RECT_MARGIN + this.RECT_WIDTH * 3,
        width: this.RECT_WIDTH + this.RECT_MARGIN * 2,
        height: this.DATE_HEIGHT + this.RECT_MARGIN * 2
      },
      soup: {
        top: this.SOUP_OFFSET - this.RECT_MARGIN,
        left: this.MENU_OFFSET - this.RECT_MARGIN + this.RECT_WIDTH * 3,
        width: this.RECT_WIDTH + this.RECT_MARGIN * 2,
        height: this.SOUP_HEIGHT + this.RECT_MARGIN * 2
      },
      main: {
        top: this.DISH_OFFSET - this.RECT_MARGIN,
        left: this.MENU_OFFSET - this.RECT_MARGIN + this.RECT_WIDTH * 3,
        width: this.RECT_WIDTH + this.RECT_MARGIN * 2,
        height: this.DISH_HEIGHT + this.RECT_MARGIN * 2
      },
      vegetarian: {
        top: this.DISH_OFFSET - this.RECT_MARGIN + this.DISH_HEIGHT,
        left: this.MENU_OFFSET - this.RECT_MARGIN + this.RECT_WIDTH * 3,
        width: this.RECT_WIDTH + this.RECT_MARGIN * 2,
        height: this.DISH_HEIGHT + this.RECT_MARGIN * 2
      },
      wpp: {
        top: this.DISH_OFFSET - this.RECT_MARGIN + this.DISH_HEIGHT * 2,
        left: this.MENU_OFFSET - this.RECT_MARGIN + this.RECT_WIDTH * 3,
        width: this.RECT_WIDTH + this.RECT_MARGIN * 2,
        height: this.DISH_HEIGHT + this.RECT_MARGIN * 2
      }
    }
  }

  static get FRIDAY_DATA () {
    return {
      date: {
        top: this.DATE_OFFSET - this.RECT_MARGIN,
        left: this.MENU_OFFSET - this.RECT_MARGIN + this.RECT_WIDTH * 4,
        width: this.RECT_WIDTH + this.RECT_MARGIN * 2,
        height: this.DATE_HEIGHT + this.RECT_MARGIN * 2
      },
      soup: {
        top: this.SOUP_OFFSET - this.RECT_MARGIN,
        left: this.MENU_OFFSET - this.RECT_MARGIN + this.RECT_WIDTH * 4,
        width: this.RECT_WIDTH + this.RECT_MARGIN * 2,
        height: this.SOUP_HEIGHT + this.RECT_MARGIN * 2
      },
      main: {
        top: this.DISH_OFFSET - this.RECT_MARGIN,
        left: this.MENU_OFFSET - this.RECT_MARGIN + this.RECT_WIDTH * 4,
        width: this.RECT_WIDTH + this.RECT_MARGIN * 2,
        height: this.DISH_HEIGHT + this.RECT_MARGIN * 2
      },
      vegetarian: {
        top: this.DISH_OFFSET - this.RECT_MARGIN + this.DISH_HEIGHT,
        left: this.MENU_OFFSET - this.RECT_MARGIN + this.RECT_WIDTH * 4,
        width: this.RECT_WIDTH + this.RECT_MARGIN * 2,
        height: this.DISH_HEIGHT + this.RECT_MARGIN * 2
      },
      wpp: {
        top: this.DISH_OFFSET - this.RECT_MARGIN + this.DISH_HEIGHT * 2,
        left: this.MENU_OFFSET - this.RECT_MARGIN + this.RECT_WIDTH * 4,
        width: this.RECT_WIDTH + this.RECT_MARGIN * 2,
        height: this.DISH_HEIGHT + this.RECT_MARGIN * 2
      }
    }
  }
}
