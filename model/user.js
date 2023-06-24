module.exports = (sequelize, Sequelize, DataTypes) => {
    const Users = sequelize.define('users', {
        uid: {
          type: Sequelize.INTEGER,
          primaryKey: true,            // 主键
          autoIncrement: true,         // 自动递增
        },
        username: {
          type: DataTypes.STRING(11),
          allowNull: false,
          unique: true,
          validate: {
            is: /^\d{11}$/ // 使用正则表达式验证手机号为 11 位数字
          }
        },
        password: {
          type: DataTypes.STRING,
          allowNull:false
        },
        logincount: {
          type: DataTypes.INTEGER,
          allowNull:false
        },
        lastlogintime: {
          type: DataTypes.STRING,
          allowNull:true
        },
        registerDate: {
          type: DataTypes.STRING,
          allowNull:false
        },
        avatar:{
          type: DataTypes.STRING,
          allowNull:false
        },
        nickname: {
          type: DataTypes.STRING,
          allowNull:false
        },
        sex: {
          type: DataTypes.INTEGER,
          allowNull:false
        },
        invitecode: {
          type: DataTypes.STRING,
          allowNull:false
        }
      },{
        tableName: 'users',
        timestamps:false
      });
      
    return Users;
  };
  