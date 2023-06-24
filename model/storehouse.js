// 盲盒
module.exports = (sequelize, Sequelize, DataTypes) => {
    const Storehouse = sequelize.define('storehouse', {
        storehouseid: {
          type: Sequelize.INTEGER,
          primaryKey: true,            // 主键
          autoIncrement: true,         // 自动递增
        },
        // 用户id
        uid:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        // 用户卡槽
        cardCout: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        // 盲盒
        blindBoxs: {
            type: DataTypes.ARRAY(DataTypes.JSON), // 定义数组对象字段
            defaultValue: [] // 设置默认值为空数组
        },
        // 人物
        numberCollections: {
            type: DataTypes.ARRAY(DataTypes.JSON), // 定义数组对象字段
            defaultValue: [] // 设置默认值为空数组
        },
        // 元气
        reikis: {
            type: DataTypes.ARRAY(DataTypes.JSON), // 定义数组对象字段
            defaultValue: [] // 设置默认值为空数组
        },
        //金丹
        jindans: {
            type: DataTypes.ARRAY(DataTypes.JSON), // 定义数组对象字段
            defaultValue: [] // 设置默认值为空数组
        },
        
      },{
        tableName: 'storehouse',
        timestamps:false
      });
      
    return Storehouse;
  };
  