const router = require("express").Router();
const api_v1 = require("./api_v1");

router.use("/v1", api_v1);
module.exports = router;
