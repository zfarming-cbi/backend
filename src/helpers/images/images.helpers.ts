import * as fs from 'fs';

export const renameImage = (req: any, file: any, cb: any) => {
  const filename = file.originalname;
  cb(null, filename);
};

export const destination = (req: any, file: any, cb: any) => {
  const uploadPath = './images/temp';
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }
  cb(null, uploadPath);
};
