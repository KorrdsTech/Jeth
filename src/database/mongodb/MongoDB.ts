import mongoose, { model } from "mongoose";
import UserSchema, { IUserSchema } from "./schemas/UserSchema";

type Empty = Record<string, never>;

export default class MongoDB {
  public users: mongoose.Model<IUserSchema, Empty, Empty, Empty, unknown>;
  constructor() {
    this.users = model<IUserSchema>("User", UserSchema);
  }
  connect() {
    return mongoose.connect(process.env.mongoose_uri, {}, (err) => {
      if (err) console.log("Cannot connect with mongodb: " + err);
      console.log("Connected with mongodb");
    });
  }
}
