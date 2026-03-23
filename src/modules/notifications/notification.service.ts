export class NotificationService {
    static async sendWelcomeEmail(email: string, username: string){
        // email để sau này dùng nodemailder
        console.log(`[NotificationService] => Chào mừng ${username} đến với VocalHub`);

        await new Promise(resolve => setTimeout(resolve, 500));
        
        console.log(`[NotificationService] => Đã gửi thông báo chào mừng đến ${username}.`);
    }
}