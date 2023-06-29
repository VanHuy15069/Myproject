import express from 'express'
import authRouter from './auth'
import userRouter from './user'
import sliderRouter from './slider'
import categoryRouter from './category'
import singerRouter from './singer'
import musicRouter from './music'
const router = express.Router()
const initRouters = (app) => {
    app.use('/api/auth', authRouter)
    app.use('/api/user', userRouter)
    app.use('/api/slider', sliderRouter)
    app.use('/api/category', categoryRouter)
    app.use('/api/singer', singerRouter)
    app.use('/api/music', musicRouter)
    return app.use('/', router)
}
export default initRouters