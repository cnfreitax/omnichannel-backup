import IUploadedMediaDTO from '@shared/container/providers/UploadMediaProvider/dtos/IUploadedMediaDTO';
import IApiInfoDTO from './IApiInfoDTO';
import ICreateOptionDTO from './ICreateOptionDTO';

export default interface IContentTypeDTO {
  media?: IUploadedMediaDTO;
  options?: Array<ICreateOptionDTO>;
  api?: IApiInfoDTO;
}
