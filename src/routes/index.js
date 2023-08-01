import express from "express";
import users from "./usersRoutes.js";


/** Essa função é responsável por configurar as rotas do 
 * aplicativo Express. */
const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({ titulo: "Projeto Final" })
    })

    app.use(
        express.json(),
        users


    )
}

export default routes