import OTP from "~/server/models/OTP";

export default defineEventHandler(async (event) => {
  const { email, otp } = await readBody(event);
  try {
    const record = await OTP.findOne({
      identifier: email,
      purpose: "reset-password",
      verifiedAt: null,
    });
    if (!record) throw new Error("OTP not found");
    if (record.expiresAt < new Date()) throw new Error("OTP expired");
    if (record.attempts >= 5) throw new Error("Too many attempts");

    record.attempts += 1;
    if (record.code != $crypto.generateHash(otp)) {
      await record.save();
      throw createError({ statusCode: 400, message: "Invalid OTP" });
    }
    record.verifiedAt = new Date();
    record.save();
    return { success: true };
  } catch (error) {
    returnError(error);
  }
});
