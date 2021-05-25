const jwt = require('jsonwebtoken');
const User = require('../../../models/user');

/*
    POST /api/store/signup
    {
        username,
        password
    }
*/

exports.postSignUp = (req, res) => {
  const { username, password } = req.body;
  let newUser = null;

  // create a new user if does not exist
  const create = (user) => {
    if (user) {
      throw new Error('username exists');
    } else {
      return User.create(username, password);
    }
  };

  // count the number of the user
  const count = (user) => {
    newUser = user;
    return User.count({}).exec();
  };

  // assign admin if count is 1
  const assign = (count) => {
    if (count === 1) {
      return newUser.assignAdmin();
    } else {
      // if not, return a promise that returns false
      return Promise.resolve(false);
    }
  };

  // respond to the client
  const respond = (isAdmin) => {
    res.json({
      message: 'registered successfully',
      admin: isAdmin ? true : false,
    });
  };

  // run when there is an error (username exists)
  const onError = (error) => {
    res.status(409).json({
      message: error.message,
    });
  };

  // check username duplication
  User.findOneByUsername(username)
    .then(create)
    .then(count)
    .then(assign)
    .then(respond)
    .catch(onError);
};

/*
    POST /api/store/signin
    {
        username,
        password
    }
*/

exports.postSignIn = (req, res) => {
  const { username, password } = req.body;
  const secret = req.app.get('jwt-secret');
  const options = {
    expiresIn: '7d',
    issuer: 'caupizza.com',
    subject: 'userInfo',
  };

  // check the user info & generate the jwt
  const check = (user) => {
    if (!user) {
      // user does not exist
      throw new Error('login failed');
    } else {
      // user exists, check the password
      if (user.verify(password)) {
        // create a promise that generates jwt asynchronously
        const p = new Promise((resolve, reject) => {
          jwt.sign(
            {
              _id: user._id,
              username: user.username,
              admin: user.admin,
            },
            secret,
            options,
            (err, token) => {
              if (err) reject(err);
              resolve(token);
            }
          );
        });
        return p;
      } else {
        throw new Error('login failed');
      }
    }
  };

  // respond the token
  const respond = (token) => {
    res.json({
      message: 'logged in successfully',
      token,
    });
  };

  // error occured
  const onError = (error) => {
    res.status(403).json({
      message: error.message,
    });
  };

  // find the user
  User.findOneByUsername(username).then(check).then(respond).catch(onError);
};

/*
    GET /api/store/orderlist
*/

exports.getOrderList = (req, res) => {
  console.log(req, res);
  console.log('do something here');
  res.json({
    message: 'success',
  });
};

/*
    GET /api/store/soldlist
*/

exports.getSoldList = (req, res) => {
  console.log(req, res);
  console.log('do something here');
  res.json({
    message: 'success',
  });
};

/*
      POST /api/menu/ordermanage
      {
          need specification
      }
*/

exports.postOrderManage = (req, res) => {
  console.log(req, res);
  console.log('do something here');
  res.json({
    message: 'success',
  });
};

/*
    GET /api/store/storeinfo
*/

exports.getStoreInfo = (req, res) => {
  console.log(req, res);
  console.log('do something here');
  res.json({
    message: 'success',
  });
};

/*
    PUT /api/menu/storeinfo
    {
        need specification
    }
*/

exports.putStoreInfo = (req, res) => {
  console.log(req, res);
  console.log('do something here');
  res.json({
    message: 'success',
  });
};
