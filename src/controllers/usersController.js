import users from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController {

    static listAllUsers = (req, res) => {
        users.find()
            .exec().then((users) => {
                res.status(200).json(users)
            })
    }

    static listUsersById = (req, res) => {
        const id = req.params.id;

        users.findById(id)
            .exec()
            .then((user) => {
                res.status(200).json(user)
            })
            .catch((err) => {
                res.status(400).send({ message: `${err.message} - Id do usuário não localizado.` })
            })

    }

    static registerUser = async (req, res) => {
        const {
            name,
            email,
            password,
            confirmpassword,
            phone,
            adress,
            zipCode,
            city,
            state,
            country
        } = req.body;

        // validations
        const errors = [];
        const requiredFields = [
            { field: "name", message: "O nome é obrigatório!" },
            { field: "email", message: "O email é obrigatório!" },
            { field: "password", message: "A senha é obrigatória!" },
            { field: "phone", message: "O telefone é obrigatório!" },
            { field: "adress", message: "O endereço é obrigatório!" },
            { field: "zipCode", message: "O CEP é obrigatório!" },
            { field: "city", message: "A cidade é obrigatória!" },
            { field: "state", message: "O estado é obrigatório!" },
            { field: "country", message: "O país é obrigatório!" }
        ];

        requiredFields.forEach((field) => {
            if (!req.body[field.field]) {
                errors.push(field.message);
            }
        });

        if (password !== confirmpassword) {
            errors.push("A senha e a confirmação precisam ser iguais!");
        }

        if (errors.length > 0) {
            return res.status(422).json({ errors });
        }

        // check if user exists
        const userExists = await users.findOne({ email: email });

        if (userExists) {
            return res.status(422).json({ msg: "Por favor, utilize outro e-mail!" });
        }

        // create password
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = new users({
            name,
            email,
            password: passwordHash,
            phone,
            adress,
            zipCode,
            city,
            state,
            country
        })

        try {
            await user.save()
                .then((user) => {
                    res.status(201)
                    res.send(user.toJSON())
                })
        } catch (err) {
            return res.status(500).send({ message: `${err.message} - falha ao cadastrar usuário.` })
        }

    }

    static updateUser = (req, res) => {
        const id = req.params.id;

        users.findByIdAndUpdate(id, { $set: req.body })
            .then((user) => {
                res.status(200).send({ message: 'Usuario atualizado com sucesso' })
            })
            .catch((err) => {
                res.status(500).send({ message: err.message })
            })

    }

    static deleteUser = (req, res) => {
        const id = req.params.id;

        users.findByIdAndDelete(id)
            .then((user) => {
                res.status(200).send({ message: 'Usuario removido com sucesso' })
            })
            .catch((err) => {
                res.status(500).send({ message: err.message })
            })

    }

    static loginUser = async (req, res) => {
        const { email, password } = req.body;

        // validations
        if (!email) {
            return res.status(422).json({ msg: "O email é obrigatório!" });
        }

        if (!password) {
            return res.status(422).json({ msg: "A senha é obrigatória!" });
        }

        const user = await users.findOne({ email })

        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado!" });
        }

        // check if password match
        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(422).json({ msg: "Senha inválida" });
        }

        try {
            const secret = process.env.SECRET;

            const token = jwt.sign(
                {
                    id: user._id,
                },
                secret
            );

            res.status(200).json({ msg: "Autenticação realizada com sucesso!", token });
        } catch (error) {
            res.status(500).json({ msg: error });
        }


    }

    static checkToken = (req, res, next) => {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) return res.status(401).json({ msg: "Acesso negado!" });

        try {
            const secret = process.env.SECRET;

            jwt.verify(token, secret);

            next();
        } catch (err) {
            res.status(400).json({ msg: "O Token é inválido!" });
        }
    }

    static acessPrivateRoute = async (req, res) => {
        const id = req.params.id;

        const user = await users.findById(id, "-password");

        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado!" });
        }

        res.status(200).json({ user });
    }

    static listUsersByCity = (req, res) => {
        const city = req.query.city

        users.find({ 'city': city })
            .then((users) => {
                res.status(200).json(users)
            })
            .catch((err) => {
                res.status(500).send({ message: err.message })
            })

    }

}

export default UserController