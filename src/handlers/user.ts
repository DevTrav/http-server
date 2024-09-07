import { create } from 'domain'
import prisma from '../db'
import { createJWT, hashPassword } from '../modules/auth'

export const creatNewUser = async (req, res) => {
    const user = await prisma.user.create({
        data: {
            username: req.body.username,
            password: await hashPassword(req.body.password)
        }
    })

    const token = createJWT(user)
    res.json({token})
}

export const signin = (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username
        }
    })

    const isValid = await comparePasswords(req.body.password)

    if(!isValid) {
        res.status(401)
        res.json({message: 'nope'})
        return
    }

    const token = createJWT(user)
    res.json({token})
}