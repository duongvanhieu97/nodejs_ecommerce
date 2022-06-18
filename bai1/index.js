const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const session = require('express-session')
const {engine} = require('express-handlebars');

const app = express();
app.engine('.hbs', engine({
    extname: '.hbs', helpers: {
        //dùng để tăng stt trong danh sách sản phẩm
        sum: (a, b) => a + b,
    }
}));

app.set('view engine', '.hbs');
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
    secret: 'keyboard cat', resave: false, saveUninitialized: true
}))



const homeRouter = require('./routes/home')
const categoryRouter = require('./routes/categories')
const usersRouter = require('./routes/users')
const productsRouter = require('./routes/products');
// const ordersRouter = require('./routes/orders');
const cartsRouter = require('./routes/carts');
const RequireLogin = require("./middleware/auth");

app.use('/', homeRouter)
app.use('/categories', categoryRouter)
app.use('/users', usersRouter)
app.use('/products',RequireLogin, productsRouter)
// app.use('/orders', RequireLogin, ordersRouter)
app.use('/', RequireLogin, cartsRouter)

app.listen(3000);