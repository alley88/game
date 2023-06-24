// 盲盒
module.exports = (sequelize, Sequelize, DataTypes) => {
    const ShopsJindan = sequelize.define('shopsjindan', {
      shopjindanid: {
          type: Sequelize.INTEGER,
          primaryKey: true,            // 主键
          autoIncrement: true,         // 自动递增
        },
      uid:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
       // 1是上架 2是出售 3下架
    status:{
      type: DataTypes.INTEGER,
      allowNull: false,
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
     
      },{
        tableName: 'shopsjindan',
        timestamps:false
      });
      
    return ShopsJindan;
  };
  