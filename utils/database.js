const config = require("../config/config.js");
const { Sequelize, DataTypes, Op } = require("sequelize");

const sequelize = new Sequelize(
  config.db.DB_NAME, // 库名
  config.db.DB_USER, // 用户名
  config.db.DB_PASS, // 密码
  {
    host: config.db.DB_HOST, // ip
    dialect: config.db.dialect, // 数据库类型
    operatorsAliases: false,

    poll: {
      max: config.db.pool.max,
      min: config.db.pool.min,
      acquire: config.db.pool.acquire,
      idle: config.db.pool.idle
    }
  }
);


sequelize.authenticate().then(function () {
  console.log('链接成功');
}).catch(function (e) {
  console.error('链接失败:', e);

});

var db = {};
db.Sequelize = Sequelize;
db.Op = Op;
db.sequelize = sequelize;
// 活动
db.activity = require("../model/activity.js")(sequelize, Sequelize, DataTypes);
// 盲盒
db.blindbox = require("../model/blindbox.js")(sequelize, Sequelize, DataTypes);
// 数字藏品
db.numberCollection = require("../model/numberCollection.js")(sequelize, Sequelize, DataTypes);
// 用户
db.user = require("../model/user.js")(sequelize, Sequelize, DataTypes);

// ----------------------------------------------市场--------------------------------------------------------------------------------------------------
// 盲盒
db.shopblindbox = require("../model/shopblindbox.js")(sequelize, Sequelize, DataTypes);
// 人物
db.shopfigure = require("../model/shopfigure.js")(sequelize, Sequelize, DataTypes);
// 金单
db.shopjindan = require("../model/shopjindan.js")(sequelize, Sequelize, DataTypes);
// 灵气
db.shopreiki = require("../model/shopreiki.js")(sequelize, Sequelize, DataTypes);

//----------------------------------------------仓库--------------------------------------------------------------------------------------------------
db.storehouse = require("../model/storehouse.js")(sequelize, Sequelize, DataTypes);

module.exports = db;

