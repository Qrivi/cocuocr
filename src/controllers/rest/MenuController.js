import MenuService from '../../services/MenuService'
import JsonResponse from './JsonResponse'

export default class MenuController {
  static async getCurrent (req, res) {
    const r = new JsonResponse()
    try {
      // This and everyting beneath is just temporarily to test during development.
      // OCR will run on a cron schedule, save data to a db, and the endpoints will fetch from the db.
      const menu = await MenuService.getCurrent()
      return r.send(res, 200, { menu })
    } catch (error) {
      return r.badRequest(res, `${error.name}: ${error.message}`)
    }
  }
}
