import db from "../models";

export const addFavoriteService = (userId, musicId) =>
    new Promise(async(resolve, reject) => {
        try {
            const [favorite, created] = await db.Favorite.findOrCreate({
                where: {userId: userId, musicId: musicId},
                defaults: {
                    userId: userId,
                    musicId: musicId
                }
            })
            if(!created){
                resolve({
                    err: 2,
                    msg: "Favorite available"
                })
            }
            resolve({
                response: favorite,
                err: 0,
                msg: 'Add data succesfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const getMusicService = (userId, name, sort) => 
    new Promise(async(resolve, reject) => {
        try {
            if(!name) name = 'createdAt'
            if(!sort) sort = 'DESC'
            const music = await db.Favorite.findAll({
                where: {userId: userId},
                include: [
                    {
                        model: db.Music,
                        as: 'musicInfo',
                        order: [[name, sort]],
                        include: [
                            {
                                model: db.Singer,
                                as: 'singerInfo'
                            }
                        ]
                    }
                ]
            })
            resolve({
                response: music,
                err: 0,
                msg: 'Get data succesfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const deleteFavoriteService = (userId, musicId) =>
    new Promise(async(resolve, reject) => {
        try {
            const favorite = await db.Favorite.findOne({
                where: {userId: userId, musicId: musicId}
            })
            if(!favorite){
                resolve({
                    err: 2, 
                    msg: 'No data found'
                })
            }
            await favorite.destroy()
            resolve({
                err: 0,
                msg: 'Delete data succesfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const isFavoriteService = (userId, musicId) => 
    new Promise(async(resolve, reject) => {
        try {
            const isFavorite = await db.Favorite.findOne({
                where: {userId: userId, musicId: musicId}
            })
            if(!isFavorite){
                resolve({
                    response: false,
                    msg: 'Không có'
                })
            }
            resolve({
                response: true,
                msg: 'có'
            })
        } catch (error) {
            reject(error)
        }
    })

export const getFavoriteService = (musicId) => 
    new Promise(async(resolve, reject) => {
        try {
            const favorite = await db.Favorite.findAndCountAll({
                where: {musicId: musicId}
            })
            resolve({
                response: favorite,
                err: 0,
                msg: 'OK'
            })
        } catch (error) {
            reject(error)
        }
    })