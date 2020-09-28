import Axios from 'axios';
import fs from 'fs';
import path from 'path';
import FormData from 'form-data';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import IUploadedMediaDTO from '../dtos/IUploadedMediaDTO';
import IUploadMediaProvider from '../models/IUploadMediaProvider';

export default class UploadMediaProvider implements IUploadMediaProvider {
  public async upload(fileName: string): Promise<IUploadedMediaDTO> {
    let uploadInfo;
    let uploadedFileInfo: IUploadedMediaDTO;
    const filePath = path.resolve(uploadConfig.uploadsFolder, fileName);
    const file = fs.createReadStream(filePath);
    const form = new FormData();
    form.append('File', file);

    const formHeaders = form.getHeaders();

    try {
      uploadInfo = await Axios.post('https://api.flexcontact.com.br/Messaging/UploadFile' || 'default', form, { headers: { ...formHeaders } });
    } catch (e) {
      throw new AppError('API error');
    }

    uploadedFileInfo = uploadInfo.data;

    return uploadedFileInfo;
  }
}
