import * as authService from '../services/authService'

export const register = async (req, res) => {
    const {fullName, email, userName, password} = req.body
    try{
        if(!fullName || !email || !userName || !password)
            return res.status(400).json({
                err: 1,
                msg: 'Full information is required'
            })     
        const response = await authService.registerService(req.body)
        return res.status(200).json(response)
    }catch(error){
        return res.status(500).json({
            err: -1,
            msg: 'failure' + error
        })
    }
}

export const login = async(req, res) => {
    const {userName, password} = req.body
    try{
        if(!userName || !password) {
            return res.status(400).json({
                err: 1,
                msg: 'Full information is required'
            })
        }
        const response = await authService.loginService(req.body)
        return res.status(200).json(response)
    }catch(error){
        return res.status(500).json({
            err: -1,
            msg: 'failure ' + error
        })
    }
}