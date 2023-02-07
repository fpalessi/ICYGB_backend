import generateId from "../helpers/ID.js";
import jwtGenerator from "../helpers/JWT.js";
import User from "../models/User.js";

const register = async (req, res) => {
  const { email } = req.body;
  const checkUserExistence = await User.findOne({ email });
  if (checkUserExistence) {
    const error = new Error(
      `Ya existe un usuario registrado con este mismo correo -> ${email}`
    );
    return res.status(400).json({ msg: error.message });
  }
  try {
    const user = new User(req.body);
    user.token = generateId();
    await user.save();
    res.json({
      msg: `Usuario creado correctamente con los siguientes datos: ${user}`,
    });
  } catch (error) {
    console.log(error);
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error(
      `No existe ningún usuario con el correo que has introducido (${email})`
    );
    return res.status(404).json({ msg: error.message });
  }
  if (!user.confirmed) {
    const error = new Error("Tu cuenta no ha sido registrada");
    return res.status(403).json({ msg: error.message });
  }
  if (await user.checkPass(password)) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: jwtGenerator(user._id),
    });
  } else {
    const error = new Error("La contraseña introducida no es correcta");
    return res.status(403).json({ msg: error.message });
  }
};
const profile = async (req, res) => {
  const { user } = req;

  res.json(user);
};

export { register, login, profile };
