import { Schema } from "mongoose";

export interface IUserSchema {
  _id: string;
}

export default new Schema<IUserSchema>({
  _id: {
    type: "String",
    required: true,
  },
});
