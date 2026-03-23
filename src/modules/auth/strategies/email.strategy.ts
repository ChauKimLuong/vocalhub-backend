import { userService, UserService } from "../../users/user.service";
import { IAuthStrategy } from "./auth.strategy";
import bcrypt from "bcrypt"

export class EmailStrategy implements IAuthStrategy {
    async authenticate(data: any): Promise<any> {
        const { email, password } = data;
        const user = await userService.findUserByEmail(email);

        if (!user) {
            throw new Error("Email không tồn tại!");
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch){
            throw new Error("Mật khẩu không chính xác!");
        }

        return user;
    }

}