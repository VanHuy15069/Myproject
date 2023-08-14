import * as categoryService from '../services/categoryService'

export const addCategory = async (req, res) => {
    try {
        const title = req.body.categoryName
        const image = req.file.filename
        if(!title || !image){
            return res.status(404).json({
                err: 1,
                msg: 'Full information is required'
            })
        }
        const response = await categoryService.addCategoryService(title, image)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure ' + error
        })
    }
}

export const updateCategory = async (req, res) => {
    try {
        const id = req.params.id
        const title = req.body.categoryName
        if(!title){
            return res.status(404).json({
                err: 1,
                msg: 'Full information is required'
            })
        }
        const response = await categoryService.updateCategoryService(title, id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure ' + error
        })
    }
}

export const updateImage = async(req, res) => {
    try {
        const image = req.file.filename
        const id = req.params.id
        if(!image){
            return res.status(404).json({
                err: 1,
                msg: 'Full information is required'
            })
        }
        const response = await categoryService.updateImageService(image, id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure ' + error
        })
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id
        const response = await categoryService.deleteCategoryService(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure ' + error
        })
    }
}

export const getCategory = async (req, res) => {
    try {
        const {limit, name, sort} = req.query
        const response = await categoryService.getCategoryService(limit, name, sort)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure ' + error
        })
    }
}

export const getOneCategory = async(req, res) => {
    try {
        const id = req.params.id
        const response = await categoryService.getOneCategoryService(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure ' + error
        })
    }
}
