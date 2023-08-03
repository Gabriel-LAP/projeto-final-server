import clients from '../models/Client.js'
import { validateClient } from '../middlewares/validateClient.js'

class ClientController {
    static listAllClients = (req, res) => {
        clients.find()
            .exec().then((clients) => {
                res.status(200).json(clients)
            })
    }

    static listClientById = (req, res) => {
        const id = req.params.id;

        clients.findById(id)
            .exec()
            .then((client) => {
                res.status(200).json(client)
            })
            .catch((err) => {
                res.status(400).send({ message: `${err.message} - Id do Cliente não localizado.` })
            })

    }

    static listClientByCpf = (req, res) => {
        const cpf = req.body.cpf;

        clients.find({ cpf: cpf })
            .exec()
            .then((client) => {
                res.status(200).json(client)
            })
            .catch((err) => {
                res.status(400).send({ message: `${err.message} - CPF do Cliente não localizado.` })
            })

    }

    static async registerClient(req, res) {
        const {
            name,
            email,
            cpf,
            phone,
            type = 'cliente'
        } = req.body;

        const validationErrors = validateClient(req.body);
        if (validationErrors.length > 0) {
            return res.status(422).json({ errors: validationErrors });
        }

        // check if user exists
        const clientExists = await clients.findOne({ cpf: cpf });
        if (clientExists) {
            return res
                .status(422)
                .json({ msg: "Cliente já cadastrado!" });
        }

        const client = new clients({
            name,
            email,
            cpf,
            phone,
            type,
        });

        try {
            await client.save().then((client) => {
                res.status(201);
                res.send(client.toJSON());
            });
        } catch (err) {
            return res
                .status(500)
                .send({ message: `${err.message} - falha ao cadastrar cliente.` });
        }
    }

    static updateClient = (req, res) => {
        const id = req.params.id;

        clients.findByIdAndUpdate(id, { $set: req.body })
            .then((client) => {
                res.status(200).send({ message: 'Cliente atualizado com sucesso' })
            })
            .catch((err) => {
                res.status(500).send({ message: err.message })
            })

    }

    static deleteClient = (req, res) => {
        const id = req.params.id;

        clients.findByIdAndDelete(id)
            .then((client) => {
                res.status(200).send({ message: 'Cliente removido com sucesso' })
            })
            .catch((err) => {
                res.status(500).send({ message: err.message })
            })

    }
}

export default ClientController