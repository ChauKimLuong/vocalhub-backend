import nodemailer, { Transporter } from 'nodemailer';
import { IEmailProvider } from '../interfaces/email.interface';

export class NodemailerAdapter implements IEmailProvider {
    private transporter: Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
    }

    async send(to: string, subject: string, body: string): Promise<void> {
        try {
            await this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to: to,
                subject: subject,
                text: body
            });
        } catch (error: any) {
            throw new Error(`[NodemailerAdapter] Gửi mail thất bại: ${error.message}`);
        }
    }
}