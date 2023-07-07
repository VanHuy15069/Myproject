import multer from "multer"
import path from "path"

const storageImage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '..', '', 'public/Images'))
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname))
    }
})

const storageMusic = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '..', '', 'public/Images'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

export const uploadImage = multer({
  storage: storageImage,
  limits: { fileSize: '1000000' },
  fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png|webp/;
      const mimeType = fileTypes.test(file.mimetype);
      const extname = fileTypes.test(path.extname(file.originalname));
      if (mimeType && extname) {
          return cb(null, true);
      }
      cb('Give proper files formate to upload');
  },
}).single('image');

export const uploadMusic = multer({
  storage: storageMusic,
  limits: { fileSize: '10000000' }
}).single('musicLink');

export const uploadManyFiles = multer({storage: storageMusic}).fields([
  {name: 'musicLink', maxCount: 1},
  {name: 'image', maxCount: 1}
]) 
