import { RegisterDto } from "src/modules/security/auth/dto/create-auth.dto"
import { JwtVerfyPayload } from "../jwt-config/jwt.secrets"
import { ConfigService } from "@nestjs/config"

export interface DeviceType {
    ip: string, agent: string
}
export const getPayloadRegisterRedisValue = (data: RegisterDto, device: DeviceType, code: number) => {
    const payload = {
        device,data
    }
    return JSON.stringify(payload)
}


export const sendVerifyButtonToEmail = (
    token: string,
    from: string,
    config: ConfigService,
): { from: string; subject: string; html: string } => {
    const PORT = config.get<number>('PORT');
    const HOST = config.get<string>('HOST');
    const url = `http://${HOST}:${PORT}/api/auth/verify/${token}`;

    const htmlString = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>Hisobingizni tasdiqlang</h2>
      <p>Assalomu alaykum! Quyidagi tugma orqali hisobingizni tasdiqlang:</p>
      <a href="${url}" 
         style="display:inline-block; padding:10px 20px; background-color:#007bff; 
                color:#fff; text-decoration:none; border-radius:5px; margin-top:10px;">
        Tasdiqlash
      </a>
    </div>
  `;
    console.log(url)
    return {
        from,
        subject: 'Email tasdiqlash',
        html: htmlString,
    };
};
