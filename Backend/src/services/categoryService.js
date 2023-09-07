import db from "../models";
import path from "path";
import fs from 'fs'
export const addCategoryService = (title, image) =>
    new Promise(async(resolve, reject) => {
        try {
            const [category, created] = await db.Category.findOrCreate({
                where: {categoryName: title},
                defaults: {
                    categoryName: title,
                    image: image
                }
            })
            if(!created){
                resolve({
                    err: 2,
                    msg: 'This category already exists'
                })
            }
            resolve({
                response: category,
                err: 0,
                msg: 'Add data successfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const updateCategoryService = (categoryName, id) => 
    new Promise(async (resolve, reject) => {
        try {
            const category = await db.Category.findOne({where: {id: id}})
            if(!category){
                resolve({
                    err: 2,
                    msg: 'This data does not exist'
                })
            }
            await category.update({categoryName: categoryName})
            resolve({
                err: 0,
                msg: 'Update successful'
            })
        } catch (error) {
            reject(error)
        }
    })

export const updateImageService = (img, id) => 
    new Promise(async(resolve, reject) => {
        try {
            const image = await db.Category.findByPk(id)
            if(!image){
                resolve({
                    err: 2,
                    msg: 'This data does not exist'
                })
            }
            const clearImg = path.resolve(__dirname, '..', '', `public/Images/${image.image}`);
            await image.update({image: img})
            fs.unlinkSync(clearImg)
            resolve({
                err: 0,
                msg: 'Update successful'
            })
        } catch (error) {
            reject(error)
        }
    })

export const deleteCategoryService = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const category = await db.Category.findOne({where: {id: id}})
            if(!category){
                resolve({
                    err: 2,
                    msg: 'This data does not exist'
                })
            }   
            const musics = await db.Music.findAll({
                where: {categoryId: id}
            })
            if(musics){
                musics.forEach(async music => {
                    await db.Favorite.destroy({where: {musicId: music.id}})
                    const clearImg = path.resolve(__dirname, '..', '', `public/Images/${music.image}`);
                    const clearMusic = path.resolve(__dirname, '..', '', `public/Images/${music.musicLink}`);
                    fs.unlinkSync(clearImg)
                    fs.unlinkSync(clearMusic)
                })
                await db.Music.destroy({where: {categoryId: id}})
            }
            const clearImg = path.resolve(__dirname, '..', '', `public/Images/${category.image}`);
            await category.destroy()
            fs.unlinkSync(clearImg)
            resolve({
                err: 0,
                msg: 'Delete successful'
            })
        } catch (error) {
            reject(error)
        }
    })

export const getCategoryService = (limit, name, sort) => 
    new Promise(async (resolve, reject) => {
        try {
            const queries = {}
            if(limit) queries.limit = Number(limit)
            if(!name) name = 'createdAt'
            if(!sort) sort = 'DESC'
            const categories = await db.Category.findAll({
                include: [
                    {
                        model: db.Music,
                        as: 'musicInfo',
                        ...queries,
                        order: [[name, sort]],
                        include: [
                            {
                                model: db.Singer,
                                as: 'singerInfo',
                                attributes: ['id', 'singerName']
                            }
                        ]
                    }
                ]
            })
            resolve({
                response: categories,
                err: 0,
                msg: 'Get data successfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const getOneCategoryService = (id) =>
    new Promise(async(resolve, reject) => {
        try {
            const category = await db.Category.findByPk(id)
            if(!category){
                resolve({
                    err: 2,
                    msg: 'This data does not exist'
                })
            }
            resolve({
                response: category,
                err: 0,
                msg: 'Get data successfully'
            })
        } catch (error) {
            reject(error)
        }
    })