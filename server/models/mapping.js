import sequelize from "../sequelize.js";
import database from 'sequelize'

const { DataTypes } = database

const Cart = sequelize.define('carts', {
    idCart: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    totalPrice: {type: DataTypes.DOUBLE, defaultValue: 0.0, allowNull: false}
}, {
    timestamps: false,
    id: false
})

const CartProducts = sequelize.define('cart_products', {
    quantity: {type: DataTypes.INTEGER, allowNull: false},
    price: {type: DataTypes.DOUBLE}
},{
    timestamps: false
})

const Category = sequelize.define('category', {
    nameCat: {type: DataTypes.STRING(255), primaryKey: true},
    description: {type: DataTypes.TEXT},
},{
    timestamps: false,
    id: false
})

const Users = sequelize.define('users', {
    idUser: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'}
},{
    timestamps: false,
    id: false
})

const Favourites = sequelize.define('favourites', {
    idFav: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
},{
    timestamps: false,
    id: false
})

const FavouritesItems = sequelize.define('favourites_items', {
    priceFav: {type: DataTypes.DOUBLE}
},{
    timestamps: false
})

const Image = sequelize.define('image_product', {
    idImg: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    image: {type: DataTypes.JSON}
},{
    timestamps: false,
    id: false
})

const Orders = sequelize.define('orders', {
    idOrder: {type: DataTypes.INTEGER, primaryKey: true},
    dateOrder: {type: DataTypes.DATE},
    orderPrice: {type: DataTypes.DOUBLE}
},{
    timestamps: false,
    id: false
})

const OrderItems = sequelize.define('order_items', {
    idOrderItem: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    quantity: {type: DataTypes.INTEGER},
    priceOrderItem: {type: DataTypes.DOUBLE}
},{
    timestamps: false,
    id: false
})

const Payments = sequelize.define('payments', {
    idPay: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    status: {type: DataTypes.STRING(255)},
    amount: {type: DataTypes.DOUBLE},
    datePayments:{type: DataTypes.DATE},
},{
    timestamps: false,
    id: false
})

const Products = sequelize.define('product', {
    article: {type: DataTypes.INTEGER, primaryKey: true},
    name: {type: DataTypes.STRING(255)},
    description: {type: DataTypes.TEXT},
    volume: {type: DataTypes.DOUBLE},
    price: {type: DataTypes.DOUBLE},
    quantityStock: {type: DataTypes.INTEGER},
    image: {type: DataTypes.STRING, allowNull: false},
    season: {type: DataTypes.ENUM('spring', 'summer', 'autumn', 'winter')}
},{
    timestamps: false,
    id: false
})

const Subcategory = sequelize.define('subcategory', {
    idSubCat: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING(255)},
    description: {type: DataTypes.TEXT}
},{
    timestamps: false,
    id: false
})

// ОПИСАНИЕ СВЯЗЕЙ
Payments.belongsTo(Orders,  {foreignKey: 'idOrder', type: DataTypes.INTEGER})
Orders.hasMany(Payments,  {foreignKey: 'idOrder'})

Orders.belongsTo(Users, {foreignKey: 'idUser', type: DataTypes.INTEGER})
Users.hasMany(Orders, {foreignKey: 'idUser'})

OrderItems.belongsTo(Orders, {foreignKey: 'idOrder', type: DataTypes.INTEGER})
Orders.hasMany(OrderItems, {foreignKey: 'idOrder'})

OrderItems.belongsTo(Products, {foreignKey: 'article', type: DataTypes.INTEGER})
Products.hasMany(OrderItems, {foreignKey: 'article'})

CartProducts.belongsTo(Products, {foreignKey: 'article', type: DataTypes.INTEGER})
Products.hasMany(CartProducts, {foreignKey: 'article'})

CartProducts.belongsTo(Cart, {foreignKey: "idCart", type: DataTypes.INTEGER})
Cart.hasMany(CartProducts, {foreignKey: "idCart"})

Cart.hasOne(Users, {foreignKey: 'idUser', type: DataTypes.INTEGER})
Users.hasOne(Cart, {foreignKey: 'idUser'})
 
Image.hasOne(Products, {foreignKey: 'article', type: DataTypes.INTEGER})
Products.hasOne(Image, {foreignKey: 'article'})

FavouritesItems.hasOne(Products, {foreignKey: 'article', type: DataTypes.INTEGER})
Products.hasOne(Favourites, {foreignKey: "article"})

FavouritesItems.belongsTo(Favourites, {foreignKey: 'id_fav', type: DataTypes.INTEGER})
Favourites.hasMany(FavouritesItems, {foreignKey: 'id'})

Favourites.hasOne(Users, {foreignKey: 'idUser', type: DataTypes.INTEGER})
Users.hasOne(Favourites, {foreignKey: 'idUser'})

Products.belongsTo(Category, {foreignKey: 'nameCat', type: DataTypes.STRING(255)})
Category.hasMany(Products, {foreignKey: 'nameCat'})

Subcategory.belongsTo(Category, {foreignKey: 'nameCat', type: DataTypes.STRING(255)})
Category.hasMany(Subcategory, {foreignKey: 'nameCat'})

export {
    Cart,
    CartProducts,
    Category,
    Users,
    Favourites,
    FavouritesItems,
    Image,
    OrderItems,
    Orders,
    Payments,
    Products,
    Subcategory
}
