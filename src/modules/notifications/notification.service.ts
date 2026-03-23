import { NodemailerAdapter } from "./adapters/nodemailer.adapter";
import { IEmailProvider } from "./interfaces/email.interface";

export class NotificationService {
    private emailProvider: IEmailProvider;
    constructor(){
        this.emailProvider = new NodemailerAdapter();
    }

    static async sendWelcomeEmail(email: string, username: string){
        console.log(`[NotificationService] => Chào mừng ${username} đến với VocalHub`);

        await new Promise(resolve => setTimeout(resolve, 500));
        
        console.log(`[NotificationService] => Đã gửi thông báo chào mừng đến ${username}.`);
    }


    async sendWelcomeEmail2(email: string, username: string): Promise<void> {
        const subject = 'Chào mừng đến với VocaHub!';
        const body = `Chào ${username},\n\nChúc mừng bạn đã đăng ký tài khoản thành công. Hãy bắt đầu học từ vựng cùng thuật toán SM-2 ngay thôi!`;

        await this.emailProvider.send(email, subject, body);
    }
}