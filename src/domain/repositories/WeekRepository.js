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

  findOne (week) {
    return this.model.findOne(week)
  }

  findOneWithDays (week) {
    return this.model.findOne(week)
      .populate('monday')
      .populate('tuesday')
      .populate('wednesday')
      .populate('thursday')
      .populate('friday')
  }
}

export default new WeekRepository(Week)
