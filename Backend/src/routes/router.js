import express from 'express'
import authRouter from './auth'
import userRouter from './user'
const router = express.Router()
const initRouters = (app) => {
    app.use('/api/auth', authRouter)
    app.use('/api/user', userRouter)
    return app.use('/', router)
}
export default initRouters