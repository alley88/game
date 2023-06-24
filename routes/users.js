var express = require('express');
var router = express.Router();
var userController = require("../controller/user");
var authJwt = require('../middlewares/authJwt');
//验证码
router.get('/captch', userController.captch);

//注册
router.post("/register",userController.register);

//登录
router.post("/login",userController.login);

//退出登录
router.get("/logout",userController.logout);
module.exports = router;
