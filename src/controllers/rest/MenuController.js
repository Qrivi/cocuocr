import MenuService from '../../services/MenuService';
import JsonResponse from './JsonResponse';

export default class MenuController {

    static async getCurrent(req, res) {
        const r = new JsonResponse();
        try {
            const stations = await MenuService.getCurrent();
            return r.send(res, 200, { stations });
        } catch (error) {
            return r.badRequest(res, `${error.name}: ${error.message}`);
        }
    }
}
