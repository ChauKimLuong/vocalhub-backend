import { OAuth2Client } from 'google-auth-library';
import { IAuthStrategy } from './auth.strategy';
// import { UserService } from '../../modules/user/user.service';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export class GoogleStrategy implements IAuthStrategy {
    async authenticate(credentials: { idToken: string }) {
        const { idToken } = credentials;

        if (!idToken) {
            throw new Error('Thiếu Google ID Token');
        }

        try {
            // 1. Verify token với Google
            const ticket = await client.verifyIdToken({
                idToken: idToken,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();

            if (!payload || !payload.email) {
                throw new Error('Token không hợp lệ hoặc không có email');
            }

            // 2. Kiểm tra DB
            // let user = await UserService.findByEmail(payload.email);
            let user: any = null; // CHÚ Ý: Thay bằng logic DB thực tế
            
            // 3. Nếu chưa có thì tự động đăng ký
            if (!user) {
                // user = await UserService.create({...});
            }

            return user;
        } catch (error: any) {
            // Log lỗi gốc ra console để em dễ debug
            console.error('Google Auth Error:', error.message);
            throw new Error('Xác thực Google thất bại');
        }
    }
}