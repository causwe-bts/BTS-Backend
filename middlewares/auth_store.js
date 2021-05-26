const jwt = require('jsonwebtoken');

const authMiddleware_store = (req, res, next) => {
  // read the token from header or url
  // const token = req.headers['authorization'] || req.query.token;
  const token = req.headers.authorization.split('Bearer ')[1];

  // token does not exist
  if (!token) {
    return res.status(403).json({
      success: false,
      message: 'not logged in',
    });
  }

  // create a promise that decodes the token
  const p = new Promise((resolve, reject) => {
    jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
      if (err) reject(err);
      if (!decoded.admin) reject(new Error('not admin'));
      resolve(decoded);
    });
  });

  // if it has failed to verify, it will return an error message
  const onError = (error) => {
    res.status(403).json({
      success: false,
      message: error.message,
    });
  };

  // process the promise
  p.then((decoded) => {
    req.decoded = decoded;

    next();
  }).catch(onError);
};

module.exports = authMiddleware_store;
