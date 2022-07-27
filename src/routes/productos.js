const ContenedorMongoDB = require ('../contenedor/contenedorMongoDB');
const prodModel = require('../models/productosMongo');
const contenedor = new ContenedorMongoDB(prodModel);
const ProductosMock = require('../API/productos')

async function productosPrincipal(req, res) {
    res.render('productos',{ ProductosMock });
};


async function verProductos(req, res) {
    let products = await contenedor.getAll();
    res.render('product/productos',{
        products: products
    });
};

module.exports = {
    verProductos,
    productosPrincipal
};