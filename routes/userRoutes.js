const router = require("express").Router();

const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");

router
  .post("/", createUser)
  .get("/:id", getUser)
  .put("/", updateUser)
  .delete("/:id", deleteUser);

module.exports = router;
