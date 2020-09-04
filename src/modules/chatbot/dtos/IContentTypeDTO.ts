import ICreateOptionDTO from './ICreateOptionDTO';

export default interface IContentTypeDTO {
  path?: string;
  options?: Array<ICreateOptionDTO>;
  link?: string;
}
