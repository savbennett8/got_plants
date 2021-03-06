const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create Post model
class Post extends Model { }

//create fields/columns for Post model
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // post_photo: {
        //     type: DataTypes.STRING
        // },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        //don't pluralize
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;