import IContentTypeDTO from './IContentTypeDTO';

export default interface IUpdateContainerDTO {
  id: number;
  from?: number;
  to?: number;
  content?: IContentTypeDTO;
  description?: string;
}
