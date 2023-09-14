import * as fs from 'fs';

// export const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const folderName = req.params.id; // Obtiene el id desde el DTO
//     const uploadPath = `./uploads/${folderName}`;
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const name = file.originalname.split('.')[0];
//     const filename = file.originalname;
//     const randonName = Array(4)
//       .fill(null)
//       .map(() => Math.round(Math.random() * 16).toString(16))
//       .join('');
//     cb(null, `${name}-${randonName}${filename}`);
//   },
// });

export const renameImage = (req: any, file: any, cb: any) => {
  const name = file.originalname.split('.')[0];
  const filename = file.originalname;
  const randonName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  cb(null, `${name}-${randonName}${filename}`);
};

export const destination = (req: any, file: any, cb: any) => {
  const entity = req.url.split('/')[3];
  const folderName = req.params.id;
  let uploadPath;
  if (folderName) {
    uploadPath = `./uploads/${entity}/${folderName}`;
  } else {
    uploadPath = `./uploads/${entity}`;
  }
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }
  cb(null, uploadPath);
};
