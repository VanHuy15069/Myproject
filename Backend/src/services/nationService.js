import db from "../models";

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