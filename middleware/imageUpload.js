// middleware/imageUpload.js
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploads = multer({ storage: storage });

module.exports = uploads;
