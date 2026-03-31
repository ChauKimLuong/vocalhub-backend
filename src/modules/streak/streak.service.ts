import { StreakContext } from "./streak.context";
import { StreakModel } from "./streak.model";
import { StreakRepository } from "./streak.repository";



export class StreakService {
    constructor(private readonly streakRepository: StreakRepository) {}

    async updateStreak(userId: string){
        let streak = await this.streakRepository.findUserById(userId);

        if (!streak){
            streak = await this.streakRepository.create(userId);
        }
  
        const context = new StreakContext(streak);
        await context.study(); 

        await this.streakRepository.save(streak);
        
        return streak;
    }
}