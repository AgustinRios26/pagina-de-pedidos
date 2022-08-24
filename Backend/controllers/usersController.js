const Users = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.registerUser = async (req, res) => {
    const user = new Users(req.body);
    user.password = await bcrypt.hash(req.body.password, 12);
    try {
        await user.save();
        res.json({message : 'Se ha creado el usuario'});
    } catch (error) {
        console.log(error);
        res.json({message : 'Hubo un error'});
    }
}

exports.loginUser = async (req, res, next) => {
     const { email, password } = req.body;
     const user = await Users.findOne({ email });
 
     if(!user) {
         await res.status(401).json({message : 'Ese usuario no existe'});
         next();
     } else {
         if(!bcrypt.compareSync(password, user.password )) {
             await res.status(401).json({ message : 'Password Incorrecto'});
             next();
         } else {
             const token = jwt.sign({
                 email : user.email, 
                 name: user.name, 
                 id : user._id
             }, 
             'KeySecret', 
             {
                 expiresIn : '12h'
             }); 
 
             res.json({ token });
         }
 
 
     }

    
}