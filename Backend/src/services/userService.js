import db from "../models";
import path from "path";
import fs from 'fs'
import bcryptjs from 'bcryptjs'
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
            const users = await db.User.findAndCountAll({
                where: {isAdmin: false},
                attributes: ['id', 'fullName', 'email', 'userName', 'image', 'vip']
            })
            resolve({
                response: users.rows,
                count: users.count,
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
            await user.save()
            resolve({
                response: user,
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
                response: user,
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
        if(user.image){
            const clearImg = path.resolve(__dirname, '..', '', `public/Images/${user.image}`);
            fs.unlinkSync(clearImg)
        }
        await db.Favorite.destroy({where: {userId: id}})
        await db.Follow.destroy({where: {userId: id}})
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

export const updateImageService = (image, id) => 
    new Promise(async(resolve, reject) => {
        try {
            const user = await db.User.findByPk(id)
            if(!user){
                resolve({
                    err: 2,
                    msg: 'This user does not exist'
                })
            }
            if(user.image){
                const clearImg = path.resolve(__dirname, '..', '', `public/Images/${user.image}`);
                fs.unlinkSync(clearImg)
            }
            await user.update({image: image})
            await user.save()
            resolve({
                response: user,
                err: 0,
                msg: 'Update successful'
            })
        } catch (error) {
            reject(error)
        }
    })

export const updatePasswordService = (oldPassword, newPassword, id) => 
    new Promise(async(resolve, reject) => {
        try {
            const user = await db.User.findByPk(id)
            if(!user){
                resolve({
                    err: 2,
                    msg: 'This user does not exist'
                })
            }
            else{
                const checkPassword = bcryptjs.compareSync(oldPassword, user.password)
                if(!checkPassword){
                    resolve({
                        err: 3,
                        msg: 'wrong password'
                    })
                }
                else{
                    await user.update({password: hashPassword(newPassword)})
                    await user.save()
                    resolve({
                        response: user,
                        err: 0,
                        msg: 'Password update successful'
                    })
                }
            }
        } catch (error) {
            reject(error)
        }
    })
const hashPassword = (password) => bcryptjs.hashSync(password, bcryptjs.genSaltSync(10))
