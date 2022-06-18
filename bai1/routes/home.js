const express = require('express');
const knex = require("../helpers/knex");
const router = express.Router();


router.get('/', (req, res) => {

    knex.select('*').from('products').then(resolve => {
        res.render('home', {products: resolve})
    }).catch(error => {
        res.render('home', {error: error.message})
    })

});
module.exports = router;