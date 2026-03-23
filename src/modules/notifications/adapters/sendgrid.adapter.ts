import sgMail from '@sendgrid/mail';
import { IEmailProvider } from '../interfaces/email.interface';

export class SendGridAdapter implements IEmailProvider {
    
    constructor() {
        const apiKey = process.env.SENDGRID_API_KEY || '';
        sgMail.setApiKey(apiKey);
    }

    async send(to: string, subject: string, body: string): Promise<void> {
        try {
            await sgMail.send({
                to: to,
                from: process.env.SENDGRID_VERIFIED_SENDER || 'admin@vocahub.com',
                subject: subject,
                text: body,
            });

            console.log(`[SendGridAdapter] Đã gửi mail thành công đến ${to}`);
        } catch (error: any) {
            throw new Error(`[SendGridAdapter] Gửi mail thất bại: ${error.message}`);
        }
    }
}