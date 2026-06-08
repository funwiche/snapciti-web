import africastalking from "africastalking";
export default defineEventHandler(async (event) => {
  try {
    const orange = {
      client_id: "xgOw8vBbbKFd8A7lwT1winkTtimU0etj",
      client_secret: "s70x1Ds3XSaYSPBqi06YM1lsnkRiYZCIgSUrIQK0QoaZ",
      authorization_header:
        "Basic eGdPdzh2QmJiS0ZkOEE3bHdUMXdpbmtUdGltVTBldGo6czcweDFEczNYU2FZU1BCcWkwNllNMWxzbmtSaVlaQ0lnU1VySVFLMFFvYVo=",
    };
    const credentials = {
      apiKey:
        "atsk_dddcf2e514e1f973107a881ff140d2909d84a854185fd08c473a77a8288618bf7e391c6f",
      username: "camersms",
    };
    const AfricasTalking = africastalking(credentials);
    // Get the SMS service
    const sms = AfricasTalking.SMS;

    return await sms.send({
      // Set the numbers you want to send to in international format
      to: ["+254711XXXYYY", "+254733YYYZZZ"],
      // Set your message
      message:
        "I'm a lumberjack and its ok, I sleep all night and I work all day",
      // Set your shortCode or senderId
      from: "XXYYZZ",
    });
  } catch (error) {}
});
