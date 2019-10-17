import multer from "multer";

const storage = multer.diskStorage({  // настройки хранилища
    filename: function(req, file, callback) {
        callback(null, Date.now() + file.originalname); // даем оригинальное имя файлу
    }
});

const imageFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {      // нам нужны только изображения
        return cb(new Error('Поддерживаются только файлы изображений!'), false);
    }
    cb(null, true);
};

const multerUpload = multer({ storage: storage, fileFilter: imageFilter}); // настройки multer'а для экспорта
export default multerUpload;