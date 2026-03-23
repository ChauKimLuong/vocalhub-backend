import { UserService } from "./user.service";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
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

    // Dành cho User tự xem thông tin của mình (sau khi ghép với Middleware Auth)
    public getProfile = async (req: Request, res: Response) => {
        // ... logic lấy profile dựa vào ID lấy từ token
    };

    // Dành cho việc cập nhật avatar, username...
    public updateProfile = async (req: Request, res: Response) => {
        // ... logic update
    };
}
