const asyncHandler = require('./../@doctor-api/helpers/asyncHandler');
const sendRequest = require('../utils/response');
const { User } = require("../models");

exports.patients = asyncHandler(async (req, res, next) =>
{
  const patients = await User.findAndCountAll
  (
    {
      where: { id_role: 1 }
    }
  );

  sendRequest(patients, 200, res);
});
