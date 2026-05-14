export const capz = (input: any) => {
  if (typeof input != "string") return input;
  return input[0] ? input[0].toUpperCase() + input.slice(1) : "";
};
