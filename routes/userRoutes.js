const router = require("express").Router();

const {
  createUser,
  readUser,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");

router
  .post("/", createUser)
  .get("/api/v1/user/:id", readUser)
  .put("/", updateUser)
  .delete("/:id", deleteUser);

module.exports = router;
