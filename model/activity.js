// 盲盒
module.exports = (sequelize, Sequelize, DataTypes) => {
    const Blindbox = sequelize.define('blindbox', {
        boxid: {
          type: Sequelize.INTEGER,
          primaryKey: true,            // 主键
          autoIncrement: true,         // 自动递增
        },
        // 活动状态
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
           
          },
        // 消耗灵气
        reiki: {
          type: DataTypes.INTEGER,
          allowNull:false
        },
        // 盲盒名称
        collectionPic: {
          type: DataTypes.STRING,
          allowNull:false
        },
       // 活动类型
       activityType: {
        type: DataTypes.INTEGER, // 0未开始 1 进行中 2结束
        allowNull:false
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
       // 活动开始时间
       activityType: {
        type: DataTypes.DATE,
        allowNull:false
      },
       // 活动结束时间
       activityType: {
        type: DataTypes.DATE,
        allowNull:false
      },
      },{
        tableName: 'users',
        timestamps:false
      });
      
    return Blindbox;
  };
  