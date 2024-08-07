import { Router } from "express";
//contoller
import * as UC from './user.controller.js'
//validation
import * as UV from "./validation.js";
import {validation} from '../../middleware/validation.js'

//authenticatin & authentfizierung
import { auth } from "../../middleware/auth.js";
import systemRoles from "../../../utils/systemRoles.js";




const route = Router()

route.post('/register',validation(UV.signUpValidation),UC.register)
route.post('/login',validation(UV.signInValidation),UC.login)





export default route