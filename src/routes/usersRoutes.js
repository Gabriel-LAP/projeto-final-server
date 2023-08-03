import express from "express";
import UserController from '../controllers/usersController.js';

const router = express.Router();

//'http://localhost:3000/livros/busca?editora=Darkside'
router
    .get("/users/list/all", UserController.listAllUsers)
    .get("/users/search", UserController.listUsersByCity)
    .get("/users/:id", UserController.checkToken, UserController.acessPrivateRoute)
    .get("/users/list/:id", UserController.listUsersById)

    .post("/users/login", UserController.loginUser)
    .post("/users/create", UserController.registerUser)

    .put("/users/update/:id", UserController.updateUser)

    .delete("/users/delete/:id", UserController.deleteUser)

export default router;