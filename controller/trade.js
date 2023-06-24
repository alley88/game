let db = require("../utils/database");
const Shopblindbox = db.shopblindbox;
const Shopfigure = db.shopfigure;
const Shopjindan = db.shopjindan;
const Shopreiki = db.shopreiki;
const Storehouse = db.storehouse;


// 出售商品
const sellShop = async (req, res, next) => {
    // 用户id 商品ID 数量 单价
    let { uid, shopid, num, price } = req.body;
    let data = await Storehouse.findOne({ where: { uid: uid } });

    if (data) {
        if (type == 1) {
            let numberCollectionArr = data.numberCollections;
            let _numberCollections = numberCollectionArr.find(v => v.ncid == shopid);

            if (numberCollections.length == 0 || !_numberCollections) {
                res.json({
                    code: 500,
                    errmsg: "商品不存在",
                    data: {}
                })
                return;
            }

            data.numberCollections.filter(function (v) {
                if (v.ncid == shopid) {
                    // 出售状态 1未修炼 2 修炼 3 上架
                    v.status = 2;
                }
            })

            await data.save();


            await Shopfigure.create({
                uid: uid,
                status:1, // 1是上架 2是出售 3下架
                price: price,
                // 藏品等级
                level: _numberCollections.level,
                // 藏品图片
                collectionPic: _numberCollections.collectionPic,
                // 藏品名称
                collectionName: _numberCollections.collectionName,
                // 藏品价格
                collectionprice: _numberCollections.collectionprice,
                // 修炼效率
                efficiency: _numberCollections.efficiency,
                // 灵气消耗
                reiki: _numberCollections.reiki,
                // 总灵力
                reikiTotal: _numberCollections.reiki
            });

            res.json({
                code: 200,
                errmsg: "上架成功",
                data: {}
            })

        } else if (type == 2) {
            let blindBoxsArr = data.blindBoxs;
            let _blindBoxs = blindBoxsArr.find(v => v.boxid == shopid);

            if (blindBoxsArr.length == 0 || !_blindBoxs) {
                res.json({
                    code: 500,
                    errmsg: "商品不存在",
                    data: {}
                })
                return;
            }

            data.blindBoxs.filter(function (v) {
                if (v.ncid == shopid) {
                    v.status = 3;
                }
            })

            await data.save();


            await Shopblindbox.create({
                uid: uid,
                status:1, // 1是上架 2是出售 3下架
                price: price,
                // 藏品等级
                level: _blindBoxs.level,
                // 盲盒图片
                boxPic: _blindBoxs.boxPic,
                // 盲盒名称
                boxName: _blindBoxs.boxName,
                // 盲盒原价
                boxOriginalPrice: _blindBoxs.boxOriginalPrice,
                // 盲盒特价
                boxSpecialPrice: _blindBoxs.boxSpecialPrice,
                // 盲盒概率
                boxOdds: _blindBoxs.boxOdds

            });

            res.json({
                code: 200,
                errmsg: "上架成功",
                data: {}
            })
        } else if (type == 3) {
            if (data.reikisCount == 0 || data.reikisCount < num) {
                res.json({
                    code: 500,
                    errmsg: "上架商品数量有误",
                    data: {}
                })
                return;
            }
            // 买卖成功后的逻辑
            data.reikisCount = data.reikisCount - num;
            data.save();

            await Shopreiki.create({
                uid: uid,
                status:1, // 1是上架 2是出售 3下架
                // 数量
                count: n,
                // 单价
                price: price,
                // 总价
                totalPrice: price * num,

            })

            res.json({
                code: 200,
                errmsg: "出售成功",
                data: {}
            })

        } else if (type == 4) {

            if (data.jindansCount == 0 || data.jjindansCount < num) {
                res.json({
                    code: 500,
                    errmsg: "上架商品数量有误",
                    data: {}
                })
                return;
            }
            // 买卖成功后的逻辑
            data.jindansCount = data.jindansCount - num;
            data.save();

            Shopjindan.create({
                uid: uid,
                status:1, // 1是上架 2是出售 3下架
                // 数量
                count: n,
                // 单价
                price: price,
                // 总价
                totalPrice: price * num,
            })

            res.json({
                code: 200,
                errmsg: "出售成功",
                data: {}
            })
        }
    }

}


// 下架
const buyShop = async (req, res, next) => {
    // 用户id 商品ID 数量 单价
    let { uid, type, shopId } = req.body;
    let data = await Storehouse.findOne({ where: { uid: uid } });
    let library;
    if (data) {


        if (type == 1) {
            library = Shopfigure;

            let _library = await library.findOne({where:{shopsfigureid:shopId}});
            _library.status = 3;
            await _library.save();

            data.numberCollections.filter(function (v) {
                if (v.ncid == shopid) {
                    // 出售状态 1未修炼 2 修炼 3 上架
                    v.status = 1;
                }
            })

            await data.save();
            

        } else if (type == 2) {
            library = Shopblindbox;

            let _library = await library.findOne({where:{shopBoxid:shopId}});
            _library.status = 3;
            await _library.save();

            data.blindBoxs.filter(function (v) {
                if (v.ncid == shopid) {
                    // 出售状态 1未修炼 2 修炼 3 上架
                    v.status = 1;
                }
            })
            await data.save();

           
        } else if (type == 3) {
            library = Shopreiki;
            let _shopreiki = library.findOne(({ where: { shopreikiid: shopId } }));
            _library.status = 3;
            data.reikisCount = data.reikisCount + _shopreiki.count;
            await data.save();
            await _library.save();

        } else if (type == 4) {
            library = Shopreiki;
            let _shopjindan = Shopjindan.findOne(({ where: { shopjindanid: shopId } }));
            _library.status = 3;
            data.jindansCount = data.jindansCount + _shopjindan.count;
            await data.save();
            await _library.save();

        }

        res.json({
            code: 200,
            errmsg: "下架成功",
            data: {}
        })
    }
}




// 这个接口逻辑有问题

/*
    1、找到买的仓库
    2、找到卖家的仓库
    3、找到商品表


    1、把商品添加到买的仓库
    2、把商品从卖家的仓库移除
    3、将商品表的状态改成交易成功
*/

// 购买市场商品
const purchaseReikiShop = async (req,res,next) => {
    // type : 1 人物 2 盲盒 3 灵气 4 金丹
    let { id, uid, num, type, price,boxid,ncid }  = req.body;

    //卖家
    let targetData = await Storehouse.findOne({ where: { storehouseid: id } });
    //买家
    let data = await Storehouse.findOne({ where: { uid: uid } });

    if(targetData && data) {
        if(type == 1) {
            let _numberCollections =  targetData.numberCollections.find(v=>v.ncid == ncid);
            targetData.numberCollections = targetData.numberCollections.filter(item => item.ncid != _blindbox.ncid);
            data.numberCollections.push(_numberCollections);
        } else if(type == 2) {
            let _blindbox =  targetData.blindBoxs.find(v=>v.boxid == boxid);
            targetData.blindBoxs = targetData.blindBoxs.filter(item => item.boxid != _blindbox.boxid);
            data.blindBoxs.push(_blindbox);

        } else if(type == 3) {
            let arr =  targetData.reikis.splice(0,num);
            data.reikis =  data.reikis.concat(arr);
        } else if (type == 4) {
            let arr =  targetData.jindans.splice(0,num);
            data.jindans =  data.jindans.concat(arr);
        }
        await targetData.save();
        await data.save();

        res.json({
            code: 200,
            errmsg: "购买成功",
            data: {}
        })
    } else {
        res.json({
            code: 500,
            errmsg: "此商品已售空/商品有误",
            data: {}
        })
    }
}



module.exports = {
    sellShop,
    buyShop,
    purchaseReikiShop
}