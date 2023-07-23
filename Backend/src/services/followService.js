import db, { sequelize } from "../models";

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

export const getSingerService = (userId, limit, offset, name, sort) =>
    new Promise(async(resolve, reject) => {
        try {
            const queries = {}
            if(limit) queries.limit = Number(limit)
            if(offset) queries.offset = Number(limit*offset)
            if(!name) name = 'createdAt'
            if(!sort) sort = 'DESC'
            const singer = await db.Follow.findAll({
                where: {userId: userId},
                ...queries,
                order: [[name, sort]],
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

export const isFollowService = (userId, singerId) =>
    new Promise(async(resolve, reject) => {
        try {
            const follow = await db.Follow.findOne({
                where: {userId: userId, singerId: singerId}
            })
            if(!follow){
                resolve({
                    response: false,
                    msg: 'This data is not available'
                })
            }
            resolve({
                response: true,
                msg: 'This data is available'
            })
        } catch (error) {
            reject(error)
        }
    })

export const getSingerPopularService = (limit) =>
    new Promise(async(resolve, reject) => {
        try {
            if(!limit) limit = 5
            const singers = await db.Follow.findAll({
                attributes: ['singerId', [sequelize.fn('COUNT', sequelize.col('singerId')), 'count']],
                group: ['singerId'],
                order: sequelize.literal('count DESC'),
                limit: Number(limit),
                include: [
                    {
                        model: db.Singer,
                        as: 'singerInfo'
                    }
                ]
            }) 
            resolve({
                response: singers,
                err: 0,
                msg: 'Get data sucesfully'
            })
        } catch (error) {
            reject(error)
        }
    })