// 数字藏品
module.exports = (sequelize, Sequelize, DataTypes) => {
    const Collection = sequelize.define('collection', {
        ncid: {
          type: Sequelize.INTEGER,
          primaryKey: true,            // 主键
          autoIncrement: true,         // 自动递增
        },
        // 藏品等级
        level: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
         
        },
        // 藏品图片
        collectionPic: {
          type: DataTypes.STRING,
          allowNull:false
        },
        // 藏品名称
        collectionName: {
          type: DataTypes.INTEGER,
          allowNull:false
        },
        // 藏品价格
        collectionprice: {
          type: DataTypes.STRING,
          allowNull:true
        },
        // 已售数量
        collectionCurrCount: {
          type: DataTypes.STRING,
          allowNull:false
        },
        // 藏品总数量
        collectionTotalCount:{
          type: DataTypes.STRING,
          allowNull:false
        },
        // 修炼效率
        efficiency:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        // 灵气消耗
        reiki:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        // 总灵力
        reikiTotal: {
            type: DataTypes.INTEGER,
            allowNull:false
        }
      },{
        tableName: 'users',
        timestamps:false
      });
      
    return Collection;
  };
  