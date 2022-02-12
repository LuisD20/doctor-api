'use strict';
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const db = require('./_instance');

class User extends Model 
{

}

User.init
({
  id_user: 
  {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: 
  {
    type: DataTypes.STRING,
    allowNull: false
  },
  surname: 
  {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: 
  {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: 
  {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: 
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
  modelName: 'user',
  defaultScope: 
  {
    attributes: 
    {
      exclude: ['password'],
    },
  },
  scopes:
  {
    withPassword: {},
  },
});

/**
 *
 * @param instance
 */

function setUserPassword(instance) 
{
  const { password } = instance;

  const hash =  bcrypt.hashSync(password, 12);
  instance.setDataValue('password', hash);
}

User.addHook('beforeCreate', setUserPassword)
User.addHook('beforeUpdate', setUserPassword)

User.prototype.comparePassword = async function (candidatePassword) 
{
  return await new Promise((resolve, reject) => 
  {
    void bcrypt.compare(
      candidatePassword,
      String(this.password),
      function (err, isMatch) 
      {
        if (err) reject(err)
        resolve(isMatch)
      }
    )
  })
}

module.exports = User;