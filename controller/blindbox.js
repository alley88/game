let db = require("../utils/database");
const Blindbox = db.blindbox;

const blindboxList = async (req, res, next) => {
    let data = await Blindbox.findAll();

    if(data) {
        data = data.toJSON();
        res.json({
            code: 200,
            errmsg: "ok",
            data: {
                list:data
            }
        })
    } else {
        res.json({
            code: 500,
            errmsg: "暂无数据",
            data: {}
        })
    }
}

module.exports = {
    blindboxList
}