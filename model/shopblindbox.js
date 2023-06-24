// 盲盒
module.exports = (sequelize, Sequelize, DataTypes) => {
  const ShopBlindbox = sequelize.define('shopblindbox', {
    shopBoxid: {
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
    // 藏品等级
    level: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    // 盲盒图片
    boxPic: {
      type: DataTypes.STRING,
      allowNull:false
    },
    // 盲盒名称
    boxName: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    // 盲盒原价
    boxOriginalPrice: {
      type: DataTypes.STRING,
      allowNull:true
    },
     // 盲盒特价
    boxSpecialPrice: {
        type: DataTypes.STRING,
        allowNull:true
    },
    // 盲盒概率
    boxOdds:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
   
  },{
    tableName: 'shopblindbox',
    timestamps:false
  });
  return ShopBlindbox;
  };
  