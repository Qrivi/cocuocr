import { Day } from '../models/Day'

class DayRepository {
  constructor (model) {
    this.model = model
  }

  create (object) {
    return this.model.create(object)
  }

  findAll () {
    return this.model.find()
  }

  find (day) {
    return this.model.find(day)
  }
}

export default new DayRepository(Day)
