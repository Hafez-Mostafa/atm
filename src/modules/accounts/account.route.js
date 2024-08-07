import { Router } from "express";
//contoller
import * as AC from './account.controller.js'
//validation
import * as AV from "./validation.js";
import { validation } from '../../middleware/validation.js'

//authenticatin & authentfizierung
import { auth } from "../../middleware/auth.js";
import systemRoles from "../../../utils/systemRoles.js";





const route = Router()
// route.use('/:productId/reviews', routeReview)


route.post('/',
  
    // validation(AV.createAccount),
     auth([systemRoles.user]),
    AC.createAccount)



export default route