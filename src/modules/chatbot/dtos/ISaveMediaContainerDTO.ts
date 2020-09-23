import { ContainerType } from '../infra/typeorm/entities/Container';
import IContentTypeDTO from './IContentTypeDTO';

export default interface ISaveMediaContainer {
  from?: number;
  to?: number;
  content?: IContentTypeDTO;
  company_id: number;
  description: string;
  type: ContainerType;
  expects_input?: boolean;
  mediaFileName: string;
}
