import db from '../models'
import bcryptjs from 'bcryptjs'

const hashPassword = (password) => bcryptjs.hashSync(password, bcryptjs.genSaltSync(10))

export const registerService = ({fullName, email, userName, password}) => 
    new Promise(async (resolve, reject) => {
        try {
            const [user, created] = await db.User.findOrCreate({
                where:  {userName},
                defaults: {
                    fullName: fullName,
                    email: email,
                    userName: userName,
                    password: hashPassword(password),
                }
            })
            if(!created){
                resolve({
                    response: user,
                    err: 2,
                    msg: "Username available"
                })
            }
            resolve({
                response: user,
                err: 0,
                msg: 'Successful account registration'
            })
        }catch(error){
            reject(error)
        }
    })

export const loginService = ({userName, password}) => 
    new Promise(async (resolve, reject) => {
        try{
            const user = await db.User.findOne({
                where: {userName: userName}
            })
            if(!user){
                resolve({
                    err: 2,
                    msg: 'This user does not exist'
                })
            }
            const checkPassword = bcryptjs.compareSync(password, user.password)
            if(!checkPassword){
                resolve({
                    err: 3,
                    msg: 'Wrong password'
                })
            }
            resolve({
                response: user,
                err: 0,
                msg: 'Logged in successfully'
            })
        }catch(error){
            reject(error)
        }
    })
