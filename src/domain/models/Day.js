import mongoose from 'mongoose'

export const DaySchema = new mongoose.Schema({
  date: {
    type: Date,
    unique: true,
  },
  soup: {
    type: String,
  },
  main: {
    type: String,
  },
  vegetarian: {
    type: String,
  },
  wpp: {
    type: String,
  },
})

export const Day = mongoose.model('Day', DaySchema)
