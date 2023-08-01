import express from "express";
import UserController from '../controllers/usersController.js';

const router = express.Router();

//'http://localhost:3000/livros/busca?editora=Darkside'
router
    .get("/users", UserController.listAllUsers)
    .get("/users/search", UserController.listUsersByCity)
    .get("/users/:id", UserController.checkToken, UserController.acessPrivateRoute)
    .get("/users/:id", UserController.listUsersById)
    .post("/users/login", UserController.loginUser)
    .post("/users", UserController.registerUser)
    .put("/users/:id", UserController.updateUser)
    .delete("/users/:id", UserController.deleteUser)

export default router;