let db = require("../utils/database");
const Storehouse = db.storehouse;
const NumberCollection = db.numberCollection;
const Blindbox = db.blindbox;


const insertstore = async (req, res, next) => {
    let { uid, shopid, type } = req.body;
    let storeData = await Storehouse.findOne({ where: { uid:uid } });
    let figureData = null;

    // 人物
    if(type == 1) {
        figureData =  await NumberCollection.findOne({ where: { ncid:shopid } });
        // 盲盒
    } else if(type == 2 ) {
        figureData =  await Blindbox.findOne({ where: { boxid:shopid } });
        //灵气
    }else if(type == 3 ) {
        // 金丹
    }else if(type == 4 ) {

    }




    if(storeData && figureData) {
        figureData = figureData.toJSON();
        if(type == 1) {
            storeData.shopfigure.push(figureData)
        } else if(type == 2 ) {
            storeData.blindBoxs.push(figureData);
        }else if(type == 3 ) {
    
        }else if(type == 4 ) {
    
        }

        await storeData.save();
    } else {
        res.json({
            code: 500,
            errmsg: "暂无商品/暂无此用户",
            data: {}
        })
    }
}

module.exports = {
    insertstore
}