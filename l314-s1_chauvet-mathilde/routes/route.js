const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

// define the home page route
router.get("/", controller.helloworld);

module.exports = router;
