import { UserBuilder } from "./user.builder";
import { IUser } from "./user.model";
import { UserRepository } from "./user.repository";


export class UserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository){
        this.userRepository = userRepository;
    }

    async getAll() {
        return this.userRepository.findAll();
    }

    public async findUserByEmail(email: string){
        return this.userRepository.findByEmail(email)
    }

    public async findUserByUsername(email: string){
        return this.userRepository.findByUsername(email)
    }

    public async registerBasicUser(data: any){
        const newUser = new UserBuilder(data.email, data.password)
                            .setUsername(data.username)
                            .setDailyGoal(data.dailyGoal)
                            .build();
        return await this.userRepository.create(newUser);
    }

    public async createBasicAdmin(data: any){
        const newAdmin = new UserBuilder(data.email, data.password)
                            .setUsername(data.username)
                            .setAdmin()
                            .build();
        return await this.userRepository.create(newAdmin);
    }
}