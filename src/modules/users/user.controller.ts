import { UserService } from "./user.service";
import { Request, Response } from "express";

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public getAll = async (req: Request, res: Response) => {
        try {
            const data = await this.userService.getAll();

            res.status(200).json({ success: true, count: data.length, data });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    };

    public register = async (req: Request, res: Response) => {
        try {
            const { email, username } = req.body;

            const emailExist = await this.userService.findUserByEmail(email);
            if (emailExist) {
                return res.status(400).json({
                    success: false,
                    message: "Email already exists",
                });
            }

            const usernameExist =
                await this.userService.findUserByUsername(username);
            if (usernameExist) {
                return res.status(400).json({
                    success: false,
                    message: "Username already exists",
                });
            }

            const user = await this.userService.registerBasicUser(req.body);

            return res.status(201).json({
                success: true,
                user,
            });
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    };
}
