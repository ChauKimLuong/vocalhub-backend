import { Request, Response } from 'express';
import { AuthFacade } from './auth.facade';
const authFacade = new AuthFacade();

export class AuthController{
    static loginWithEmail = async (req: Request, res: Response) => {
        try {
            // console.log(req.body);
            const { email, password } = req.body;
            const result = await authFacade.login("email", {email, password});

            res.status(200).json({
                success: true,
                data: result,
            });
        } catch (error: any) {
            res.status(404).json({
                success: false,
                message: error.message || "Có lỗi trong quá trình đăng nhập"
            });
        }
    }

    static loginWithGoogle = async (req: Request, res: Response) => {
        try {
            const { idToken } = req.body;
            const result = await authFacade.login('google', { idToken });

            res.status(200).json({
                success: true,
                data: result,
            });
        } catch (error: any) {
            res.status(404).json({
                success: false,
                message: error.message || "Có lỗi trong quá trình đăng nhập"
            });
        }
    }

    static signup = async(req: Request, res: Response) => {
        try {
            console.log(req.body);
            const result = await authFacade.signup(req.body);
            
            res.status(200).json({
                success: true,
                data: result,
            });
        } catch (error: any) {
            res.status(404).json({
                success: false,
                message: error.message || "Có lỗi trong quá trình đăng ký"
            });
        }
    }

}
