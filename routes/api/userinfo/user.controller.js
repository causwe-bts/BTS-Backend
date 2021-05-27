const User = require('../../../models/user');

/* 
    GET /api/userinfo/
*/

exports.check = (req, res) => {
  let user = req.decoded.username;

  const UserChecker = (userInfo) => {
    if (!userInfo) {
      // user does not exist
      throw new Error('user not exist');
    } else {
      return userInfo;
    }
  };

  const respond = (userInfo) => {
    res.json({
      message: 'success',
      body: {
        userInfo: {
          admin: userInfo.admin,
          username: userInfo.username,
          phonenumber: userInfo.phonenumber,
        },
      },
    });
  };

  // error occured
  const onError = (error) => {
    console.log(error);
    res.status(403).json({
      message: 'unsuccess',
      body: {
        error: error.message,
      },
    });
  };

  User.findOneByUsername(user).then(UserChecker).then(respond).catch(onError);
};
