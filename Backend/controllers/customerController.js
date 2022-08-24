const Customers = require('../models/customers')

exports.newCustomer = async (req,res, next) => {
    const customer = new Customers(req.body)

    try {
        await customer.save();
        res.json({message: "Se agrego un nuevo cliente"})
    } catch (error) {
        res.send(error)
        next();
    }
}

exports.showCustomers = async (req, res,next) => {
    try {
        const customer = await Customers.find({})
        res.json(customer)
    } catch (error) {
        console.log(error);
        next();
    }
}
exports.showCustomer = async (req, res,next) => {
    const { idCustomer } = req.params;
    const customer = await Customers.findById(idCustomer)
    if(!customer){
        res.json({message: "No existe el cliente"});
        return next();
    }
    
    res.json(customer)
}

exports.updateCustomer = async (req, res, next) => {
    const { idCustomer } = req.params;
    try {
        const customer = await Customers.findOneAndUpdate({_id: idCustomer}, req.body, {new:true})
        res.json(customer)
    } catch (error) {
        res.send(error)
        next();
    }
}

exports.deleteCustomer = async (req,res,next) => {
    const { idCustomer } = req.params;
    try {
        await Customers.findOneAndDelete({_id: idCustomer})
        res.json({message: "El cliente se ha eliminado"})
    } catch (error) {
        console.log(error)
        next();
    }
}