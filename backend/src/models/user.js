const { Model, DataTypes } = require('sequelize');
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create Sequelize instance
const sequelize = new Sequelize({
  database: process.env.DB_NAME || 'bookingapp',
  username: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'password',
  host: process.env.DB_HOST || 'db',
  port: process.env.DB_PORT || 3306,
  dialect: 'mysql'
});

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  firstname: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  created: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  modified: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: false
});

module.exports = User; 