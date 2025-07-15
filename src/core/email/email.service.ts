// src/email/email.service.ts

import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { emailModuleOptions } from 'src/common/config/email-config/email.secrets';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, 
      auth: {
        user: 'fayzillofn30@gmail.com',
        pass: "hyckmqyvhapjilcc",
      },
    });
  }

  async sendMail(to: string, subject: string, html: string) {
    console.log(emailModuleOptions)
    const info = await this.transporter.sendMail({
      from: '"My App" <noreply@myapp.com>',
      to,
      subject,
      html,
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
}
