import MenuService from '../../services/MenuService'
import JsonResponse from './JsonResponse'

export default class MenuController {
  static async getWeek (req, res) {
    const r = new JsonResponse()
    try {
      const year = parseInt(req.query.year)
      const week = parseInt(req.query.week)
      const data = year && week ? await MenuService.getWeek(year, week) : await MenuService.getThisWeek()
      if (data) { return r.send(res, 200, { data }) }
      return r.notFound(res, `Data for week ${year}/${week}`)
    } catch (error) {
      return r.badRequest(res, `${error.name}: ${error.message}`)
    }
  }

  static async getDay (req, res) {
    const r = new JsonResponse()
    try {
      const year = parseInt(req.query.year)
      const month = parseInt(req.query.month)
      const day = parseInt(req.query.day)
      const data = year && month && day ? await MenuService.getDay(year, month, day) : await MenuService.getToday()
      if (data) { return r.send(res, 200, { data }) }
      return r.notFound(res, `Data for day ${year}/${month}/${day}`)
    } catch (error) {
      return r.badRequest(res, `${error.name}: ${error.message}`)
    }
  }
}
