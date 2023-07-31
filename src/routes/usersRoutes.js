import express from "express";
import UserController from '../controllers/usersController.js';

const router = express.Router();


router
    .get("/users", UserController.listAllUsers)
    .get("/users/search", UserController.listUsersByCity)
    .get("/users/:id", UserController.listUsersById)
    .post("/users", UserController.registerUser)
    .put("/users/:id", UserController.updateUser)
    .delete("/users/:id", UserController.deleteUser)

export default router;