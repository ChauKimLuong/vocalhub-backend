import { IStreak, StreakModel } from "./streak.model";

export class StreakRepository {
    async findUserById(userId: string): Promise<IStreak | null> {
        return await StreakModel.findOne({userId});
    }


    async create(userId: string): Promise<IStreak> {
        const newStreak = new StreakModel({ userId });
        return await newStreak.save();
    }

    async save(streak: IStreak): Promise<IStreak> {
        return await streak.save();
    }
}