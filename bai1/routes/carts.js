const express = require('express');
const knex = require("../helpers/knex");
const router = express.Router();


router.get('/carts', (req, res) => {

    knex.select('*').from('orders').where({user_id: req.session.user_id, is_completed: false}).then(resolve => {
        if (resolve.length === 0) {
            return res.send("Chưa có đơn hàng")
        }

        let order = resolve[0]

        knex.select('*').from('order_product').where({orders_id: order.id}).then(order_products => {
            let rs = "Bạn đang có "
            if (order_products.length > 0) throw new Error('Giỏ hàng của bạn còn trống')
            return knex.select('*').from('products').where({id: order_products.products_id}).then(product => {
                res.render('/carts', {
                    items: [{
                        name: product.name,
                        sale_price: product.sale_price,
                        price: product.price,
                        quantity: order_products.quantity,
                        total: product.sale_price * order_products.quantity
                    },
                        totals += total
                    ],
                })
            }).then(() => {
                res.render('/carts')
            })
            //
            // order_products.forEach(order_product => {
            //     rs += `\n sản phẩm ${order_product.products_id} với số lượng là ${order_product.quantity}`
            // })


            // res.render('/carts')
            // res.send(rs)
        })

    }).catch(error => {
        res.render('home', {error: error.message})
    })

});
module.exports = router;