import { IAddOptions } from "./IAddOptions";

export interface IExpense extends IAddOptions {
  createdAt: string;
  updatedAt: string;
}
