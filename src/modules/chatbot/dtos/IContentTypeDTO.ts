import IUploadedMediaDTO from '@shared/container/providers/UploadMediaProvider/dtos/IUploadedMediaDTO';
import ICreateOptionDTO from './ICreateOptionDTO';

export default interface IContentTypeDTO {
  media?: IUploadedMediaDTO;
  options?: Array<ICreateOptionDTO>;
  link?: string;
}
