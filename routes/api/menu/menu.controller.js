const Menu = require('../../../models/menu');
const Order = require('../../../models/order');
const config = require('../../../config');
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../../../public/api/');

/*
    POST /api/menu/menulist
    should be received from form-data
    {
        imageFile,
        name,
        description,
        price
    }
*/

exports.postMenuList = (req, res) => {
  const { name, description, price } = req.body;
  const menuInfo = {
    name: name,
    description: description,
    price: price,
    imgURL: config.serverURL + '/api/' + req.file.filename,
  };
  const create = (menu) => {
    if (menu) {
      fs.access(filePath + req.file.filename, fs.constants.F_OK, (err) => {
        if (err) console.log('file cannot be deleted');
        else {
          fs.unlink(filePath + req.file.filename, (err) => {
            if (err) {
              console.log(err);
            }
          });
        }
      });
      // fs.access(filePath)
      throw new Error('menu exists');
    } else {
      return Menu.create(menuInfo);
    }
  };
  // respond to the client
  const respond = (menuInfo) => {
    res.json({
      message: 'success',
      body: {
        menuInfo,
      },
    });
  };

  const onError = (error) => {
    res.status(403).json({
      message: 'unsuccess',
      body: {
        error: error.message,
      },
    });
  };
  Menu.findOneByMenuname(name).then(create).then(respond).catch(onError);
};

/*
    GET /api/menu/menulist
*/

exports.getMenuList = (req, res) => {
  const respond = (menuList) => {
    res.json({
      message: 'success',
      body: {
        menuList,
      },
    });
  };
  const onError = (error) => {
    res.status(403).json({
      message: 'unsuccess',
      body: {
        error: error.message,
      },
    });
  };
  Menu.findMenus().then(respond).catch(onError);
};

/*
    POST /api/menu/order
    {   
        order_id,
        orderer,
        order : [
          {
            menu_id,
            quantity
          },
          {
            menu_id,
            quantity
          },
          ...
        ]
        datetime,
        status
    }
*/
exports.postOrder = (req, res) => {
  const { username } = req.decoded;
  const { orderer, order, status } = req.body;

  console.log(username, orderer);

  const orderInfo = {
    orderer,
    order,
    status,
  };

  const respond = (orderInfo) => {
    res.json({
      message: 'success',
      body: {
        orderInfo,
      },
    });
  };

  const onError = (error) => {
    res.status(403).json({
      message: 'unsuccess',
      body: {
        error: error.message,
      },
    });
  };

  if (username !== orderer) {
    res.json({
      message: 'unsuccess',
      body: {
        error: 'cannot order by other name',
      },
    });
  } else {
    Order.create(orderInfo).then(respond).catch(onError);
  }
};
