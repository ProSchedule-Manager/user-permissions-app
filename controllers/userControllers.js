const database = require("../models/User");

exports.createUser = async (req, res) => {
  console.log("Create user");
  const submitedUser = await database.User.create({
    email: req.body.email,
    password: req.body.password,
    permission: req.body.permission,
  });
  res.send(submitedUser);
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
  res.send("Dados de usuário atualizados");
};

exports.deleteUser = (req, res) => {
  const deletedUser = database.User.destroy({
    where: { id: req.params.id },
  });
  res.send("Usuário deletado com sucesso");
};
