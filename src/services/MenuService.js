import dayRepository from '../domain/repositories/DayRepository'
import weekRepository from '../domain/repositories/WeekRepository'

import Logger from '../utils/Logger'
import moment from 'moment'

export default class MenuService {
  static async getDay (year, month, day) {
    try {
      Logger.log('MenuService', `Retrieving data for day ${year}/${month}/${day}…`)
      const date = moment().year(year).month(month - 1).date(day).hour(8).minutes(0).seconds(0).milliseconds(0)
      return dayRepository.findOne({ date })
    } catch (error) {
      Logger.error('MenuService', error)
      throw new Error('Failed to retrieve documents to the database!')
    }
  }

  static async getToday () {
    const now = moment()
    return this.getDay(now.year(), now.month() + 1, now.day())
  }

  static async getWeek (year, week) {
    try {
      Logger.log('MenuService', `Retrieving data for week ${year}/${week}…`)
      return weekRepository.findOneWithDays({ year, week })
    } catch (error) {
      Logger.error('MenuService', error)
      throw new Error('Failed to retrieve documents to the database!')
    }
  }

  static async getThisWeek () {
    const now = moment()
    return this.getWeek(now.year(), now.isoWeek())
  }

  static async insertWeek (menuData) {
    Logger.log('MenuService', `Adding menu data for week ${menuData.week.year}/${menuData.week.week} to the database…`)
    try {
      // Add all the data to the database
      const documents = await Promise.all([
        weekRepository.create(menuData.week),
        dayRepository.create(menuData.monday),
        dayRepository.create(menuData.tuesday),
        dayRepository.create(menuData.wednesday),
        dayRepository.create(menuData.thursday),
        dayRepository.create(menuData.friday),
      ])
      // Link the days to the week
      documents[0].monday = documents[1] // eslint-disable-line prefer-destructuring
      documents[0].tuesday = documents[2] // eslint-disable-line prefer-destructuring
      documents[0].wednesday = documents[3] // eslint-disable-line prefer-destructuring
      documents[0].thursday = documents[4] // eslint-disable-line prefer-destructuring
      documents[0].friday = documents[5] // eslint-disable-line prefer-destructuring
      // Persist in the database
      Logger.success('MenuService', `Menu data for week ${menuData.week.year}/${menuData.week.week} added successfully!`)
      return documents[0].save()
    } catch (error) {
      Logger.error('MenuService', `Could not add menu data for week ${menuData.week.year}/${menuData.week.week} to the database (${error})`)
      throw new Error('Failed to add documents to the database!')
    }
  }

  static async exists (menuUrl) {
    return !!await weekRepository.findOne({ url: menuUrl })
  }
}
