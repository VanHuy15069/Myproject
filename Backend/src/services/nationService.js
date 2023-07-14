import db from "../models";
import { Op } from "sequelize";

export const addNaionService = (nationName) =>
    new Promise(async(resolve, reject) => {
        try {
            const [nation, created] = await db.Nation.findOrCreate({
                where: {nationName: nationName},
                defaults: {
                    nationName: nationName
                }
            })
            if(!created){
                resolve({
                    err: 2,
                    msg: 'This nation already exists'
                })
            }
            resolve({
                response: nation,
                err: 0,
                msg: 'Add data sucesfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const getMusicService = (nationId) =>
    new Promise(async(resolve, reject) => {
        try {
            const music = await db.Nation.findAll({
                where: {id: nationId},
                include: [
                    {
                        model: db.Music,
                        as: 'musicInfo'
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

export const getAllNationService = () =>
    new Promise(async(resolve, reject) => {
        try {
            const nation = await db.Nation.findAll()
            resolve({
                response: nation,
                err: 0,
                msg: 'Get data succesfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const updateNationService = (id, nationName) => 
    new Promise(async(resolve, reject) => {
        try {
            const nation = await db.Nation.findByPk(id) 
            if(!nation){
                resolve({
                    err: 2,
                    msg: 'This data does not exist'
                })
            }
            await nation.update({nationName: nationName})
            resolve({
                err: 0,
                msg: 'Update data succesfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const deleteNationService = (id) => 
    new Promise(async(resolve, reject) => {
        try {
            const nation = await db.Nation.findByPk(id)
            if(!nation){
                resolve({
                    err: 2,
                    msg: 'This data does not exist'
                })
            }
            await nation.destroy()
            resolve({
                err: 0,
                msg: 'Delete data succesfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const getInternationalService = (limit, offset, name, sort) =>
    new Promise(async(resolve, reject) => {
        try {
            const queries = {}
            if(limit) queries.limit = Number(limit)
            if(offset) queries.offset = Number(offset*limit)
            if(!name) name = 'createdAt'
            if(!sort) sort = 'DESC'
            const music = await db.Nation.findOne({
                where: {nationName: 'Âu Mỹ'}, 
                include:[
                    {
                        model: db.Music,
                        as: 'musicInfo',
                        ...queries,
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
            if(!music){
                resolve({
                    err: 2,
                    msg: 'This data does not exist'
                })
            }
            resolve({
                response: music,
                err: 0,
                msg: 'Get data succesfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const getVietNamService = (limit, offset, name, sort) =>
    new Promise(async(resolve, reject) => {
        try {
            const queries = {}
            if(limit) queries.limit = Number(limit)
            if(offset) queries.offset = Number(offset*limit)
            if(!name) name = 'createdAt'
            if(!sort) sort = 'DESC'
            const music = await db.Nation.findOne({
                where: {nationName: 'Việt Nam'},
                include: [
                    {
                        model: db.Music,
                        as: 'musicInfo',
                        ...queries,
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
            if(!music){
                resolve({
                    err: 2,
                    msg: 'This data does not exist'
                })
            }
            resolve({
                response: music,
                err: 0,
                msg: 'Get data succesfully'
            })
        } catch (error) {
            reject(error)
        }
    })