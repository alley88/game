const jwt = require("jsonwebtoken");

const createJwt = (user)=>{
    return jwt.sign({ id: user.id }, config.auth.secret, {
        expiresIn: 86400 // 24 hours
    });
}

//验证
const verifyJwt =  (req,res,next)=>{
   var token = req.cookies.token;

   jwt.verify(token, 'gp17', function(err, decoded) {
        if(err){
            res.json({
                code:500,
                errMsg:"",
                data:{
                    info:"token失效",
                    code:-9999
                }
            })
        }else{
            next();
        }
   });

}


module.exports = {
    createJwt,
    verifyJwt
}