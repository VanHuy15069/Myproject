import db from "../models";

export const addCategoryService = (title) =>
    new Promise(async(resolve, reject) => {
        try {
            const [category, created] = await db.Category.findOrCreate({
                where: {categoryName: title},
                defaults: {categoryName: title}
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
            await category.destroy()
            resolve({
                err: 0,
                msg: 'Delete successful'
            })
        } catch (error) {
            reject(error)
        }
    })

export const getCategoryService = () => 
    new Promise(async (resolve, reject) => {
        try {
            const categories = await db.Category.findAll()
            resolve({
                response: categories,
                err: 0,
                msg: 'Get data successfully'
            })
        } catch (error) {
            reject(error)
        }
    })