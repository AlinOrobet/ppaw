import nodemailer from "nodemailer";

const domain = process.env.NEXT_PUBLIC_APP_URL;
const email = process.env.NEXT_PUBLIC_EMAIL;
const pass = process.env.NEXT_PUBLIC_EMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: pass,
  },
});

const mailOptions = {
  from: email,
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await transporter.sendMail({
    ...mailOptions,
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await transporter.sendMail({
    ...mailOptions,
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await transporter.sendMail({
    ...mailOptions,
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};
