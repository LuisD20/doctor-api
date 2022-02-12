'use strict';
const { Model, DataTypes } = require('sequelize');
const db = require('./_instance');

class Role extends Model 
{

}

Role.init
({
  id_role: 
  {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  role: 
  {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize: db.sequelize,
  timestamps: true,
  paranoid: true,
  freezeTableName: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  modelName: 'role',
});

module.exports = Role;