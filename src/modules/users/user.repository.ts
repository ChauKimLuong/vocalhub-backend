import { BaseRepository } from "../../core/base.repository";
import { IUser, UserModel } from "./user.model";

export class UserRepository extends BaseRepository<IUser> {
    constructor() {
        super(UserModel);
    }

    async findAll(): Promise<IUser[]> {
        return UserModel.find().select("-password");
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return await this.findOne({ email: email });
    }

    async findByUsername(username: string): Promise<IUser | null> {
        return await this.findOne({ username: username });
    }
}
