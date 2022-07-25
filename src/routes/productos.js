const ContenedorMongoDB = require ('../contenedor/contenedorMongoDB');
const contenedor = new ContenedorMongoDB;
const { modelProd } = require('../models/productosMongo');
const ProductosMock = require('../API/productos')

async function productosPrincipal(req, res) {
    res.render('productos',{ ProductosMock });
};

 async function verProductos(req, res) {
    let products = await contenedor.getAll(modelProd);
    res.render('productos',{
        products: products
    });
};

module.exports = {
    verProductos,
    productosPrincipal
};