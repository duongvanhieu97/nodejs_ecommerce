// const express = require('express');
// const knex = require("../helpers/knex");
// const router = express.Router();
//
//
// router.get('/', (req, res) => {
//
//     knex.select('*').from('orders').where({user_id: req.session.user_id, is_completed: false}).then(resolve => {
//         if (resolve.length === 0) {
//             return res.send("Chưa có đơn hàng")
//         }
//
//         let order = resolve[0]
//
//         knex.select('*').from('order_product').where({orders_id: order.id}).then(order_products => {
//             let rs = "Bạn đang có "
//
//             knex.select('*').from('products').where({id: order_products.products_id}).then(product => {
//                 res.render('cart', {
//                     items: [
//                         {
//                             name: product.name,
//                             quantity: order_products.quantity,
//                             price: 87,
//                             total: 87 * 12
//                         },
//                         {
//                             name: product.name,
//                             quantity: order_products.quantity,
//                             price: 87,
//                             total: 87 * 12
//                         }
//                     ],
//                     total: 120,
//                 })
//             })
//             //
//             // order_products.forEach(order_product => {
//             //     rs += `\n sản phẩm ${order_product.products_id} với số lượng là ${order_product.quantity}`
//             // })
//
//
//
//             res.send(rs)
//         })
//
//     }).catch(error => {
//         res.render('home', {error: error.message})
//     })
//
// });
// module.exports = router;