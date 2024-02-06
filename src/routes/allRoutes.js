import express from "express";
import UserController from '../controllers/usersController.js';
import ClientController from '../controllers/ClientController.js';
import OrderController from '../controllers/ordersController.js';
import PartsController from '../controllers/partsController.js';
import PartsCategoryController from '../controllers/partsCategotyController.js';

const router = express.Router();

//'http://localhost:3000/livros/busca?editora=Darkside'

/** colocar a requisição get by id por ultimo se não quando for fazer uma requisição 
 * por nome ou outra parecida vai ser priorizada por id */
router
    .get("/users/list/all", UserController.checkToken, UserController.listAllUsers)
    .get("/users/city", UserController.checkToken, UserController.listUsersByCity)
    .get("/users/list/name", UserController.checkToken, UserController.listUserByName)
    .get("/users/:id", UserController.checkToken, UserController.acessPrivateRoute)
    .get("/users/list/:id", UserController.checkToken, UserController.listUsersById)

    .get("/users/list/client/all", UserController.checkToken, ClientController.listAllClients)
    .get("/users/list/client/cpf", UserController.checkToken, ClientController.listClientByCpf)
    .get("/users/list/client/name", UserController.checkToken, ClientController.listClientByName)
    .get("/users/list/client/:id", UserController.checkToken, ClientController.listClientById)

    .get("/orders/list/all", UserController.checkToken, OrderController.listAllOrders)
    .get("/orders/list/name", UserController.checkToken, OrderController.listOrderByName)
    .get("/orders/list/status", UserController.checkToken, OrderController.listOrderByStatus)
    .get("/orders/list/:id", UserController.checkToken, OrderController.listOrderById)

    .get("/parts/list/all", UserController.checkToken, PartsController.listAllParts)
    .get("/parts/list/name", UserController.checkToken, PartsController.listPartsByName)
    .get("/parts/list/category/:id", UserController.checkToken, PartsController.listPartsByCategory)
    .get("/parts/list/:id", UserController.checkToken, PartsController.listPartById)

    .get("/parts/category/all", UserController.checkToken, PartsCategoryController.listAllPartsCategory)
    .get("/parts/category/name", UserController.checkToken, PartsCategoryController.listpartsCategoryByName)
    .get("/parts/category/:id", UserController.checkToken, PartsCategoryController.listPartCategoryById)

    .post("/users/login", UserController.loginUser)

    .post("/users/create", UserController.checkToken, UserController.registerUser)
    .post("/users/create/client", UserController.checkToken, ClientController.registerClient)

    .post("/orders/create", OrderController.registerOrder)

    .post("/parts/create", PartsController.registerPart)

    .post("/parts/category/create", PartsCategoryController.registerPartCategory)


    .put("/users/update/:id", UserController.updateUser)

    .put("/orders/update/:id", UserController.checkToken, OrderController.updateOrder)

    .put("/clients/update/:id", UserController.checkToken, ClientController.updateClient)

    .put("/parts/update/:id", UserController.checkToken, PartsController.updatePart)

    .put("/parts/category/update/:id", UserController.checkToken, PartsCategoryController.updatePartCategory)


    .delete("/users/delete/:id", UserController.checkToken, UserController.deleteUser)

    .delete("/users/delete/client/:id", UserController.checkToken, ClientController.deleteClient)

    .delete("/orders/delete/:id", UserController.checkToken, OrderController.deleteOrder)

    .delete("/parts/delete/:id", UserController.checkToken, PartsController.deletePart)

    .delete("/parts/category/delete/:id", UserController.checkToken, PartsCategoryController.deletePartCategory)

export default router;