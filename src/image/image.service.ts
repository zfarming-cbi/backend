import * as fs from 'fs';

export class ImageService {
  constructor() {}

  saveImage(
    entity: string,
    id: string,
    tempImagePath: string,
    originalname: string,
  ): string {
    const finalImagePath = `images/${entity}/${id}`;
    if (!fs.existsSync(finalImagePath)) {
      fs.mkdirSync(finalImagePath, { recursive: true });
    }
    fs.renameSync(tempImagePath, `${finalImagePath}/${originalname}`);
    return `${finalImagePath}/${originalname}`;
  }
}
