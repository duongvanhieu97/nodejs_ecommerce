// viet câu lệnh từng bước để
// tạo database - tạo bảng - và insert dữ liệu mẫu vào bảng
// tạo bảng users create table `nodejs_ecommerce`.`users` ( `id` int(11) AUTO_INCREMENT ,
 `name` varchar(255) , `email` varchar(255) , `password` varchar(255) , primary key (`id`))

// tạo bảng categories create table `nodejs_ecommerce`.`categories` ( `id` int(11) not null AUTO_INCREMENT ,
`icon` blob ,`name` varchar(255) ,primary key (`id`))

// tạo bảng orders create table `nodejs_ecommerce`.`orders` ( `id` int(11) not null AUTO_INCREMENT,
 `time` date not null , `shipping_address` varchar(255) not null , `phone` varchar(255) not null ,
 `method` varchar(255) not null , primary key (`id`), `order_id` int(11)
 foreign key (order_id) references users(id)
 )

// tạo bảng products create table `nodejs_ecommerce`.`products` ( `id` int(11) not null AUTO_INCREMENT
, `image` BLOB not null , `name` VARCHAR(255) not null , `description` VARCHAR(255) not null
, `price` decimal not null , `sale_price` float not null , primary key (`id`), `category_id` int(11)
   foreign key (category_id) references categories(id)
 )

// tạo bảng order_product
CREATE TABLE order_product (
	id int(11) NOT null PRIMARY key AUTO_INCREMENT,
	orders_id int(11),
    products_id int(11),
    FOREIGN KEY (orders_id) REFERENCES orders(id),
    FOREIGN KEY (products_id) REFERENCES products(id)
);


// lấy các khóa mysql
SELECT TABLE_NAME,COLUMN_NAME,CONSTRAINT_NAME, REFERENCED_TABLE_NAME,REFERENCED_COLUMN_NAME FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE WHERE REFERENCED_TABLE_SCHEMA = 'nodejs_ecommerce';
