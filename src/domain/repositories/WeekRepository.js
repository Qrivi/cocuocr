import Week from '../models/Week'

class WeekRepository {
  constructor (model) {
    this.model = model
  }

  create (object) {
    return this.model.create(object)
  }
}

export default new WeekRepository(Week)
