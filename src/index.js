import config from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'

import menuRoute from './routes/MenuRoute'
import Logger from './utils/Logger'

config.config()

const app = express()
const port = process.env.PORT || 8080

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/rest/menu', menuRoute)

app.get('*', (req, res) => res.status(200).send({
  message: 'Howdy? 🤠'
}))

app.listen(port, () => {
  Logger.log(`[app] Server is running on port ${port}`)
})

// export default app
