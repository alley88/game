let db = require("../utils/database");
const Activity = db.activity;

const activityList = async (req, res, next) => {
    let data = await Activity.findAll();

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
    activityList
}