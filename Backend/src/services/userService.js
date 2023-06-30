import db from "../models";

export const getOneUserService = (id) => 
    new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({where: {id: id}})
            if(!user){
                resolve({
                    err: 2,
                    msg: 'This user does not exist'
                })
            }
            resolve({
                response: user,
                err: 0,
                msg: 'Successfully retrieved information'
            })
        }catch(error) {
            reject(error)
        }
    })

export const getAllUserService = () => 
    new Promise(async (resolve, reject) => {
        try {
            const users = await db.User.findAll()
            resolve({
                response: users,
                err: 0,
                msg: 'Successfully retrieved information'
            })
        } catch (error) {
            reject(error)
        }
    })

export const vipUpgradeService = (id) => 
    new Promise(async(resolve, reject) => {
        try {
            const user = await db.User.findOne({where: {id: id}})
            if(!user){
                resolve({
                    err: 2,
                    msg: 'This user does not exist'
                })
            }
            await user.update({vip: true})
            resolve({
                err: 0,
                msg: 'Update successful'
            })
        } catch (error) {
            reject(error)
        }
    })

export const updateUserService = (data, id) => 
    new Promise(async (resolve, reject) => {
        try{
            const user = await db.User.findOne({
                where: {id: id}
            })
            if(!user){
                resolve({
                    err: 2,
                    msg: 'This user does not exist'
                })
            }
            user.update({fullName: data.fullName, email: data.email})
            resolve({
                err: 0,
                msg: 'Update successful'
            })
        }catch(error){
            reject(error)
        }
    })

export const deleteUserService = (id) =>
    new Promise(async (resolve, reject) => {
        try{
            const user = await db.User.findOne({where: {id: id}})
        if(!user){
            resolve({
                err: -1,
                msg: 'This user does not exist'
            })
        }
        await user.destroy()
        resolve({
            err: 0,
            msg: 'Delete successfully'
        })
        }catch(error){
            reject(error)
        }
    }
    )
