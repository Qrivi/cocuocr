import { Router } from 'express'
import MenuController from '../controllers/rest/MenuController'

const router = Router()

router.get('/week/image', MenuController.getMenuImage)
router.get('/week', MenuController.getWeek)
router.get('/day', MenuController.getDay)

export default router
