export enum EField {
  email = "email",
  password = "password",
}

export interface IField {
  name: EField;
  placeHolder: string;
  type: EField;
}
