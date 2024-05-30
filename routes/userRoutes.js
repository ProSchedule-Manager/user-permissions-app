const router = require("express").Router();

const {
  createUser,
  readUser,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");

router
  .post("/", createUser)
  .get("/:id", readUser)
  .put("/:id", updateUser)
  .delete("/:id", deleteUser);

module.exports = router;
