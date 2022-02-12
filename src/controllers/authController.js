const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const AppError = require('../@doctor-api/modules/AppError');
const sendRequest = require('../utils/response');
const Email = require('../utils/email');
const asyncHandler = require('./../@doctor-api/helpers/asyncHandler');

const { User, Role, Token} = require("../models");

const signToken = (id, res) =>
{
  const token = jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
  const cookieOptions = 
  {
    expires: new Date(Date.now() + (process.env.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 1000)),
    httpOnly: true
  };
     
  if(process.env.NODE_ENV === 'Production')
  {
    cookieOptions.secure = true;
  }
  res.cookie('jwt', token, cookieOptions);
  return token;
}
 
exports.signIn = asyncHandler(async (req, res, next) =>
{
  const { email, password } = req.body;

  if(!email || !password)
  {
    return next(new AppError('No pueden haber campos vacios', 400));
  }
    
  const getUser = await User.scope('withPassword').findOne
  ({
    attributes: 
    {
      exclude: ['id_role']
    },
    where: { email },
    include: Role
  })

  if(!getUser)
  {
    return next(new AppError('Email o contraseña incorrecto', 401));
  }

  const matchPassword = await getUser.comparePassword(password)

  if(!matchPassword)
  {
    return next(new AppError('Email o contraseña incorrecto', 401));
  }

  const token = signToken(getUser.id_user, res);
  delete getUser.dataValues.password;
  getUser.dataValues.token = token;

  sendRequest(getUser, 200, res);
});

exports.signUp = asyncHandler(async (req, res, next) =>
{
  if(req.body.confirmPassword !== req.body.password)
  {
    return next(new AppError('Contraseñas incorrectas', 401));
  }

  const confirmUser = await User.findOne({ where: { email: req.body.email } });

  if(confirmUser)
  {
    return next(new AppError('Ya existe una cuenta con ese email', 401));
  }

  const user = await User.create
  (
    {
      name: req.body.name,
      surname: req.body.surname,
      password: req.body.password,
      email: req.body.email,
      phone: req.body.phone,
      id_role: 1
    }
  );

  delete user.dataValues.password;

  sendRequest(user, 200, res);
});

exports.forgetPassword = asyncHandler(async (req, res, next) =>
{
  const user = await User.findOne(
  { 
    attributes: 
    {
      exclude: ['id_role']
    },
    where: { email: req.body.email },
    include: Role
  });

  if(!user)
  {
    return next(new AppError('Email incorrecto', 401));
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  const passwordResetExpires = Date.now() + (30 * 60 * 1000);

  const validateToken = await Token.findOne({ where: { id_user: user.id_user }})

  if(validateToken)
  {
    await Token.update({ password_reset_token: passwordResetToken, password_reset_expires: passwordResetExpires }, { where: { id_user: user.id_user }});
  }
  else
  {
    await Token.create({ password_reset_token: passwordResetToken, password_reset_expires: passwordResetExpires, id_user: user.id_user });
  }

  const resetURL = `${req.protocol}://${req.get('host')}/${process.env.VERSION}/resetpassword/${resetToken}`;
  const message = `Forget your password ? submit a PATCH request whit your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password please ignore this message`;

  try
  {
    await new Email(user, resetURL).resetPassword(message);
    sendRequest({ message: 'Email send' }, 200, res);
  }
  catch(err)
  {
    await Token.update({ password_reset_token: null, password_reset_expires: null }, { where: { id_user: user.id_user }})
    return next(new AppError('Hubo un error al enviar el email por favor intente de nuevo', 500));
  }
});

exports.resetPassword = asyncHandler(async (req, res, next) =>
{
  if(req.body.confirmPassword !== req.body.password)
  {
    return next(new AppError('Contraseñas incorrectas', 401));
  }
  
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const token = await Token.findOne({ where: { password_reset_token: hashedToken } });
    
  if(!token)
  {
    return next(new AppError('Ningun usuario con esas credenciales ha solicitado cambio de contraseña', 400));
  }

  if(token.password_reset_expires < Date.now())
  {
    return next(new AppError('La recuperacion de la contraseña ha caducado', 400));
  }

  const user = await User.scope('withPassword').findOne({ where: { id_user: token.id_user } });
  const matchPassword = await user.comparePassword(req.body.password)
    
  if(matchPassword)
  {
    return next(new AppError('Esta es tu actual contraseña por favor ingrese una nueva', 400));
  }

  await Token.update({ password_change_at: new Date().toString(), password_reset_token: null, password_reset_expires: null }, { where: { id_user: user.id_user }});
  await User.update({ password: req.body.password }, { where: { id_user: user.id_user }, individualHooks: true});

  res
  .status(200)
  .json
  (
    {
      status: 'success'
    }
  );
});