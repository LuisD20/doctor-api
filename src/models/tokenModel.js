'use strict';
const { Model, DataTypes } = require('sequelize');
const db = require('./_instance');

class Token extends Model 
{

}

Token.init
({
  id_token: 
  {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
  password_change_at: 
  {
    type: DataTypes.STRING,
    allowNull: true
  },
  password_reset_token: 
  {
    type: DataTypes.STRING,
    allowNull: true
  },
  password_reset_expires: 
  {
    type: DataTypes.STRING,
    allowNull: true
  },
}, {
  sequelize: db.sequelize,
  timestamps: true,
  paranoid: true,
  freezeTableName: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  modelName: 'token',
});

module.exports = Token;