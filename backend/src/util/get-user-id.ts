export const getUserId = (req: any) => {
  if (!req.user) {
    throw new Error("User not found in request");
  }
  return req.user.id;
};
