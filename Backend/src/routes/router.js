import express from 'express'
import authRouter from './auth'
import userRouter from './user'
import sliderRouter from './slider'
import categoryRouter from './category'
import singerRouter from './singer'
import musicRouter from './music'
import topicRouter from './topic'
import followRouter from './follow'
import nationRouter from './nation'
import favoriteRouter from './favorite'
const router = express.Router()
const initRouters = (app) => {
    app.use('/api/auth', authRouter)
    app.use('/api/user', userRouter)
    app.use('/api/slider', sliderRouter)
    app.use('/api/category', categoryRouter)
    app.use('/api/singer', singerRouter)
    app.use('/api/music', musicRouter)
    app.use('/api/topic', topicRouter)
    app.use('/api/follow', followRouter)
    app.use('/api/nation', nationRouter)
    app.use('/api/favorite', favoriteRouter)
    return app.use('/', router)
}
export default initRouters