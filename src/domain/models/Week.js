import mongoose from 'mongoose'

export const WeekSchema = new mongoose.Schema({
  week: {
    type: Number,
  },
  year: {
    type: Number,
  },
  image: {
    type: String,
  },
  url: {
    type: String,
    unique: true,
  },
  fetched: {
    type: Date,
  },
  monday: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Day',
  },
  tuesday: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Day',
  },
  wednesday: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Day',
  },
  thursday: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Day',
  },
  friday: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Day',
  },
  recurring: {
    tomatoSoup: {
      type: String,
    },
    vegetarianSoup: {
      type: String,
    },
    bigBoySoup: {
      type: String,
    },
  },
})

export const Week = mongoose.model('Week', WeekSchema)
