
const indexConfig = async (req, res, next) => {
    
    res.json({
        code: 200,
        errmsg: "ok",
        data: {
            banner:[],
            hotActivity:[]
        }
    })
}

module.exports = {
    indexConfig
}