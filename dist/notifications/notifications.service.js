"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = __importStar(require("nodemailer"));
let NotificationsService = class NotificationsService {
    transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASS,
            },
        });
    }
    async sendCredentialsEmail(email, nombre, username, password) {
        if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASS) {
            console.warn(`[NOTIFICATIONS] GMAIL_USER o GMAIL_APP_PASS no configurados. No se envió correo a ${email}`);
            return { sent: false };
        }
        const frontendUrl = process.env.FRONTEND_URL ||
            'https://plataforma-catalina-campus-cath.c2awqr.easypanel.host';
        const mailOptions = {
            from: `"Catalina Huanca - Inducciones Temporales" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: '[Catalina Huanca] Credenciales de Acceso — Inducción Temporal',
            html: `
                <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #4F46E5;">Bienvenido al Sistema de Inducciones Temporales de Catalina Huanca</h2>
                    <p>Hola <strong>${nombre}</strong>,</p>
                    <p>Has sido registrado en la plataforma para realizar la Inducción de Trabajos Temporales.</p>
                    <p>Para iniciar, ingresa al siguiente enlace con tus credenciales:</p>
                    <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; margin: 20px 0;">
                        <p style="margin: 0 0 10px 0;"><strong>Enlace:</strong> <a href="${frontendUrl}/induccion">${frontendUrl}/induccion</a></p>
                        <p style="margin: 0 0 10px 0;"><strong>Usuario:</strong> ${username}</p>
                        <p style="margin: 0;"><strong>Contraseña temporal:</strong> ${password}</p>
                    </div>
                    <p style="font-size: 12px; color: #64748b;">Este es un mensaje automático, por favor no lo respondas.</p>
                </div>
            `,
        };
        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log(`[NOTIFICATIONS] Correo enviado a ${email} (MessageId: ${info.messageId})`);
            return { sent: true, messageId: info.messageId };
        }
        catch (error) {
            console.error(`[NOTIFICATIONS] Error enviando correo a ${email}:`, error);
            return { sent: false };
        }
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map