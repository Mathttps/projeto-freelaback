import { Router } from "express"
import { gatoSchema } from "../schemas/gatos.schemas.js"
import validateAuth from "../middlewares/midValidate.js"
import validateSchema from "../middlewares/schemaVal.js"
import { getCatsa, postCats } from "../controllers/catControl.js"



const gatosRouter = Router()

gatosRouter.post("/gatos", validateSchema(gatoSchema), postCats)
gatosRouter.get("/gatos", validateAuth, getCatsa)

export default gatosRouter
