const express = require('express');
const knex = require("../helpers/knex");
const upload = require("../helpers/upload");
const RequireLogin = require("../middleware/auth");
const router = express.Router();
// GET category
router.get('/', RequireLogin, (req, res, next) => {
    res.render('categories/categories')
})
// GET list
router.get('/list', RequireLogin, (req, res, next) => {
    knex.select('*').from('categories').then(resolve => {
        res.render('categories/list', {categories: resolve})
    }).catch((error) => {
        res.render('categories/list', {error: 'Đăng sản phẩm thất bại'})
    })
})

// GET update
router.get('/:id', RequireLogin, (req, res, next) => {
    res.render('categories/update')
})


// POST category
router.post('/', upload.single('myFile'), (req, res) => {
    knex('categories').where({
        name: req.body.name,
    }).then(resolve => {
        if (resolve.length > 0) throw new Error("Nhóm sản phẩm đã tồn tại")
        {
            return knex('categories').insert({
                image: 'files/' + req.file.filename,
                name: req.body.name,
            })
        }

    }).then((resole) => {
        res.render('categories/list')
    }).catch(error => {
        res.render('categories/categories', {error: error.message})
    })
})
//POST categories
router.post('/:id', upload.single('myFile'), (req, res, next) => {

    knex('categories').where({id: req.params.id}).update({
        name: req.body.name,
        image: 'files/' + req.file.filename,
    }).then(resolve => {
        console.log(name)

        res.render('categories/list')
    }).catch(error => {
        res.render('categories/update', {error: error.message})
    })
    res.redirect('/categories/list')
})

//GET DELETE Category
router.get('/delete/:id', (req, res) => {
    knex('categories').where({id: req.params.id}).del().then(() => {
        res.redirect('/categories/list')
    }).catch(error => {
        res.render('categories/list', {error: error.message})
    })
})
module.exports = router;
