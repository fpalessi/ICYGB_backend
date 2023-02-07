import jwt from "jsonwebtoken";

const jwtGenerator = (id) => {
  // dont pass sensitive info (jwt.io is public), id is perfect
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export default jwtGenerator;
