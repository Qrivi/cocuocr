import mongoose from 'mongoose'
import { schema as Day } from './Day'

export const schema = new mongoose.Schema({
  data: {
    week: {
      type: Number
    },
    year: {
      type: Number
    },
    image: {
      type: String
    }
  },
  monday: {
    type: Day
  },
  tuesday: {
    type: Day
  },
  wednesday: {
    type: Day
  },
  thursday: {
    type: Day
  },
  friday: {
    type: Day
  },
  recurring: {
    tomatoSoup: {
      type: String
    },
    vegetarianSoup: {
      type: String
    },
    bigBoySoup: {
      type: String
    }
  }
})

export const Week = mongoose.model('Week', schema)
