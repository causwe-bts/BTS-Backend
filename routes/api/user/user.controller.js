const jwt = require('jsonwebtoken');
const User = require('../../../models/user');
const Order = require('../../../models/order');

/*
    POST /api/user/signup
    {
        username,
        password,
        phonenumber
    }
*/

exports.postSignUp = (req, res) => {
  const { username, password, phonenumber } = req.body;
  let newUser = null;

  // create a new user if does not exist
  const create = (user) => {
    if (user) {
      throw new Error('username exists');
    } else {
      return User.create(username, password, phonenumber);
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
      message: 'success',
      body: {
        admin: isAdmin ? true : false,
      },
    });
  };

  // run when there is an error (username exists)
  const onError = (error) => {
    res.status(403).json({
      message: 'unsuccess',
      body: {
        error: error.message,
      },
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
    POST /api/user/signin
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
      message: 'success',
      body: {
        token,
      },
    });
  };

  // error occured
  const onError = (error) => {
    res.status(403).json({
      message: 'unsuccess',
      body: {
        error: error.message,
      },
    });
  };

  // find the user
  User.findOneByUsername(username).then(check).then(respond).catch(onError);
};

/*
    GET /api/user/orderlist
*/

exports.getOrderList = (req, res) => {
  // respond to the client
  const { username } = req.decoded;

  // respond the token
  const respond = (userOrders) => {
    res.json({
      message: 'success',
      body: {
        userOrders,
      },
    });
  };

  // error occured
  const onError = (error) => {
    res.status(403).json({
      message: 'unsuccess',
      body: {
        error: error.message,
      },
    });
  };

  Order.findByUserName(username).then(respond).catch(onError);
};
