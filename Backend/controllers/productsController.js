const Products = require ('../models/products')
const multer = require('multer')
const shortid = require('shortid')
const fs = require('fs');

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname+'../../uploads/')
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1]
            cb(null, `${shortid.generate()}.${extension}`)
        }
    }),
    fileFilter(req, file, cb){
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ){
            cb(null, true);
        } else {
            cb(new Error ("Formato No Valido"))
        }
    }
}

const upload = multer(configuracionMulter).single('image')

exports.uploadFile = (req, res, next) => {
    upload (req, res, function(error){
        if(error){
            res.json({message: error})
        }
        return next()
    })
}

exports.newProduct = async (req, res, next) => {
    const product = new Products(req.body)
  
    try {
        if(req.file.filename){
            product.image = req.file.filename
        }
        await product.save();
        res.json({message : "Se agrego un nuevo producto"})
    } catch (error) {
        console.log(error)
        next()
    }
}

exports.showProducts = async (req, res, next) => {
    try {
        const products = await Products.find({});
        res.json(products);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.showProduct = async (req, res, next) => {

    const { idProduct } = req.params;
    const product = await Products.findById(idProduct);

    if (!product) {
        res.json({ message: 'Este producto no existe' });
        return next();
    }

    res.json(product);
}

exports.updateProduct = async (req, res, next) => {

    const { idProduct } = req.params;

    try {
        let newProduct = req.body;

        if (req.file) {
            newProduct.image = req.file.filename;
        } else {
            let previousProduct = await Products.findById(idProduct);
            newProduct.image = previousProduct.image;
        }

        let product = await Products.findOneAndUpdate({ _id: idProduct },
            newProduct, {
            new: true
        });

        res.json({
            product,
            message: 'Producto actualizado'
        });
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.deleteProduct = async (req, res, next) => {
    const { idProduct } = req.params;
    try {
        const product = await Products.findById({ _id: idProduct });
        if (product.image) {
            fs.unlink(__dirname + '../../uploads/' + product.image, function (err) {
                if (err) throw err;
                console.log('File deleted');
            });
        }

        await Products.findByIdAndDelete({ _id: idProduct });

        res.json({ message: 'El producto se ha eliminado' });
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.searchProduct = async (req, res, next) => {
    try {
        const {query} = req.params;
        const product = await Products.find({name: new RegExp(query, 'i')});
        res.json(product)
    } catch (error) {
        console.log(error)
        next()
    }
}