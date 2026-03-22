import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    avatar?: string;
    role: "user" | "admin";
    dailyGoal: number;
    theme: "light" | "dark";
    createAt: Date;
}

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    avatar: { type: String, default: "default-avatar.png" },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    dailyGoal: { type: Number, default: 10 },
    theme: { type: String, default: "light" },

    createAt: { type: Date, default: Date.now },
});

export const UserModel = model<IUser>("User", UserSchema);
