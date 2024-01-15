import { Router } from "express"
import { signin, signup } from "../controllers/authControl.js"
import validateSchema from "../middlewares/schemaVal.js"
import { signInSchema, signUpSchema } from "../schemas/auth.schemas.js"


const authRouter = Router()

authRouter.post("/signup", validateSchema(signUpSchema), signup)
authRouter.post("/signin", validateSchema(signInSchema), signin)

export default authRouter