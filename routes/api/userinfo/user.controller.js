// const User = require('../../../models/user');

/* 
    GET /api/userinfo
*/

exports.check = (req, res) => {
  res.json({
    success: true,
    info: req.decoded,
  });
};
