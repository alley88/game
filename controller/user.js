//引入验证码依赖包
let svgCaptcha = require('svg-captcha');
let crypto = require('crypto');
let jwt = require("../utils/jwt")
let db = require("../utils/database");
const Users = db.user;
const storehouse = db.storehouse;
let store = {}
const captch = (req, res) => {
    const captcha = svgCaptcha.create({
        size: 4, // 验证码长度
        ignoreChars: '0o1i', // 验证码字符中排除 0o1i
        noise: 3, // 干扰线条的数量
        color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
        background: '#cc9966', // 验证码图片背景颜色
    })

    //在服务端保存生成的验证码
    store.captch = captcha.text.toLowerCase();

    //captcha  是一个对象   {data:svg地址,text:验证码}；
    res.send(captcha)
}


const register = async (req, res, next) => {
    let { username, password, captch, invitecode } = req.body;

    if (store.captch === captch.toLowerCase()) {
        let data = await Users.findOne({ where: { username: username.toString() } });
        if (data) {
            data = user.toJSON();
            res.json({
                code: 401,
                errMsg: "用户名重复",
                data: {}
            })
        } else {
            //创建加密方式
            let hash = crypto.createHash("sha256");
            //需要加密的数据
            hash.update(password)

            await Users.create({
                username: username,
                password: hash.digest('hex'),
                logincount: 0,
                lastlogintime:'0',
                registerDate: new Date().getTime().toString(),
                avatar : "http://10.60.15.150:3000/img/timg.jpg",
                nickname: Math.random().toString(16).substring(2, 8),
                sex:1,
                invitecode:invitecode || 0
            }).then((data) => {
                storehouse.create({
                     // 用户id
                    uid:data.uid,
                    // 用户卡槽
                    cardCout: 2,
                })

                res.json({
                    code: 200,
                    errMsg: "注册成功",
                    data: {}
                })
            }).catch(error => {
                res.json({
                    code: 500,
                    errMsg: "注册失败请联系管理员",
                    data: {}
                })
            })
        }


    } else {
        res.json({
            code: 200,
            errmsg: "",
            data: {
                info: "验证码错误",
                code: -1
            }
        })
    }


}


const login = async (req, res) => {
    let { username, password, captch } = req.body;

    if (store.captch === captch.toLowerCase()) {
        let data = await Users.findOne({ where: { username: username.toString() } });
        if (data) {
            data = user.toJSON();

            //创建加密方式
            let hash = crypto.createHash("sha256");
            //需要加密的数据
            hash.update(password)

            if (data.password === hash.digest('hex')) {

                let token = jwt.createJwt(data);

                res.cookie("token", token);
                res.json({
                    code: 200,
                    errmsg: "",
                    data: {
                        // 后续在看
                    }
                })
            } else {
                res.json({
                    code: 200,
                    errmsg: "",
                    data: {
                        info: "密码错误",
                        code: 3
                    }
                })
            }

        }

    } else {
        res.json({
            code: 200,
            errmsg: "",
            data: {
                info: "验证码错误",
                code: -1
            }
        })
    }
}


const updateInfo = async (req, res) => {
    let {uid,password,avatar,sex,nickname} = req.body;

    let data = await User.findByPk(uid);;
    if (data === null) {
        if(password) {
             //创建加密方式
             let hash = crypto.createHash("sha256");
             //需要加密的数据
             hash.update(password)
             data.password = hash.digest('hex');
        } else if(avatar) {
            data.avatar = avatar;
        } else if(sex) {
            data.sex = sex;
        } else if(nickname) {
            data.nickname = nickname;
        }
        
        await data.save();
      } else {
        res.json({
            code: 500,
            errMsg: "数据修改失败,请联系管理员",
            data: {}
        })
      }
}

const logout = (req, res) => {
    delete req.session["userId"];
    res.json({
        code: 200,
        errMsg: "",
        data: {
            info: "退出登录",
            code: 1
        }
    })
}

module.exports = {
    captch,
    register,
    login,
    updateInfo,
    logout
}