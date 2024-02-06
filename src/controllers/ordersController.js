import Orders from '../models/Order.js'
import { validateOrder } from '../middlewares/validateOrder.js'
import orders from '../models/Order.js'

class OrderController {
    static listAllOrders = (req, res) => {
        Orders.find()
            .populate('owner', 'name')
            .exec().then((order) => {
                res.status(200).json(order)
            })
    }

    static listOrderById = (req, res) => {
        const id = req.params.id;

        Orders.findById(id)
            .populate('owner', 'name')
            .exec()
            .then((order) => {
                res.status(200).json(order)
            })
            .catch((err) => {
                res.status(400).send({ message: `${err.message} - Id da ordem não localizado.` })
            })

    }

    static listOrderByName = (req, res) => {
        const name = req.req.name;

        orders.find({ 'name': name })
            .exec()
            .then((client) => {
                res.status(200).json(client)
            })
            .catch((err) => {
                res.status(400).send({ message: `${err.message} - Nome do serviço não localizado.` })
            })
    }

    static listOrderByStatus = (req, res) => {
        const status = req.body.status;

        Orders.find({ status: status })
            .populate('owner', 'name')
            .exec()
            .then((order) => {
                res.status(200).json(order)
            })
            .catch((err) => {
                res.status(400).send({ message: `${err.message} - Ordem não localizada.` })
            })

    }

    static async registerOrder(req, res) {
        const {
            brand,
            device,
            owner,
            faulty,
            parts,
            price,
            statusOrder,
            creationDate,
            estimatedDate,
            completionDate,
            guarantee,
            usedPart,

        } = req.body;

        const validationErrors = validateOrder(req.body);
        if (validationErrors.length > 0) {
            return res.status(422).json({ errors: validationErrors });
        }

        const order = new Orders({
            brand,
            device,
            owner,
            faulty,
            parts,
            price,
            statusOrder,
            creationDate,
            estimatedDate,
            completionDate,
            guarantee,
            usedPart,
        });

        try {
            await order.save().then((order) => {
                res.status(201);
                res.send(order.toJSON());
            });
        } catch (err) {
            return res
                .status(500)
                .send({ message: `${err.message} - falha ao cadastrar ordem.` });
        }
    }

    static updateOrder = (req, res) => {
        const id = req.params.id;

        Orders.findByIdAndUpdate(id, { $set: req.body })
            .then((order) => {
                res.status(200).send({ message: 'Ordem atualizado com sucesso', order })
            })
            .catch((err) => {
                res.status(500).send({ message: err.message })
            })

    }

    static deleteOrder = (req, res) => {
        const id = req.params.id;

        Orders.findByIdAndDelete(id)
            .then((order) => {
                res.status(200).send({ message: 'Ordem removida com sucesso' })
            })
            .catch((err) => {
                res.status(500).send({ message: err.message })
            })

    }
}

export default OrderController