import User from "../models/User.js";

async function getUsers(req, res) {
  const users = await User.find({});

  res.status(200)
  res.json(users);
}

export { getUsers };
