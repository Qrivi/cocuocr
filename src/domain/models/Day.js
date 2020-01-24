import mongoose from 'mongoose'

export const schema = new mongoose.Schema({
  date: {
    type: Date
  },
  soup: {
    type: String
  },
  main: {
    type: String
  },
  vegetarian: {
    type: String
  },
  wpp: {
    type: String
  }
})

export const Day = mongoose.model('Day', schema)
