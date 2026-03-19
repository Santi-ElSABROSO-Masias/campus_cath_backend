import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NotificationsService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASS,
            },
        });
    }

    async sendCredentialsEmail(
        email: string,
        nombre: string,
        username: string,
        password: string,
    ): Promise<{ sent: boolean; messageId?: string }> {
        if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASS) {
            console.warn(
                `[NOTIFICATIONS] GMAIL_USER o GMAIL_APP_PASS no configurados. No se envió correo a ${email}`,
            );
            return { sent: false };
        }

        const frontendUrl =
            process.env.FRONTEND_URL ||
            'https://plataforma-catalina-campus-cath.c2awqr.easypanel.host';

        const mailOptions: nodemailer.SendMailOptions = {
            from: `"Campus CATH" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: '[Campus_CATH] Credenciales de Acceso',
            html: `
                <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #4F46E5;">Bienvenido a Campus CATH</h2>
                    <p>Hola <strong>${nombre}</strong>,</p>
                    <p>Has sido registrado en la plataforma para realizar la Inducción de Trabajos Temporales.</p>
                    <p>Para iniciar, ingresa al siguiente enlace con tus credenciales:</p>
                    <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; margin: 20px 0;">
                        <p style="margin: 0 0 10px 0;"><strong>Enlace:</strong> <a href="${frontendUrl}/login">${frontendUrl}/login</a></p>
                        <p style="margin: 0 0 10px 0;"><strong>Usuario:</strong> ${username}</p>
                        <p style="margin: 0;"><strong>Contraseña temporal:</strong> ${password}</p>
                    </div>
                    <p style="font-size: 12px; color: #64748b;">Este es un mensaje automático, por favor no lo respondas.</p>
                </div>
            `,
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log(
                `[NOTIFICATIONS] Correo enviado a ${email} (MessageId: ${info.messageId})`,
            );
            return { sent: true, messageId: info.messageId };
        } catch (error) {
            console.error(`[NOTIFICATIONS] Error enviando correo a ${email}:`, error);
            return { sent: false };
        }
    }
}
