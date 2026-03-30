import { Document, Schema, model } from "mongoose";

type StreakStateType = "INACTIVE" | "ACTIVE" | "FROZEN";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    avatar?: string;
    role: "user" | "admin";
    dailyGoal: number;
    theme: "light" | "dark";
    streakCount: number;
    lastStudyDate: Date;
    freezeChances: number;
    streakState: StreakStateType;
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
    streakCount: { type: Number, default: 0 },
    lastStudyDate: { type: Date },
    freezeChances: { type: Number, default: 3 },
    streakState: {
        type: String,
        enum: ["INACTIVE", "ACTIVE", "FROZEN"],
        default: "INACTIVE",
    },
    createAt: { type: Date, default: Date.now },
});

export const UserModel = model<IUser>("User", UserSchema);
