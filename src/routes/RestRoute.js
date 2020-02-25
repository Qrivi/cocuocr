import { Router } from 'express'
import RestController from '../controllers/RestController'

const router = Router()

router.get('/day', RestController.getDay)
router.get('/week', RestController.getWeek)
router.get('/week/image', RestController.getMenuImage)

router.get('/fetched', RestController.getDatesFetched)
router.post('/fetched', RestController.fetchManually)

export default router
