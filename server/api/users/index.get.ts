export default defineEventHandler(async (event) => {
  try {
    return event.context.user;
  } catch (error) {
    returnError(error);
  }
});
