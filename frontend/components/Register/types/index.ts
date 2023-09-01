export interface IRegisterFields {
  username: string;
  email: string;
  password: string;
}

export interface IRegister {
  changeForm: () => void;
}

export interface IRegData {
  email: string;
  username: string;
  password: string;
}

export interface IErrorField {
  type: string;
  message: string;
  ref: {
    name: string;
  };
}

type errorFields = "email" | "password" | "username";
export type RegisterErrorType = Record<errorFields, IErrorField>;
