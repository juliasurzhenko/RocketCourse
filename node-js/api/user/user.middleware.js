const {findUserByID} = require("./user.service");
module.exports = {
    checkIsUserExists: async (req, res, next) =>{
        try{
            const user = await findUserByID(req.params.userId);

            if(!user){
                throw new Error('User not found')
            }

            req.user = user;
            // res.json('ok')
            next();
        } catch(e){
            next(e)
            // res.status(400).json(e.message)
        }
    }
}