let db = require("../utils/database");
const NumberCollection = db.numberCollection;

const numberCollectionList = async (req, res, next) => {
    let data = await NumberCollection.findAll();

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
    numberCollectionList
}