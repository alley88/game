let db = require("../utils/database");
const Shopblindbox = db.shopblindbox;
const Shopfigure = db.shopfigure;
const Shopjindan = db.shopjindan;
const Shopreiki = db.shopreiki;

const shopList = async (req, res, next) => {
    let { page,size,type,maxprice,minprice } = req.body;

    if(type == 1) {

    } else if (type == 2) {

    } else if(type == 3) {

    } else if(type == 4) {
        
    }
}

module.exports = {
    shopList
}