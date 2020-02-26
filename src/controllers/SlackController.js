import moment from 'moment'
import MenuService from '../services/MenuService'
import SlackResponse from '../responseformats/SlackResponse'
import Tools from '../utils/Tools'

export default class SlackController {
  static async handle (req, res) {
    const body = req.body.payload ? JSON.parse(req.body.payload) : req.body
    let input, date, url

    switch (body.type) {
      case 'block_actions':
        input = body.actions[0].selected_option.value
        url = body.response_url
        break
      default:
        if (!body) { return res.status(200).send('I was unable to parse that date. 😞') }
        input = body.text
        url = body.response_url
        break
    }

    try {
      date = input && input.length ? moment(Tools.parseDate(input, moment().year())) : moment()
      res.status(200).send()
    } catch (err) {
      return res.status(200).send('I was unable to parse that date. 😞')
    }
    SlackController.createResponse(date, url)
  }

  static async createResponse (date, url) {
    const data = await MenuService.getWeek(date.year(), date.isoWeek())
    const menu = data[date.format('dddd').toLowerCase()]
    const s = new SlackResponse(date)

    s.addSoup('Soep van de dag', menu.soup)
    s.addSoup('Tomatensoep', data.recurring.tomatoSoup)
    s.addSoup('Vegetarische soep', data.recurring.vegetarianSoup)
    s.addSoup('Maaltijdsoep', data.recurring.bigBoySoup)

    s.addDish('Dagschotel', menu.main)
    s.addDish('Vegetarische schotel', menu.vegetarian)
    s.addDish('Wok, pasta, pizza', menu.wpp)

    s.render()
    s.send(url)
  }
}
