import config from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import menuRoute from './routes/MenuRoute'

config.config()

const app = express()
const port = process.env.PORT || 8050

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/rest/menu', menuRoute)

app.get('*', (req, res) => res.status(200).send({
  message: 'Howdy? 🤠'
}))

app.listen(port, () => {
  console.log(`Server is running on localhost:${port}`)
})

export default app
