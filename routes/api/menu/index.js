const router = require('express').Router();
const controller = require('./menu.controller');
const multer = require('multer');
const randomstring = require('randomstring');

// image uploader setting
const imageUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `${__dirname}/../../../public/api`); // public 폴더를 지정합니다.
    },
    filename: (req, file, cb) => {
      let fileName = randomstring.generate(25); // 파일 이름입니다. 저는 랜덤 25자로 설정했습니다.
      let mimeType;
      switch (
        file.mimetype // 파일 타입을 거릅니다.
      ) {
        case 'image/jpeg':
          mimeType = 'jpg';
          break;
        case 'image/png':
          mimeType = 'png';
          break;
        case 'image/gif':
          mimeType = 'gif';
          break;
        case 'image/bmp':
          mimeType = 'bmp';
          break;
        default:
          mimeType = 'jpg';
          break;
      }
      cb(null, fileName + '.' + mimeType); // 파일 이름 + 파일 타입 형태로 이름을 바꿉니다.
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // 크기제한입니다. 기준은 byte 입니다.
  },
});

router.post('/menulist', imageUpload.single('image'));
router.post('/menulist', controller.postMenuList);

router.get('/menulist', controller.getMenuList);
router.post('/order', controller.postOrder);

module.exports = router;
