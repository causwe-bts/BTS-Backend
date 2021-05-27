const User = require('../../../models/user');

/* 
    GET /api/userinfo/:username
*/

exports.check = (req, res) => {
  let user = req.decoded.username;
  let query_user = req.params.username;

  const UserChecker = (userInfo) => {
    if (!query_user) {
      // user does not exist
      throw new Error('parameter not exist');
    } else {
      // user exists, check with token name
      if (user !== query_user) {
        throw new Error('cannot refer others userinfo');
      } else {
        return userInfo;
      }
    }
  };

  const respond = (userInfo) => {
    res.json({
      message: 'success',
      userInfo: {
        admin: userInfo.admin,
        username: userInfo.username,
        phonenumber: userInfo.phonenumber,
      },
    });
  };

  // error occured
  const onError = (error) => {
    console.log(error);
    res.status(403).json({
      message: error.message,
    });
  };

  User.findOneByUsername(query_user)
    .then(UserChecker)
    .then(respond)
    .catch(onError);
};
