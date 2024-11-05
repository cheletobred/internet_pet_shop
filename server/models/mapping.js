import sequelize from "../sequelize.js";
import database from 'sequelize'

const { DataTypes } = database

const Cart = sequelize.define('carts', {
    id_cart: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    total_price_cart: {type: DataTypes.DOUBLE, defaultValue: 0.0, allowNull: false}
}, {
    timestamps: false,
    id: false
})

const Cart_Items = sequelize.define('cart_items', {
    quantity: {type: DataTypes.INTEGER, allowNull: false},
    price_cart: {type: DataTypes.DOUBLE}
},{
    timestamps: false
})

const Category = sequelize.define('category', {
    name_category: {type: DataTypes.STRING(255), primaryKey: true},
    description_category: {type: DataTypes.TEXT},
},{
    timestamps: false,
    id: false
})

const Clients = sequelize.define('clients', {
    id_clients: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    FIO_clients:{type: DataTypes.STRING(255)},
    contact_info: {type: DataTypes.JSON}
},{
    timestamps: false,
    id: false
})

const Favourites = sequelize.define('favourites', {
    id_fav: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
},{
    timestamps: false,
    id: false
})

const Favourites_Items = sequelize.define('favourites_items', {
    price_fav: {type: DataTypes.DOUBLE}
},{
    timestamps: false
})

const Image = sequelize.define('image_product', {
    id_img: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    image: {type: DataTypes.JSON}
},{
    timestamps: false,
    id: false
})

const Orders = sequelize.define('orders', {
    id_order: {type: DataTypes.INTEGER, primaryKey: true},
    date_order: {type: DataTypes.DATE},
    total_price_order: {type: DataTypes.DOUBLE}
},{
    timestamps: false,
    id: false
})

const Order_items = sequelize.define('order_items', {
    id_order_item: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    quantity: {type: DataTypes.INTEGER},
    price_order_item: {type: DataTypes.DOUBLE}
},{
    timestamps: false,
    id: false
})

const Payments = sequelize.define('payments', {
    id_operation: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    status: {type: DataTypes.STRING(255)},
    amount: {type: DataTypes.DOUBLE},
    date_payments:{type: DataTypes.DATE},
},{
    timestamps: false,
    id: false
})

const Products = sequelize.define('product', {
    article: {type: DataTypes.INTEGER, primaryKey: true},
    name_product: {type: DataTypes.STRING(255)},
    description: {type: DataTypes.TEXT},
    volume: {type: DataTypes.DOUBLE},
    price: {type: DataTypes.DOUBLE},
    quantity_stock: {type: DataTypes.INTEGER},
    season: {type: DataTypes.ENUM('spring', 'summer', 'autumn', 'winter')}
},{
    timestamps: false,
    id: false
})

const Subcategory = sequelize.define('subcategory', {
    id_subcategory: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name_subcategory: {type: DataTypes.STRING(255)},
    description_subcategory: {type: DataTypes.TEXT}
},{
    timestamps: false,
    id: false
})

// ОПИСАНИЕ СВЯЗЕЙ
Payments.belongsTo(Orders,  {foreignKey: 'id_order', type: DataTypes.INTEGER})
Orders.hasMany(Payments,  {foreignKey: 'id_order'})

Orders.belongsTo(Clients, {foreignKey: 'id_clients', type: DataTypes.INTEGER})
Clients.hasMany(Orders, {foreignKey: 'id_clients'})

Order_items.belongsTo(Orders, {foreignKey: 'id_order', type: DataTypes.INTEGER})
Orders.hasMany(Order_items, {foreignKey: 'id_order'})

Order_items.belongsTo(Products, {foreignKey: 'article', type: DataTypes.INTEGER})
Products.hasMany(Order_items, {foreignKey: 'article'})

Cart_Items.belongsTo(Products, {foreignKey: 'article', type: DataTypes.INTEGER})
Products.hasMany(Cart_Items, {foreignKey: 'article'})

Cart_Items.belongsTo(Cart, {foreignKey: "id_cart", type: DataTypes.INTEGER})
Cart.hasMany(Cart_Items, {foreignKey: "id_cart"})

Cart.hasOne(Clients, {foreignKey: 'id_clients', type: DataTypes.INTEGER})
Clients.hasOne(Cart, {foreignKey: 'id_clients'})
 
Image.hasOne(Products, {foreignKey: 'article', type: DataTypes.INTEGER})
Products.hasOne(Image, {foreignKey: 'article'})

Favourites_Items.hasOne(Products, {foreignKey: 'article', type: DataTypes.INTEGER})
Products.hasOne(Favourites, {foreignKey: "article"})

Favourites_Items.belongsTo(Favourites, {foreignKey: 'id_fav', type: DataTypes.INTEGER})
Favourites.hasMany(Favourites_Items, {foreignKey: 'id_fav'})

Favourites.hasOne(Clients, {foreignKey: 'id_clients', type: DataTypes.INTEGER})
Clients.hasOne(Favourites, {foreignKey: 'id_clients'})

Products.belongsTo(Category, {foreignKey: 'name_category', type: DataTypes.STRING(255)})
Category.hasMany(Products, {foreignKey: 'name_category'})

Subcategory.belongsTo(Category, {foreignKey: 'name_category', type: DataTypes.STRING(255)})
Category.hasMany(Subcategory, {foreignKey: 'name_category'})

export {
    Cart,
    Cart_Items,
    Category,
    Clients,
    Favourites,
    Favourites_Items,
    Image,
    Order_items,
    Orders,
    Payments,
    Products,
    Subcategory
}
