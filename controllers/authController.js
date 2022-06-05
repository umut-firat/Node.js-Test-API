import User from "../models/User.js";
import { generateToken } from "../utils/token.js";

async function signIn(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(200)
    return res.json({
      token: generateToken(user._id),
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        surname: user.surname,
        isAdmin: user.isAdmin,
      },
    });
  } else {
    res.status(401);
    return res.json({ msg: "Invalid email or password" });
  }
}

async function signUp(req, res) {
  const { email, password, name, surname } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    return res.json({
      msg: "User already exists.",
    });
  }

  const user = new User.create({ email, password, name, surname });

  if (!user) {
    res.status(400);
    return res.json({
      msg: "Invalid user data",
    });
  }

  res.status(201);
  return res.json({
    token: generateToken(user._id),
    user: {
      _id: user._id,
      email: user.email,
      name: user.name,
      surname: user.surname,
      isAdmin: user.isAdmin,
    },
  });
}

export { signIn, signUp };
