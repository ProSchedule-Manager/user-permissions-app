const database = require("../models/User");

exports.createUser = async (req, res) => {
  try {
    console.log("Create user");

    // Verificando se o email já está vinculado a um usuário
    const existingUser = await database.User.findOne({
      where : { email: req.body.email }
    });

    // Checks if the email is already in use
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use"});
    }

    // Validate required fields
    if (!req.body.email || !req.body.password || !req.body.permission) {
      return res.status(400).json({ message: "Missing required fields: email, password, or permission" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Create the new user
    const newUser = await database.User.create({
      email: req.body.email,
      password: req.body.password,
      permission: req.body.permission,
    });

    res.status(201).json(newUser);
    
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: error});
  }
};

exports.readUser = async (req, res) => {
  try {
    console.log("user id", req.params.id);

    const user = await database.User.findOne({
      where: { id: req.params.id },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const { email, password, permission } = req.body;
  const updatedUser = await database.User.update(
    {
      ...(email && { email }),
      ...(password && { password }),
      ...(permission && { permission }),
    },
    { where: { id } }
  );
  res.send("User data updated");
};

exports.deleteUser = (req, res) => {
  const deletedUser = database.User.destroy({
    where: { id: req.params.id },
  });
  res.send("User deleted with success");
};
