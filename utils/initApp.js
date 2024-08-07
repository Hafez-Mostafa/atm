import cors from 'cors';
import path from 'path'
import dotenv from 'dotenv';

dotenv.config({path:path.resolve('config/.env')});

import AppError from '../utils/AppError.js';
import  {globalErrorHandling}  from '../utils/errorHandling.js';

import  connectionDB  from '../db/connectionDB.js';
import * as  routes from '../src/modules/index.routes.js';


const initApp = (app,express) => {



app.use(cors());
connectionDB()
app.use(express())
app.use((req,res,next)=>{
    if(req.originalUrl == '/orders/webhook'){
next()
    }else{
        express.json()(req,res,next)
    }
});

app.use(express.static(path.resolve('public')));
app.use('/users',routes.userRouter)
app.use('/accounts',routes.accountsRouter)
app.use('/transactions',routes.transactionsRouter)








app.get('/', (req, res, next) => {
    res.sendFile(path.resolve('/index.html'));
});


app.get('*', (req, res,next) =>{
    return next(new AppError(`Invalid URL : ${req.originalUrl}`,404))
})




const PORT =  process.env.PORT||3001
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}!`))}


export default initApp