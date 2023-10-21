const bcrypt = require('bcrypt');

// Using async/await
const hashPassword = async function hashPassword(password) {
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
}

const comparePasswords = async function comparePasswords(plainTextPassword, hashedPassword) {
  try {
    const match = await bcrypt.compare(plainTextPassword, hashedPassword);
    return match;
  } catch (error) {
    throw error;
  }
}

module.exports={
    hashPassword,
    comparePasswords
}