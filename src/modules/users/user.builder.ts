import { IUser } from "./user.model";

export class UserBuilder {
    private user: Partial<IUser>;

    constructor(email: string, password: string){
        this.user = {
            email: email,
            password: password,
            role: "user",
            dailyGoal: 0,
            theme: "light",
        }
    }
    
    public setUsername(username: string): this {
        this.user.username = username
        return this;
    }

    public setAvatar(avatar: string): this {
        this.user.avatar = avatar
        return this;
    }

    public setAdmin(): this {
        this.user.role = "admin";
        return this;
    }

    public setDarkTheme(): this {
        this.user.theme = "dark";
        return this;
    }

    public setDailyGoal(dailyGoal: number): this {
        this.user.dailyGoal = dailyGoal;
        return this;
    }

    build(): Partial<IUser> {
        return this.user;
    }
}