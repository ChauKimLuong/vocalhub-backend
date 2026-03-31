import { IStreak } from "./streak.model";
import { ActiveState, FrozenState, InactiveState, IStreakState } from "./streak.state";

export class StreakContext {
    public data: IStreak;
    private state: IStreakState;

    constructor(streakData: IStreak){
        this.data = streakData;
        this.state = this.mapState(this.data.currentState)
    }

    private mapState(stateStr: String): IStreakState {
        switch (stateStr) {
            case "ACTIVE": return new ActiveState();
            case "FROZEN": return new FrozenState();
            default:
                return new InactiveState();
        }
    }

    public transitionTo(newState: IStreakState, stateName: any){
        this.state = newState;
        this.data.currentState = stateName;
    }

    async study() {
        await this.state.handleStudy(this);
    }

    async midnightCheck() {
        await this.state.handleMidnight(this);
    }
}
