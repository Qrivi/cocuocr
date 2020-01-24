import { Day } from '../models/Day'

class DayRepository {
  constructor (model) {
    this.model = model
  }

  create (object) {
    return this.model.create(object)
  }
}

export default new DayRepository(Day)
