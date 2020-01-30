import { Router } from 'express'
import RestController from '../controllers/RestController'

const router = Router()

router.get('/week/image', RestController.getMenuImage)
router.get('/week', RestController.getWeek)
router.get('/day', RestController.getDay)

export default router
