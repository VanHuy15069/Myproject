import db from "../models";
import fs from 'fs'
import path from "path";
export const addSingerService = (data, image) => 
    new Promise(async(resolve, reject) => {
        try {
            const [singer, created] = await db.Singer.findOrCreate({
                where: {singerName: data.singerName},
                defaults: {
                    singerName: data.singerName,
                    description: data.description,
                    image: image
                }
            })
            if(!created){
                resolve({
                    err: 2,
                    msg: 'This singer already exists'
                })
            }
            resolve({
                response: singer,
                err: 0,
                msg: 'Add data successfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const updateSingerService = (data, id) => 
    new Promise(async(resolve, reject) => {
        try {
            const singer = await db.Singer.findOne({where: {id: id}})
            if(!singer){
                resolve({
                    err: 2,
                    msg: 'This data does not exist'
                })
            }
            await singer.update({
                singerName: data.singerName,
                description: data.description,
            })
            resolve({
                err: 0,
                msg: 'Update successfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const updateAvataService = (image, id) => 
    new Promise(async(resolve, reject) => {
        try {
            const singer = await db.Singer.findOne({where: {id: id}})
            if(!singer){
                resolve({
                    err: 2,
                    msg: 'This data does not exist'
                })
            }
            const clearImg = path.resolve(__dirname, '..', '', `public/Images/${singer.image}`);
            await singer.update({image: image})
            fs.unlinkSync(clearImg)
            resolve({
                err: 0,
                msg: 'Update successfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const deleteSingerService = (id) =>
    new Promise(async(resolve, reject) => {
        try {
            const singer = await db.Singer.findOne({where: {id: id}})
            if(!singer){
                resolve({
                    err: 2,
                    msg: 'This data does not exist'
                })
            }
            const clearImg = path.resolve(__dirname, '..', '', `public/Images/${singer.image}`);
            await singer.destroy()
            fs.unlinkSync(clearImg)
            resolve({
                err: 0,
                msg: 'Delete successfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const getOneSingerService = (id) => 
    new Promise(async(resolve, reject) => {
        try {
            const singer = await db.Singer.findOne({where: {id: id}})
            if(!singer){
                resolve({
                    err: 2,
                    msg: 'This data does not exist'
                })
            }
            resolve({
                response: singer,
                err: 0,
                msg: 'Successfully retrieved information'
            })
        } catch (error) {
            reject(error)
        }
    })

export const getAllSingerService = () => 
    new Promise(async (resolve, reject) => {
        try {
            const singers = await db.Singer.findAll()
            resolve({
                response: singers,
                err: 0,
                msg: 'Successfully retrieved information'
            })
        } catch (error) {
            reject(error)
        }
    })