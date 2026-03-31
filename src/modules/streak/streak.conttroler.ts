import { Request, Response } from "express";
import { StreakService } from "./streak.service";
import { StreakRepository } from "./streak.repository";

const streakRepository = new StreakRepository();
const streakService = new StreakService(streakRepository);

export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        // .....
    }
}

export class StreakController {
    static async handleCompleteStudy(req: AuthRequest, res: Response) {
        try {
            const userId = req.user?.id; 

            if (!userId) {
                return res.status(401).json({ message: "Không tìm thấy thông tin user!" });
            }

            const updatedStreak = await streakService.updateStreak(userId);
            
            return res.status(200).json({
                success: true,
                message: "Cập nhật chuỗi học thành công!",
                data: {
                    streakCount: updatedStreak.streakCount,
                    state: updatedStreak.currentState
                }
            });
        } catch (error) {
            return res.status(500).json({ success: false, message: "Lỗi Server" });
        }
    }
}