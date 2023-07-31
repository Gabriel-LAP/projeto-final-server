import users from "../models/users.js";

class UserController {

    static listAllUsers = (req, res) => {
        users.find()
            .exec((err, users) => {
                res.status(200).json(livros)
            })
    }

    static listUsersById = (req, res) => {
        const id = req.params.id;

        users.findById(id)
            .exec((err, users) => {
                if (err) {
                    res.status(400).send({ message: `${err.message} - Id do usuário não localizado.` })
                } else {
                    res.status(200).send(users);
                }
            })
    }

    static registerUser = (req, res) => {
        let user = new users(req.body);

        user.save((err) => {

            if (err) {
                res.status(500).send({ message: `${err.message} - falha ao cadastrar usuário.` })
            } else {
                res.status(201).send(livro.toJSON())
            }
        })
    }

    static updateUser = (req, res) => {
        const id = req.params.id;

        users.findByIdAndUpdate(id, { $set: req.body }, (err) => {
            if (!err) {
                res.status(200).send({ message: 'Usuário atualizado com sucesso' })
            } else {
                res.status(500).send({ message: err.message })
            }
        })
    }

    static deleteUser = (req, res) => {
        const id = req.params.id;

        users.findByIdAndDelete(id, (err) => {
            if (!err) {
                res.status(200).send({ message: 'Usuário removido com sucesso' })
            } else {
                res.status(500).send({ message: err.message })
            }
        })
    }

    static listUsersByCity = (req, res) => {
        const city = req.query.city

        users.find({ 'city': city }, {}, (err, users) => {
            res.status(200).send(users);

        })
    }

}

export default UserController