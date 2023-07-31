import express from "express";


/** Essa função é responsável por configurar as rotas do 
 * aplicativo Express. */
const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({ titulo: "Projeto Final" })
    })

    app.use(
        express.json()


    )
}

export default routes