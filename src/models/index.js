const Role = require("./roleModel");
const User = require("./userModel");
const Token = require("./tokenModel");

const models = 
{
  Role,
  User,
  Token
}

// relation
User.belongsTo(Role, { foreignKey: { name:'id_role', allowNull: false }});

Token.belongsTo(User, { foreignKey: { name:'id_user', allowNull: false }});

module.exports = models;