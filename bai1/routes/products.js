const express = require('express');
const upload = require("../helpers/upload");
const knex = require("../helpers/knex");
const router = express.Router();
// GET products
router.get('/', (req, res, next) => {
    res.render('products/products')
});


// GET list
router.get('/list', (req, res, next) => {
    knex.select('*').from('products').then(resolve => {
        res.render('products/list', {products: resolve})
    }).catch((error) => {
        res.render('products/list', {error: 'Đăng sản phẩm thất bại'})
    })
})
// GET update
router.get('/:id', (req, res, next) => {
    res.render('products/update')
})

//POST products
router.post('/', upload.single('myFile'), (req, res) => {
    knex('products')
        .where({name: req.body.name})
        .then(resolve => {
            if (resolve.length > 0) throw new Error("Sản phẩm đã tồn tại")

            return knex('products').insert({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                sale_price: req.body.sale_price,
                image: 'files/' + req.file.filename,
            })
        }).then(() => {
        //chuyển về trang đăng sản phẩm
        res.render('products/list')
    }).catch(error => {
        res.render('products/products', {error: error.message})
    })
})

//POST update
router.post('/:id', upload.single('myFile'), (req, res, next) => {

    knex('products').where({id: req.params.id}).update({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        sale_price: req.body.sale_price,
        image: 'files/' + req.file.filename,
    }).then(resolve => {
        res.render('products/list')
    }).catch(error => {
        res.render('products/update', {error: error.message})
    })
    res.redirect('/products/list')
})

//GET DELETE
router.get('/delete/:id', (req, res) => {
    knex('products').where({id: req.params.id}).del().then(() => {
        res.redirect('/products/list')
    }).catch(error => {
        res.render('products/list', {error: error.message})
    })
})
module.exports = router;