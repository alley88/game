// 盲盒
module.exports = (sequelize, Sequelize, DataTypes) => {
    const ShopsJindan = sequelize.define('shopsjindan', {
      shopjindanid: {
          type: Sequelize.INTEGER,
          primaryKey: true,            // 主键
          autoIncrement: true,         // 自动递增
        },
      uid:{

      },
      // 数量
     count:{
      type: DataTypes.INTEGER,
      allowNull:false
     },
      // 单价
     price: {
      type: DataTypes.INTEGER,
      allowNull:false
     },
     // 总价
     totalPrice: {
      type: DataTypes.INTEGER,
      allowNull:false
     },
      },{
        tableName: 'users',
        timestamps:false
      });
      
    return Blindbox;
  };
  