import db from "../models";
import fs from 'fs';
import path from "path";

export const addSliderService = (image) => 
    new Promise(async(resolve, reject) => {
        try {
            await db.Slider.create({image: image})
            resolve({
                err: 0,
                msg: 'Add data successfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const updateSliderService = (image, id) => 
    new Promise(async (resolve, reject) => {
        try {
            const slider = await db.Slider.findOne({where: {id: id}})
            if(!slider){
                resolve({
                    err: 2,
                    msg: 'This data does not exist'
                })
            }
            const clearImg = path.resolve(__dirname, '..', '', `public/Images/${slider.image}`);
            await slider.update({image: image})
            fs.unlinkSync(clearImg)
            resolve({
                err: 0,
                msg: 'Successfully updated'
            })
        } catch (error) {
            reject(error)
        }
    })

export const deleteSliderService = (id) => 
    new Promise(async (resolve, reject) => {
        try {
            const slider = await db.Slider.findOne({where: {id: id}})
            if(!slider){
                resolve({
                    err: 2,
                    msg: 'This data does not exist'
                })
            }
            const clearImg = path.resolve(__dirname, '..','',`public/Images/${slider.image}`)
            await slider.destroy()
            fs.unlinkSync(clearImg)
            resolve({
                err: 0,
                msg: 'Successfully deleted'
            })
        } catch (error) {
            reject(error)
        }
    })

export const getSliderService = () => 
    new Promise(async (resolve, reject) => {
        try {
            const sliders = await db.Slider.findAll()
            resolve({
                response: sliders,
                err: 0,
                msg: 'Get data successfully'
            })
        } catch (error) {
            reject(error)
        }
    })