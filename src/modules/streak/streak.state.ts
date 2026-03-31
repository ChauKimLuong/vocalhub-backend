import { StreakContext } from "./streak.context";



export interface IStreakState {
    handleStudy(context: StreakContext): Promise<void>;
    handleMidnight(context: StreakContext): Promise<void>;
}

export class InactiveState implements IStreakState {
    async handleStudy(context: StreakContext): Promise<void>{
        context.data.streakCount += 1;
        context.data.lastStudyDate = new Date();
        context.transitionTo(new ActiveState(), "ACTIVE");
    }

    async handleMidnight(context: StreakContext): Promise<void> {
        if (context.data.freezeChances > 0) {
            context.data.freezeChances -= 1;
            context.transitionTo(new FrozenState(), "FROZEN");
        } else {
            context.data.streakCount = 0;
        }
    }
}

export class ActiveState implements IStreakState {
    async handleStudy(context: StreakContext): Promise<void>{
        context.data.lastStudyDate = new Date();
    }

    async handleMidnight(context: StreakContext): Promise<void> {
        context.transitionTo(new ActiveState(), "INACTIVE");
    }
}

export class FrozenState implements IStreakState {
    async handleStudy(context: StreakContext): Promise<void>{
        context.data.streakCount += 1;
        context.data.lastStudyDate = new Date();
        context.transitionTo(new ActiveState(), "ACTIVE");
    }

    async handleMidnight(context: StreakContext): Promise<void> {
        context.transitionTo(new InactiveState(), "INACTIVE");
    }
}