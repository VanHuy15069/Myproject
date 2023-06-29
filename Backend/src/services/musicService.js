import db from "../models";
import fs from 'fs'
import path from "path";
import { Op } from "sequelize";

export const addMusicService = (data, image, link) => 
    new Promise(async(resolve, reject) => {
        try {
            const [music, created] = await db.Music.findOrCreate({
                where: {musicName: data.musicName},
                defaults: {
                    categoryId: data.categoryId,
                    singerId: data.singerId,
                    musicName: data.musicName,
                    musicLink: link,
                    description: data.description,
                    image: image
                }
            })
            if(!created){
                resolve({
                    err: 2,
                    msg: 'This music already exists'
                })
            }
            resolve({
                response: music,
                err: 0,
                msg: 'Add data successfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const updateImageService = (id, image) =>
    new Promise(async (resolve, reject) => {
        try {
            const music = await db.Music.findOne({where: {id: id}})
            if(!music){
                resolve({
                    err: 2,
                    msg: 'This data does not exist'
                })
            }
            const clearImg = path.resolve(__dirname, '..', '', `public/Images/${music.image}`);
            await music.update({image: image})
            fs.unlinkSync(clearImg)  
            resolve({
                err: 0,
                msg: 'Update data successfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const updateMusicService = (id, musicLink) =>
    new Promise(async (resolve, reject) => {
        try {
            const link = await db.Music.findOne({where: {id: id}})
            if(!link){
                resolve({
                    err: 2,
                    msg: 'This data does not exist'
                })
            }
            const clearMusic = path.resolve(__dirname, '..', '', `public/Images/${link.musicLink}`);
            await link.update({musicLink: musicLink})
            fs.unlinkSync(clearMusic)  
            resolve({
                err: 0,
                msg: 'Update data successfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const updateInforMusicService = (data, id) =>
    new Promise(async (resolve, reject) => {
        try {
            const music = await db.Music.findOne({where: {id: id}})
            if(!music){
                resolve({
                    err: 2,
                    msg: 'This data does not exist'
                })
            }
            await music.update({
                categoryId: data.categoryId,
                singerId: data.singerId,
                musicName: data.musicName,
                description: data.description
            })
            resolve({
                err: 0,
                msg: 'Update data successfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const upgrateVipService = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const music = await db.Music.findOne({where: {id: id}})
            if(!music){
                resolve({
                    err: 2,
                    msg: 'This data does not exist'
                })
            }
            else{
                if(!music.vip){
                    await music.update({vip: true})
                }else{
                    await music.update({vip: false})
                }
                resolve({
                    err: 0,
                    msg: 'Update data successfully'
                })
            }
        } catch (error) {
            reject(error)
        }
    })

export const getByCategoryService = (categoryId, limit, offset, name, sort) =>
    new Promise(async (resolve, reject) => {
        try {
            const query = {
                name: 'id',
                sort: 'DESC'
            }
            if(name && sort){
                query.name = name
                query.sort = sort
            }
            const music = await db.Music.findAndCountAll({
                where: {categoryId: categoryId},
                limit: Number(limit),
                offset: Number(offset*limit),
                order: [[query.name, query.sort]],
                include: [
                    {   
                        model: db.Category,
                        as: 'categoryInfo',
                    },
                    {
                        model: db.Singer,
                        as: 'singerInfo',
                    }
                ]
            })
            resolve({
                response: music,
                err: 0,
                msg: 'Get data successfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const getBySingerService = (singerId, limit, offset, name, sort) =>
    new Promise(async(resolve, reject) => {
        try {
            const query = {
                name: 'id',
                sort: 'DESC'
            }
            if(name && sort){
                query.name = name
                query.sort = sort
            }
            const music = await db.Music.findAndCountAll({
                where: {singerId: singerId},
                limit: Number(limit),
                offset: Number(offset*limit),
                order: [[query.name, query.sort]],
                include: [
                    {   
                        model: db.Category,
                        as: 'categoryInfo',
                    },
                    {
                        model: db.Singer,
                        as: 'singerInfo',
                    }
                ]
            })
            resolve({
                response: music,
                err: 0,
                msg: 'Get data successfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const searchNameMusicService = (musicName, limit, offset, name, sort) =>
    new Promise(async(resolve, reject) => {
        try {
            if(!limit) limit = 5
            if(!offset) offset = 0
            if(!name) name = 'id'
            if(!sort) sort = 'DESC'
            const music = await db.Music.findAndCountAll({
                where: {musicName: {[Op.substring]: musicName}},
                limit: limit,
                offset: limit*offset,
                order: [[name, sort]],
                include: [
                    {
                        model: db.Singer,
                        as: 'singerInfo',
                    }
                ]
            })
            resolve({
                response: music,
                err: 0,
                msg: 'Get data successfully'
            })
        } catch (error) {
            reject(error)
        }
    })