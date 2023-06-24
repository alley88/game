// 盲盒
module.exports = (sequelize, Sequelize, DataTypes) => {
  const Shopsreiki = sequelize.define('shopsreiki', {
    shopreikiid: {
      type: Sequelize.INTEGER,
      primaryKey: true,            // 主键
      autoIncrement: true,         // 自动递增
    },
    // 1是上架 2是出售 3下架
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    uid: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    // 数量
    count: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    // 单价
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    tableName: 'shopsreiki',
    timestamps: false
  });

  return Shopsreiki;
};
