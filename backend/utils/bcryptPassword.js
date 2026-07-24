import bcrypt from "bcrypt";
const bcryptPasswordUtils = async (password) => {
  let bcryptedPassword = await bcrypt.hash(password, 10);
  return bcryptedPassword;
};
export default bcryptPasswordUtils;
