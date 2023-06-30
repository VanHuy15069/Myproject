import db from "../models";

export const addFollowService = (userId, singerId) => 
    new Promise(async(resolve, reject) => {
        try {
            const [follow, created] = await db.Follow.findOrCreate({
                where: {userId: userId, singerId: singerId},
                defaults: {
                    userId: userId,
                    singerId:singerId
                }
            })
            if(!created){
                resolve({
                    err: 2,
                    msg: "This data available"
                })
            }
            resolve({
                response: follow,
                err: 0,
                msg: 'Add data sucesfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const countFollowService = (singerId) =>
    new Promise(async(resolve, reject) => {
        try {
            const follow = await db.Follow.findAndCountAll({where: {singerId: singerId}})
            resolve({
                response: follow.count,
                err: 0,
                msg: 'OK'
            })
        } catch (error) {
            reject(error)
        }
    })

export const getSingerService = (userId) =>
    new Promise(async(resolve, reject) => {
        try {
            const singer = await db.Follow.findAll({
                where: {userId: userId},
                include: [
                    {
                        model: db.Singer,
                        as: 'singerInfo'
                    }
                ]
            })
            resolve({
                response: singer,
                err: 0,
                msg: 'OK'
            })
        } catch (error) {
            reject(error)
        }
    })

export const deleteFollowService = (userId, singerId) =>
    new Promise(async(resolve, reject) => {
        try {
            const follow = await db.Follow.findOne({
                where: {userId: userId, singerId: singerId}
            })
            if(!follow){
                resolve({
                    err: 2,
                    msg: 'This data does not exist'
                })
            }
            await follow.destroy()
            resolve({
                err: 0,
                msg: 'Delete successful'
            })
        } catch (error) {
            reject(error)
        }
    })

    