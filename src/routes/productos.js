const ContenedorMongoDB = require ('../contenedor/contenedorMongoDB');
const prodModel = require('../models/productosMongo');
const contenedor = new ContenedorMongoDB(prodModel);
const ProductosMock = require('../API/productos')
const newProd = new ProductosMock();

function productosPrincipal(req, res) {
    let newProducts = newProd.popular();
    res.render('product/prodMock',{ 
        newProducts:newProducts
    });
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