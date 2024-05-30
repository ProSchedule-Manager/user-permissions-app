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
    res.status(500).json({ message: "Internal server error" });
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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

app.put('/users/:id', async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedUser = await User.findByPk(req.params.id);
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

exports.deleteUser = (req, res) => {
  const deletedUser = database.User.destroy({
    where: { id: req.params.id },
  });
  res.send("Usuário deletado com sucesso");
};
