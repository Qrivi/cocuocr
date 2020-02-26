import moment from 'moment'
import MenuService from '../services/MenuService'
import SlackResponse from '../responseformats/SlackResponse'
import Tools from '../utils/Tools'

export default class SlackController {
  static async handle (req, res) {
    const { text } = req.body
    let date
    try {
      date = text && text.length ? moment(Tools.parseDate(text, moment().year())) : moment()
      res.status(200).send()
    } catch (err) {
      return res.status(200).send('I was unable to parse that date. 😞')
    }

    const data = await MenuService.getWeek(date.year(), date.isoWeek())
    const day = data[date.format('dddd').toLowerCase()]
    const s = new SlackResponse(date)

    s.addSoup('Soep van de dag', day.soup)
    s.addSoup('Tomatensoep', data.recurring.tomatoSoup)
    s.addSoup('Vegetarische soep', data.recurring.vegetarianSoup)
    s.addSoup('Maaltijdsoep', data.recurring.bigBoySoup)

    s.addDish('Dagschotel', day.main)
    s.addDish('Vegetarische schotel', day.vegetarian)
    s.addDish('Wok, pasta, pizza', day.wpp)

    s.render()
    s.send(req.body.response_url)
  }
}
