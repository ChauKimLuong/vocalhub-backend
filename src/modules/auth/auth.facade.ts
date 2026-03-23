import jwt from "jsonwebtoken";
import { IAuthStrategy } from "./strategies/auth.strategy";
import { EmailStrategy } from "./strategies/email.strategy";
import { GoogleStrategy } from "./strategies/google.strategy";
import { AuthService } from "./auth.service"
import bcrypt from "bcrypt";
import { access } from "node:fs";

export class AuthFacade {
    private authService: AuthService;
    private strategies: Record<string, IAuthStrategy>;
    constructor() {
        this.authService = new AuthService();
        this.strategies = {
            email: new EmailStrategy(),
            google: new GoogleStrategy(),
        };
    }
    async signup(data: any) {
        const user = await this.authService.signup(data);
        console.log(user);
        const accessToken = this.generateAccessToken(user);
        return {
            user,
            tokens: {
                accessToken,
            }
        }
    }

    async login(type: "email" | "google", data: any) {
        const strategy = this.strategies[type];

        const user = await strategy.authenticate(data);
        const accessToken = this.generateAccessToken(user);

        console.log(user);

        return {
            user,
            tokens: {
                accessToken,
            },
        };
    }

    private generateAccessToken(user: any) {
        const secret = process.env.JWT_SECRET;
        const expiresIn = (process.env.JWT_EXPIRES_IN || "1d") as any;

        if (!secret) {
            throw new Error("JWT_SECRET chưa được cấu hình trong file .env");
        }

        const payload = {
            id: user.id,
            email: user.email,
        };

        return jwt.sign(payload, secret, { expiresIn: expiresIn });
    }
}
