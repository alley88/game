// 盲盒
module.exports = (sequelize, Sequelize, DataTypes) => {
    const Blindbox = sequelize.define('blindbox', {
        boxid: {
          type: Sequelize.INTEGER,
          primaryKey: true,            // 主键
          autoIncrement: true,         // 自动递增
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
        // 盲盒已售数量
        boxCurrCount: {
          type: DataTypes.STRING,
          allowNull:false
        },
        // 盲盒总数量
        boxTotalCount:{
          type: DataTypes.STRING,
          allowNull:false
        },
        // 盲盒概率
        boxOdds:{
            type: DataTypes.INTEGER,
            allowNull:false
        }
       
      },{
        tableName: 'users',
        timestamps:false
      });
      
    return Blindbox;
  };
  