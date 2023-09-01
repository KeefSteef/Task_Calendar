import { IErrorField } from "../../Register/types";

type errorFields = "email" | "password";
export type LoginErrorType = Record<errorFields, IErrorField>;
