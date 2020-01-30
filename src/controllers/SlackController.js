// import MenuService from '../services/MenuService'
import JsonResponse from '../responseformats/JsonResponse'
// import moment from 'moment'

export default class RestController {
  static async handle (req, res) {
    // const { text } = req.body
    // const now = moment()

    const r = new JsonResponse()
    try {
      console.log(req.body) // eslint-disable-line
      return r.sendImage(res, 200, { data: req.body })
    } catch (error) {
      return r.badRequest(res, `${error.name}: ${error.message}`)
    }
  }
}
