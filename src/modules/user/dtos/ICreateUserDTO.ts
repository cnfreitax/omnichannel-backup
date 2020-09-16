export default interface ICreateUsertDTO {
  name: string;
  email: string;
  access_level: 'adm' | 'common';
  password: string;
}
