import sequelize from "../sequelize.js";
import database from 'sequelize'

const { DataTypes } = database

const Cart = sequelize.define('cart', {
    idCart: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    totalPrice: {type: DataTypes.DOUBLE, defaultValue: 0.0, allowNull: false}
}, {
    timestamps: false,
    freezeTableName: true,
    id: false
})

const CartProducts = sequelize.define('cart_product', {
    idCartItems: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    quantity: {type: DataTypes.INTEGER, allowNull: false},
    price: {type: DataTypes.DOUBLE}
},{
    timestamps: false,
    freezeTableName: true
})

const Category = sequelize.define('category', {
    idCategory: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nameCategory: {type: DataTypes.STRING(255)},
    description: {type: DataTypes.TEXT},
},{
    timestamps: false,
    freezeTableName: true,
    id: false
})

const Users = sequelize.define('users', {
    idUser: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique: true},
    sex: {type: DataTypes.ENUM('Мужской', 'Женский')},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.ENUM('ADMIN', 'USER'), defaultValue: 'USER'}
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
    idFavItems: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
},{
    timestamps: false
})

const Orders = sequelize.define('orders', {
    idOrder: {type: DataTypes.INTEGER, primaryKey: true},
    date: {type: DataTypes.DATE}
},{
    timestamps: false,
    id: false
})

const OrderItems = sequelize.define('order_items', {
    idOrderItems: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    quantity: {type: DataTypes.INTEGER}
},{
    timestamps: false,
    id: false
})

const Payments = sequelize.define('payments', {
    idPay: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    status: {type: DataTypes.STRING(255)}
},{
    timestamps: false,
    id: false
})

const Products = sequelize.define('product', {
    article: {type: DataTypes.INTEGER, primaryKey: true},
    nameProduct: {type: DataTypes.STRING(255)},
    description: {type: DataTypes.TEXT},
    volume: {type: DataTypes.DOUBLE},
    size: {type: DataTypes.STRING(30)},
    country: {type: DataTypes.STRING(30)},
    age: {type: DataTypes.STRING(30)},
    price: {type: DataTypes.DECIMAL},
    quantityStock: {type: DataTypes.INTEGER},
    image: {type: DataTypes.STRING, allowNull: false},
    season: {type: DataTypes.ENUM('весна', 'осень', 'зима', 'лето')}
},{
    timestamps: false,
    id: false
})

const Subcategory = sequelize.define('subcategory', {
    idSubCategory: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nameSubCategory: {type: DataTypes.STRING(255)},
    description: {type: DataTypes.TEXT}
},{
    timestamps: false,
    freezeTableName: true,
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

Cart.belongsToMany(Products, { through: CartProducts, onDelete: 'CASCADE', foreignKey: 'idCart', type: DataTypes.INTEGER })
Products.belongsToMany(Cart, { through: CartProducts, onDelete: 'CASCADE', foreignKey: "article", type: DataTypes.INTEGER })

CartProducts.belongsTo(Products, {foreignKey: 'article', type: DataTypes.INTEGER})
Products.hasMany(CartProducts, {foreignKey: 'article'})

CartProducts.belongsTo(Cart, {foreignKey: "idCart", type: DataTypes.INTEGER})
Cart.hasMany(CartProducts, {foreignKey: "idCart"})

Cart.hasOne(Users, {foreignKey: 'idUser', type: DataTypes.INTEGER})
Users.hasOne(Cart, {foreignKey: 'idUser'})

FavouritesItems.hasOne(Products, {foreignKey: 'article', type: DataTypes.INTEGER})
Products.hasOne(Favourites, {foreignKey: "article"})

FavouritesItems.belongsTo(Favourites, {foreignKey: 'idFav', type: DataTypes.INTEGER})
Favourites.hasMany(FavouritesItems, {foreignKey: 'idFav'})

Favourites.hasOne(Users, {foreignKey: 'idUser', type: DataTypes.INTEGER})
Users.hasOne(Favourites, {foreignKey: 'idUser'})

Products.belongsTo(Category, {foreignKey: 'idCategory', type: DataTypes.STRING(255)})
Category.hasMany(Products, {foreignKey: 'idCategory'})

Subcategory.belongsTo(Category, {foreignKey: 'idCategory', type: DataTypes.STRING(255)})
Category.hasMany(Subcategory, {foreignKey: 'idCategory'})

export {
    Cart,
    CartProducts,
    Category,
    Users,
    Favourites,
    FavouritesItems,
    OrderItems,
    Orders,
    Payments,
    Products,
    Subcategory
}
