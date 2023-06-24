let db = require("../utils/database");
const Shopblindbox = db.shopblindbox;
const Shopfigure = db.shopfigure;
const Shopjindan = db.shopjindan;
const Shopreiki = db.shopreiki;
const Storehouse = db.storehouse;

// 分页查询函数
async function getProducts(library,pageNumber, pageSize,) {
    const offset = (pageNumber - 1) * pageSize;
    const products = await library.findAll({
      offset,
      limit: pageSize,
      order: [['price', sortPrice == 1? 'ASC' : 'DESC']], // 按照价格升序排序
    });
    return products;
  }
// 市场list
const shopList = async (req, res, next) => {
    let { page,size,type,sortPrice } = req.body;
    let library;
    if(type == 1) {
        library = Shopfigure;
    } else if (type == 2) {
        library = Shopblindbox;
    } else if(type == 3) {
        library = Shopreiki;
    } else if(type == 4) {
        library = Shopjindan;
    }


    getProducts(library,page, size,sortPrice)
    .then(products => {
        console.log(products);
    })
    .catch(error => {
        console.error(error);
    });
}




module.exports = {
    shopList
}