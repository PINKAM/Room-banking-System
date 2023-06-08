const jwt = require("jsonwebtoken");
const {GenderEnum, RoleId} = require("../commons/enums/common.enums");

exports.getToken = (req, res, next) => {

    if(!token){
        return res.status(401).json({ message: "Access Denied" });
    }

    try {
        const bearerHeader = req.headers['authorization'];
        const token = bearerHeader.split(' ')[1]

        if(!token){
            // res.send({message: "Token expired"})
            return res.status(401).json({
                message:"Token expired"
            })
        } 

        req['token'] = token;
        next()

    } catch (error) {
        return res.status(401).json({
            message:"Access denied"
        })
    }
}

// const verfiyToken = (req, res, next) => {
//     try{
//         // jwt verify token
// // req['user']
//         // if verified then call next()

//         // otherwise throw error of token expiry
//     }catch(error) {
//         throw error
//     }
// }

exports.verifyToken = (req, res, next) =>{
    try{
        

        const verifiedToken = jwt.verify(token, process.env.__KEY);
        req.userData= verifiedToken;
        next();
    }
    catch(err){

        res.status(500).json({
            message:"Access denied"
        });
    }
}

exports.roleGuard = (allowedRoles = []) => {
    return async (req, res, next) => {
        
        try {
            const role = req.RoleId;

            if (allowedRoles.includes(role)) {
              next();
            } else {
              
              res.status(403).json({ 
                message:"Access forbidden"
               });
            }
          }
        catch (error) {

            return res.status(500).json({ 
                message:"Error while checking user role"
            });
          }

        // otherwise throw 403 error
        //getToken, authenticateMiddleware, roleGuard(["admin"])
        // let token = req.header('Authorization');
        // if(!token){
        //     return res.status(403).json({message: 'Access Denied.'});
        // }

        // if(token.startswith("Bearer ")){
        //     token = token.slice(7, token.length).trimleft();
        // }
        
    }
}
