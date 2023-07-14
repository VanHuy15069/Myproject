import express from 'express'
import bodyParser from 'body-parser'
import viewEngine from './config/viewEngine'
import initRouterss from './routes/router'
import connectDB from './config/connectDB'
import path from 'path'
require('dotenv').config()
const app = express()
const port = process.env.PORT || 9090
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type,Accept, Authorization',
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
viewEngine(app)
initRouterss(app)
app.use('/src', express.static(path.join(__dirname, 'public/Images')));
connectDB()
app.listen(port, () => {
    console.log('server is runing on the port: ' + port);
})
