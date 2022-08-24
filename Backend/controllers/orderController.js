const Orders = require('../models/orders');

exports.newOrder = async (req, res, next) => {
    const order = new Orders(req.body);
    try {
        await order.save();
        res.json({ message: 'Se agregó un nuevo pedido' });
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.showOrders = async (req, res, next) => {
    try {
        const orders = await Orders.find({}).populate('customer').populate({
            path: 'order.product',
            model: 'Products'
        });

        res.json(orders);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.showOrder = async (req, res, next) => {
    const { idOrder } = req.params;

    const order = await Orders.findById(idOrder).populate('customer').populate({
        path: 'order.product',
        model: 'Products'
    });

    if (!order) {
        res.json({ message: 'Ese pedido no existe' });
        return next();
    }

    res.json(order);
}

exports.updateOrder = async (req, res, next) => {
    const { idOrder } = req.params;

    try {
        let order = await Orders.findOneAndUpdate({ _id: idOrder }, req.body, { new: true }).populate('customer').populate({
            path: 'order.product',
            model: 'Products'
        });

        res.json(order);

    } catch (error) {
        console.log(error);
        next();
    }
}

exports.deleteOrder = async (req, res, next) => {
    const { idOrder } = req.params;
    try {
        await Orders.findOneAndDelete({ _id: idOrder });
        res.json({ message: 'El pedido se ha eliminado' });
    } catch (error) {
        console.log(error);
        next();
    }
}