import ScrapeService from '../../services/ScrapeService'
import JsonResponse from './JsonResponse'

export default class MenuController {
  static async testSomething (req, res) {
    const r = new JsonResponse()
    try {
      const result = await ScrapeService.fetchMenuPersistently()
      return r.send(res, 200, { result })
    } catch (error) {
      return r.badRequest(res, `${error.name}: ${error.message}`)
    }
  }
}
