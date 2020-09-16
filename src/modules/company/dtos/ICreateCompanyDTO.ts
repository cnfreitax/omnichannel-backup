export default interface ICreateCompanyDTO {
  name: string;
  cnpj: string;
  codCampaign?: string;
  email: string;
  address: string;
  ddd: string;
  website: string;
  logo?: string;
  activity: string;
  webhook_status?: string;
  webhook_response?: string;
}
