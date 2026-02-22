// /api/test-email/route.ts
import nodemailer from "nodemailer";

export async function GET() {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: 587,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: "saadhaider349@gmail",
    subject: "SMTP Test",
    text: "Email is working 🚀",
  });

  return Response.json({ success: true });
}