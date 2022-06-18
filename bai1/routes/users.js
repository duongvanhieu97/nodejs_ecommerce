const express = require('express');
const knex = require("../helpers/knex");
const router = express.Router();

router.get('/register', (req, res, next) => {
    res.render('user/register')
});

router.get('/login', (req, res, next) => {
    res.render('user/login')
});
//POST Đăng nhập
router.post('/login', (req, res) => {
    let name = req.body.name
    knex('users').where({
        name: req.body.name, password: req.body.password
    }).select('id').then(results => {
        if (results.length > 0) {
            req.session.name = name
            req.session.user_id = results[0].id
            res.redirect('/')
        } else {
            res.send('Vui lòng nhập tên hoặc mật khẩu')
        }
    }).catch(error => {
        res.send('Bạn nhập sai mật khẩu' + {error})
    })
})
//POST Đăng ký
router.post('/register', (req, res) => {
    knex('users').where({
        name: req.body.name
    }).then(resolve => {
        if (resolve.length === 0) {
            knex('users').insert([{name: req.body.name, password: req.body.password, email: req.body.email}])
        } else {
            return res.render('register', {error: "Tài khoản đã tồn tại"})
        }
    }).catch(error => {
        return res.render('register', {error: 'Đã có tài khoản'})
    })
    //chuyển về trang đăng nhập
    res.redirect('/users/login')
})

module.exports = router
