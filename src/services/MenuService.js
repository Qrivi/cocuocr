import dayRepository from '../domain/repositories/DayRepository'
import weekRepository from '../domain/repositories/WeekRepository'

import Logger from '../utils/Logger'

export default class MenuService {
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
    return !!await weekRepository.find({ url: menuUrl })
  }
}
