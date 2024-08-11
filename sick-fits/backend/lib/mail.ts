import * as nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const makeANiceEmail = (text: string): string =>
  `
    <div className="resetEmail" style="
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2;
      font-size: 20px;
    ">
      <h2>Hello There!</h2>
      <p>${text}</p>

      <p>😘, James F. Thomas</p>
    </div>
    `;

export interface MailResponse {
  accepted?: string[] | null;
  rejected?: string[] | null;
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: { from: string; to?: string[] | null };
  messageId: string;
}

export interface Envelope {
  from: string;
  to?: string[] | null;
}

export const sendPasswordResetEmail = async (
  resetToken: string,
  to: string
): Promise<void> => {
  // email the user a token
  const info = await transport.sendMail({
    to,
    from: 'jft@PDProject.com',
    subject: 'Your password reset token!',
    html: makeANiceEmail(`Your Password Reset Token is here!
    <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click Here to Reset</a>
    `),
  });

  // create helper function that renders link to view email in browser
  if (process.env.MAIL_USER.includes('ethereal.email')) {
    const url = nodemailer.getTestMessageUrl(info);
    console.log(`💌 Message Sent! Preview it at ${url as string}`);
  }
};
