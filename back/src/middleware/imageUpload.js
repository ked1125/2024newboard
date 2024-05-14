// const multer = require("multer");
// const { v4: uuid } = require("uuid");
// const mime = require("mime-types");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // destination:(req,file,cb)=>{}, // 매서드???ㅠㅠ?
//     // cb는 콜백을 의미
//     return cb(null, "./uploads");
//   },
//   filename: (req, file, cb) => {
//     return cb(null, `${uuid()}.${mime.extension(file.mimetype)}`);
//   },
// });
// const upload = multer({
//   storage,
//   // storage:storage
//   fileFilter: (req, file, cb) => {
//     if (["imge/png", "images/jpeg"].includes(file.mimetype)) {
//       return cb(null, true);
//     } else {
//       return cb(new Error("invlid file type"), false);
//     }
//   },SSSrS
//   limits: {
//     fileSize: 1024 * 1024 * 5,
//     // fileSize:1024*1024*5 = > 5mb로 제한을 둠
//   },
// });

// module.exports = upload;

const multer = require("multer");
const { v4: uuid } = require("uuid");
const mime = require("mime-types");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    return cb(null, `${uuid()}.${mime.extension(file.mimetype)}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (["image/png", "image/jpeg"].includes(file.mimetype)) {
      return cb(null, true);
    } else {
      return cb(new Error("invlid file type"), false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

module.exports = upload;
