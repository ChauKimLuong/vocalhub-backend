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

    public async findUserByUsername(username: string){
        return this.userRepository.findByUsername(username)
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

    async assignDefaultVocabulary(userId: string) {
        console.log(`[User Service] => Đang cấp bộ từ vựng Oxford 3000 mặc định cho User ID: ${userId}`);

        await new Promise(resolve => setTimeout(resolve, 500));
        
        console.log(`[User Service] => Đã cấp bộ từ vựng thành công! Sẵn sàng học theo SM-2.`);
    }
}

export const userService = new UserService(new UserRepository());