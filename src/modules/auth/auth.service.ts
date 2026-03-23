import { EVENTS } from "../../utils/event.constant";
import { EventBus, eventBus } from "../../utils/eventBus";
import { UserService, userService } from "../users/user.service"
import bcrypt from "bcrypt"

export class AuthService {
    private userService: UserService;
    constructor(){
        this.userService = userService;
    }

    async signup(data: any) {
        const { email, username, password } = data;
        const emailExist = await this.userService.findUserByEmail(email);

        if (emailExist) {
            throw new Error("Email đã tồn tại!");
        }

        const usernameExist = await this.userService.findUserByUsername(username);
        if (usernameExist) {
            throw new Error("Username đã tồn tại!");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await this.userService.registerBasicUser({
            ...data,
            password: hashedPassword,
        });

        eventBus.emit(EVENTS.USER_REGISTERED, newUser);

        return {
            user: newUser,
        };
    }
}