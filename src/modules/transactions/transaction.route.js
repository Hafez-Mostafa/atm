import { Router } from 'express'
import express from 'express'
//contoller
import * as TC from './transaction.controller.js'
//validation
import * as TV from "./validation.js";
import { validation } from '../../middleware/validation.js'

//authenticatin & authentfizierung
import { auth } from "../../middleware/auth.js";
import systemRoles from "../../../utils/systemRoles.js";




const route = Router()

route.post('/deposite',
    auth([systemRoles.user]),
    TC.deposite)


route.post('/withdraw',
    auth([systemRoles.user]),
    TC.withdraw)

route.get('/balance/:id',
    auth([systemRoles.user]),
    TC.balance)

route.get('/transactions',
    // validation(OV.createOrder),
    auth([systemRoles.user]),
    TC.transactions)

export default route