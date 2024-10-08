import express from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'
import {protect} from './modules/auth'
import { creatNewUser, signin } from './handlers/user'


const app = express()

const customLogger = (message) => (req, res, next) => {
    console.log('Hello from ${message}')
}

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use((req, res, next) => {
    req.shhh_secret = 'doggy'
    next()
})

app.get('/', (req, res) => {
    console.log(' hello from express')
    res.status(200)
    res.json({message: 'hello'})

})

app.use('/api', protect, router)

app.post('/user', creatNewUser)
app.post('/signin', signin)

export default app 