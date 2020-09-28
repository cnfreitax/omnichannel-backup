import IUploadedMediaDTO from '../dtos/IUploadedMediaDTO';

export default interface IUploadMediaProvider {
  upload(fileName: string): Promise<IUploadedMediaDTO>;
}
