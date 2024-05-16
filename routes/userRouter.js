const express = require("express");
const authController = require("../controller/authController");

const router = express.Router();

router.get("/users", authController.GetUsers);
router.get("/users/:id", authController.GetUserById);
router.post("/users", authController.AddUser);
router.delete("/users/:id", authController.DeleteUser);
router.put("/users/:id", authController.UpdateUser);
router.post("/user/login", authController.UpdateUser);

module.exports = router;
