import express from "express";
import UserController from '../controllers/usersController.js';
import ClientController from '../controllers/clientController.js';

const router = express.Router();

//'http://localhost:3000/livros/busca?editora=Darkside'
router
    .get("/users/list/all", UserController.listAllUsers)
    .get("/users/search", UserController.listUsersByCity)
    .get("/users/:id", UserController.checkToken, UserController.acessPrivateRoute)
    .get("/users/list/:id", UserController.listUsersById)
    .get("/users/list/client/all", ClientController.listAllClients)
    .get("/users/list/client/:id", ClientController.listClientById)

    .post("/users/login", UserController.loginUser)
    .post("/users/create", UserController.registerUser)
    .post("/users/create/client", ClientController.registerClient)

    .put("/users/update/:id", UserController.updateUser)
    .put("/users/update/client/:id", ClientController.updateClient)

    .delete("/users/delete/:id", UserController.deleteUser)
    .delete("/users/delete/client/:id", ClientController.deleteClient)

export default router;