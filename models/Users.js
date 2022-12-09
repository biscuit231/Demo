const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class Users extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
}}

Users.init(
  {
    users_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        Validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        Validate: {
            len: [6,20],
        }
    },
    date_created: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    friends: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    communities: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'communities',
            key: 'communities_id',
        },
    },
    posts: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    replys: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  },
  {
    // hooks: {
    //     beforeCreate: async (newUserData) => {
    //         newUserData.password = await bcrypt.hash(newUserData.password, 10);
    //         return newUserData;
    //     },
    //     beforeUpdate: async (updatedUserData) => {
    //         updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
    //         return updatedUserData;
    //     }
    // },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'users',
  }
);

module.exports = Users;