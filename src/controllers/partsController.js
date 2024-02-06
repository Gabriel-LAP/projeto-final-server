import { validatePart } from '../middlewares/validatePart.js'
import Parts from '../models/Parts.js'

class PartsController {
    static listAllParts = (req, res) => {
        Parts.find()
            .exec().then((part) => {
                res.status(200).json(part)
            })
    }

    static listPartById = (req, res) => {
        const id = req.params.id;

        Parts.findById(id)
            .exec()
            .then((part) => {
                res.status(200).json(part)
            })
            .catch((err) => {
                res.status(400).send({ message: `${err.message} - Id da peça não localizado.` })
            })

    }

    static listPartsByName = (req, res) => {
        const name = req.query.name;

        Parts.find({ 'name': name })
            .exec()
            .then((part) => {
                res.status(200).json(part)
            })
            .catch((err) => {
                res.status(400).send({ message: `${err.message} - Peça não localizada.` })
            })

    }

    static listPartsByCategory = (req, res) => {
        const categoryId = req.params.id;

        Parts.find({ 'category': categoryId })
            .exec()
            .then((category) => {
                res.status(200).json(category)
            })
            .catch((err) => {
                res.status(400).send({ message: `${err.message} - Categoria não localizada.` })
            })

    }


    static async registerPart(req, res) {
        const {
            name,
            purchasePrice,
            quantity,
            brand,
            category,
            updatedAt
        } = req.body;

        const validationErrors = validatePart(req.body);
        if (validationErrors.length > 0) {
            return res.status(422).json({ errors: validationErrors });
        }

        const part = new Parts({
            name,
            purchasePrice,
            quantity,
            brand,
            category,
            updatedAt
        });

        try {
            await part.save().then((part) => {
                res.status(201);
                res.send(part.toJSON());
            });
        } catch (err) {
            return res
                .status(500)
                .send({ message: `${err.message} - falha ao cadastrar peça.` });
        }
    }

    static updatePart = (req, res) => {
        const id = req.params.id;

        Parts.findByIdAndUpdate(id, { $set: req.body })
            .then((part) => {
                res.status(200)
                    .send({ message: 'Peça atualizado com sucesso', part })
                    .jon(part)
            })
            .catch((err) => {
                res.status(500).send({ message: err.message })
            })

    }

    static deletePart = (req, res) => {
        const id = req.params.id;

        Parts.findByIdAndDelete(id)
            .then((part) => {
                res.status(200).send({ message: 'Peça removida com sucesso' })
            })
            .catch((err) => {
                res.status(500).send({ message: err.message })
            })

    }
}

export default PartsController