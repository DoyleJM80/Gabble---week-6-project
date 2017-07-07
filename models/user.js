'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      },
    password: DataTypes.STRING,
    first_name: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isAlpha: true
      }
      },
    last_name: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isAlpha: true
      }
      }
  }, {});

  User.associate = (models) => {
    User.belongsToMany(models.Like, {as: 'users', through: 'likes', foreignKey: 'user_id'});
    User.hasMany(models.Gab, {
      as: 'messages',
      foreignKey: 'user_id'});
  };
  return User;
};
