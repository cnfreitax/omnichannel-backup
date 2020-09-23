export interface ILoginDTO {
  login: string;
  password: string;
}

export interface ResponseLogin {
  token: string;
  validate: string;
}
