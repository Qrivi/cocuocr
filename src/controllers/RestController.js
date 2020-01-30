import MenuService from '../services/MenuService'
import JsonResponse from '../responseformats/JsonResponse'
import ImageResponse from '../responseformats/ImageResponse'

export default class RestController {
  static async getMenuImage (req, res) {
    const r = new ImageResponse()
    try {
      const year = parseInt(req.query.year)
      const week = parseInt(req.query.week)
      const data = year && week ? await MenuService.getWeek(year, week) : await MenuService.getThisWeek()
      if (data) { return r.sendImage(res, 200, data.image) }
      return r.notFound(res, `Image for week ${year}/${week}`)
    } catch (error) {
      return r.badRequest(res, `${error.name}: ${error.message}`)
    }
  }

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
