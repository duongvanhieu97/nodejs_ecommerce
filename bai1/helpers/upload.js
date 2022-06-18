const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/files')
    }, filename: function (req, file, cb) {
        const ext = file.mimetype.split("/")[1];
        cb(null, `admin-${file.fieldname}-${Date.now()}.${ext}`);
    }
});

const upload = multer({
    dest: "public/files", storage
});
module.exports = upload