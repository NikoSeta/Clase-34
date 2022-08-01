const carritoMongo = require('../models/carritoMongo');



function verCarrito(req, res){
    let carrito = []
    res.render('product/carrito', {carrito:carrito})
}

module.exports = {
    verCarrito
}