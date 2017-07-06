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

// Blog.associate = (models) => {
//   Blog.belongsToMany(models.Tag, {
//     as: 'Tags',
//     through: 'blog_tags',
//     foreignKey: 'blog_id'
//   });
//   return Tag;
// };
//
//
// Tag.associate= (models) => {
//   Tag.belongsToMany(models.Blog, {
//     as: 'Blogs',
//     through: 'blog_tags',
//     foreignKey: 'tag_id'
//   });
//   return Blog;
// };

// create table

// blog_id: {
//   type: Sequelize.INTEGER,
//   allowNull: false,
//   references: {
//    model: 'Blogs',
//    key: 'id'
//  }
// },
// tag_id: {
//   type: Sequelize.INTEGER,
//   allowNull: false,
//   references: {
//    model: 'Tags',
//    key: 'id'
//  }
// }
