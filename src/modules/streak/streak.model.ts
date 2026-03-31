import { Document, Types, Schema, model } from "mongoose";

export type StreakStateType = "ACTIVE" | "INACTIVE" | "FROZEN";

export interface IStreak extends Document {
    userId: Types.ObjectId;
    streakCount: number;
    lastStudyDate?: Date;
    freezeChances: number;
    currentState: StreakStateType;
    updatedAt: Date;
}
const streakSchema = new Schema<IStreak>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    streakCount: { type: Number, default: 0 },
    lastStudyDate: { type: Date },
    freezeChances: { type: Number, default: 3 },
    currentState: { 
        type: String, 
        enum: ["INACTIVE", "ACTIVE", "FROZEN"], 
        default: "INACTIVE" 
    },
    updatedAt: { type: Date, default: Date.now }
})

export const StreakModel = model<IStreak>("Streak", streakSchema);