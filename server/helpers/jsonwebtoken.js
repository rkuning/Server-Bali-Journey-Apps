const jwt = require("jsonwebtoken");
const secretCode = process.env.SECRET_CODE;

const tokenGenerator = (data) => {
  const { id, name, email, phone, status } = data;
  return jwt.sign({ id, name, email, phone, status }, secretCode);
};

const tokenVerify = (data) => {
  return jwt.verify(data, secretCode);
};

module.exports = { tokenGenerator, tokenVerify };
