import nodemailer from "nodemailer";
import OTP from "~/server/models/OTP";
import User from "~/server/models/User";

export default defineEventHandler(async (event) => {
  const { email } = await readBody(event);
  const { mailer } = useRuntimeConfig();
  const { name } = useAppConfig();
  const otp = $f.randomNumber(100000, 999999).toString();
  try {
    const user = User.findOne({ email });
    if (!user)
      throw createError({ statusCode: 404, message: "Email not found" });

    await nodemailer.createTransport(mailer).sendMail({
      from: `"${name}" <${mailer.auth.user}>`,
      to: email,
      subject: `${otp} - One time password`,
      html: `<h2>${otp}</h2>`,
    });
    await new OTP({
      identifier: email,
      purpose: "reset-password",
      userAgent: getHeader(event, "user-agent"),
      ipAddress: getRequestIP(event),
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 mins
      code: $crypto.generateHash(otp),
    }).save();
    return { success: true, otp };
  } catch (error) {
    returnError(error);
  }
});
