import express from 'express'
const router = express.Router()
const initRouters = (app) => {
    return app.use('/', router)
}
export default initRouters