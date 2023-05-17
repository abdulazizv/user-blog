import multer from "multer";
import { resolve } from "path";
import { existsSync, unlink, mkdirSync } from "fs";

const diskStorage = multer.diskStorage({
  destination: (req, file, done) => {
    if (!file) return done(new Error("Upload file error"), "");

    const isFolderExists = existsSync(resolve(process.cwd(), "public/images"));

    if (!isFolderExists) {
      mkdirSync(resolve(process.cwd(), "public/images"), {
        recursive: true,
      });
    }
    const fileName = `${Date.now()}-${file.originalname}`;

    const fileExists = existsSync(
      resolve(process.cwd(), `public/images/${fileName}`)
    );

    if (!fileExists) return done(null, resolve(process.cwd(), "public/images"));

    unlink(resolve(process.cwd(), `public/images/${fileName}`), (error) => {
      if (error) return done(error,"");
      return done(null, resolve(process.cwd(), "public/images"));
    });
  },

  filename: (req, file, done) => {
    if (file) {
      const fileName = `${Date.now()}-${file.originalname}`;
      const extFile = file.originalname.replace(".", "");
      const extPattern = /(jpg|jpeg|png|gif|svg)/gi.test(extFile);
      if (!extPattern)
        return done(new TypeError("File format is not valid"), "");

      return done(null, fileName);
    }
  },
});

const fileUpload = multer({ storage: diskStorage, limits: { fileSize: 1000000 } });

export { fileUpload };
