import multer from "multer";
import path from "path";
export const uploadImage = (req,res,next) => {
  const storage = multer.diskStorage({
    destination: "public/files",
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, Date.now() + file.fieldname + path.extname(file.originalname));
    },
  });
  const upload = multer({storage:storage});
  return upload.single('photo');
};
