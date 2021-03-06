import config from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import { CronJob } from 'cron'

import ScrapeService from './services/ScrapeService'
import restRoute from './routes/RestRoute'
import slackRoute from './routes/SlackRoute'
import Logger from './utils/Logger'
import Constants from './constants'

config.config()

const app = express()
const port = process.env.PORT || Constants.DEFAULT_PORT
const mongo = process.env.MONGO_URL || Constants.DEFAULT_MONGO_URL
const schedule = process.env.FETCH_SCHEDULE || Constants.DEFAULT_FETCH_SCHEDULE

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/menu/rest', restRoute)
app.use('/menu/slack', slackRoute)

app.get('*', (req, res) => res.status(200).send({
  message: 'Howdy? 🤠',
}))

mongoose.connect(mongo, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then(() => {
    Logger.log('app', `Connected to MongoDB at ${mongo}`)
    app.listen(port, () => {
      Logger.log('app', `Server is running on port ${port}`)
    })
  }).catch(() => {
    Logger.error('app', `Failed to connect to MongoDB at ${mongo}`)
    process.exit(1)
  })

try {
  new CronJob(schedule, ScrapeService.fetchMenuPersistently).start()
  Logger.log('app', `Menu fetch crontab scheduled to run every ${schedule}`)
} catch (error) {
  Logger.error('app', `Failed to start cron scheduler (${error})`)
  process.exit(1)
}
