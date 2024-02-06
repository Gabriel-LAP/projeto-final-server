// import { validatePart } from '../middlewares/validatePart.js'
import partsCategory from '../models/PartsCategory.js'

class PartsCategoryController {
    static listAllPartsCategory = (req, res) => {
        partsCategory.find()
            .exec().then((part) => {
                res.status(200).json(part)
            })
    }

    static listPartCategoryById = (req, res) => {
        const id = req.params.id;

        partsCategory.findById(id)
            .exec()
            .then((part) => {
                res.status(200).json(part)
            })
            .catch((err) => {
                res.status(400).send({ message: `${err.message} - Id da categoria não localizado.` })
            })

    }

    static listpartsCategoryByName = (req, res) => {
        const name = req.query.name;

        partsCategory.findOne({ name: name })
            .exec()
            .then((category) => {
                res.status(200).json(category)
            })
            .catch((err) => {
                res.status(400).send({ message: `${err.message} - Categoria não localizada.` })
            })

    }

    static async registerPartCategory(req, res) {
        const {
            name,

        } = req.body;

        const partCategory = new partsCategory({
            name,

        });

        try {
            await partCategory.save().then((part) => {
                res.status(201);
                res.send(part.toJSON());
            });
        } catch (err) {
            return res
                .status(500)
                .send({ message: `${err.message} - falha ao cadastrar Categoria.` });
        }
    }

    static updatePartCategory = (req, res) => {
        const id = req.params.id;

        partsCategory.findByIdAndUpdate(id, { $set: req.body })
            .then((part) => {
                res.status(200)
                    .send({ message: 'Categoria atualizado com sucesso' }, part)
                    .jon(part)
            })
            .catch((err) => {
                res.status(500).send({ message: err.message })
            })

    }

    static deletePartCategory = (req, res) => {
        const id = req.params.id;

        partsCategory.findByIdAndDelete(id)
            .then((part) => {
                res.status(200).send({ message: 'Categoria removida com sucesso' })
            })
            .catch((err) => {
                res.status(500).send({ message: err.message })
            })

    }
}

export default PartsCategoryController