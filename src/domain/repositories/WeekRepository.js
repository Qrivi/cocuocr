import { Week } from '../models/Week'

class WeekRepository {
  constructor (model) {
    this.model = model
  }

  create (week) {
    return this.model.create(week)
  }

  findAll () {
    return this.model.find()
  }

  find (week) {
    return this.model.find(week)
  }

  findWithDays (week) {
    return this.model.findById(week)
      .populate('monday')
      .populate('tuesday')
      .populate('wednesday')
      .populate('thursday')
      .populate('friday')
  }
}

export default new WeekRepository(Week)
