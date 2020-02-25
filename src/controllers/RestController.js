import MenuService from '../services/MenuService'
import ScrapeService from '../services/ScrapeService'
import JsonResponse from '../responseformats/JsonResponse'
import ImageResponse from '../responseformats/ImageResponse'
import Constants from '../constants'

export default class RestController {
  static async getDay (req, res) {
    const r = new JsonResponse()
    try {
      const year = parseInt(req.query.year)
      const month = parseInt(req.query.month)
      const day = parseInt(req.query.day)
      const data = year && month && day ? await MenuService.getDay(year, month, day) : await MenuService.getToday()
      if (data) { return r.send(res, 200, { data }) }
      if (isNaN(year) || isNaN(month) || isNaN(day)) { return r.notFound(res, 'Data for current today') }
      return r.notFound(res, `Data for day ${year}/${month}/${day}`)
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
      if (isNaN(year) || isNaN(week)) { return r.notFound(res, 'Data for current week') }
      return r.notFound(res, `Data for week ${year}/${week}`)
    } catch (error) {
      return r.badRequest(res, `${error.name}: ${error.message}`)
    }
  }

  static async getMenuImage (req, res) {
    const r = new ImageResponse()
    try {
      const year = parseInt(req.query.year)
      const week = parseInt(req.query.week)
      const data = year && week ? await MenuService.getWeek(year, week) : await MenuService.getThisWeek()
      if (data) { return r.sendImage(res, 200, data.image) }
      if (isNaN(year) || isNaN(week)) { return r.notFound(res, 'Image for current week') }
      return r.notFound(res, `Image for week ${year}/${week}`)
    } catch (error) {
      return r.badRequest(res, `${error.name}: ${error.message}`)
    }
  }

  static async getDatesFetched (req, res) {
    const r = new JsonResponse()
    try {
      const data = (await MenuService.getAllWeeks())
        .map(week => ({ week: week.week, year: week.year, fetched: week.fetched }))
        .sort((a, b) => b.week - a.week)
      if (data && data.length) {
        return r.send(res, 200, { data })
      }
      return r.notFound(res, 'Data')
    } catch (error) {
      return r.badRequest(res, `${error.name}: ${error.message}`)
    }
  }

  static async fetchManually (req, res) {
    const r = new JsonResponse()
    if (req.headers.authorization !== `Bearer ${process.env.BEARER || Constants.DEFAULT_BEARER}`) { return r.unauthorized(res) }
    ScrapeService.fetchMenuPersistently()
    return r.send(res, 200, { message: 'Fetching data was triggered manually.' })
  }
}
