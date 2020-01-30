import { Router } from 'express'
import SlackController from '../controllers/SlackController'

const router = Router()

router.post('/', SlackController.handle)

export default router
