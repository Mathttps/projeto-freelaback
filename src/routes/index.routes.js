import { Router } from "express"
import gatosRouter from "./catroutes.js"
import authRouter from "./authentiroutes.js"

const router = Router()
router.use(gatosRouter)
router.use(authRouter)

export default router