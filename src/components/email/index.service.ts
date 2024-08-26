import nodemailer from "nodemailer";

import { EmailOptions } from "./index.interface";
import { EmailSendingFailedError } from "./index.errors";

export default class EmailService {
  private static transporter: nodemailer.Transporter;

  // Static method to initialize the transporter if not already initialized
  private static initializeTransporter() {
    console.log(process.env.EMAIL_USER);
    console.log(process.env.EMAIL_PASS);
    if (!EmailService.transporter) {
      EmailService.transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    }
  }

  public static async sendEmail(options: EmailOptions) {
    // Ensure the transporter is initialized before sending an email
    EmailService.initializeTransporter();

    try {
      await EmailService.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: options.to,
        subject: options.subject,
        html: options.text,
      });
    } catch (error) {
      console.error("Error sending email:", error);
      throw new EmailSendingFailedError();
    } finally {
      console.log(`Email sent to ${options.to}`);
    }
  }

  public async sendPasswordResetLink(email: string, resetToken: string) {
    const subject = "Password Reset Request";
    const text = `You requested a password reset. Click the following link to reset your password: ${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

    await EmailService.sendEmail({ to: email, subject, text });
  }
}
