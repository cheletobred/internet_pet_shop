import sequelize from "../sequelize.js";
import database from 'sequelize'

const { DataTypes } = database

const Cart = sequelize.define('cart', {
    id_cart: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    id_client: {type: DataTypes.INTEGER},
    total_price: {type: DataTypes.DOUBLE, defaultValue: 0.0, allowNull: false}
}, {
    timestamps: false
}
)

const Cart_Items = sequelize.define('cart_items', {
    id_cart: {type: DataTypes.INTEGER},
    product_id_cart: {type: DataTypes.INTEGER},
    quantity: {type: DataTypes.INTEGER, allowNull: false},
    price_cart: {type: DataTypes.INTEGER}
},{
    timestamps: false,
    id: false
})

const Category = sequelize.define('category', {
    name_category: {type: DataTypes.STRING(255), primaryKey: true},
    description: {type: DataTypes.TEXT},
},{
    timestamps: false
})

const Clients = sequelize.define('clients', {
    id_clients: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    FIO_clients:{type: DataTypes.STRING(255)},
    contact_info: {type: DataTypes.JSON}
},{
    timestamps: false
})

const Favourites = sequelize.define('favourites', {
    id_fav: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    id_clients: {type: DataTypes.INTEGER},
},{
    timestamps: false
})

const Favourites_Items = sequelize.define('favourites_items', {
    id_fav: {type: DataTypes.INTEGER},
    product_id_fav: {type: DataTypes.INTEGER},
},{
    timestamps: false
})

const Image = sequelize.define('image_product', {
    id_img: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    article: {type: DataTypes.INTEGER},
    image: {type: DataTypes.JSON}
},{
    timestamps: false
})

const Orders = sequelize.define('orders', {
    id_order: {type: DataTypes.INTEGER, primaryKey: true},
    id_clients: {type: DataTypes.INTEGER},
    data_order: {type: DataTypes.DATE},
},{
    timestamps: false
})

const Order = sequelize.define('order', {
    id_order: {type: DataTypes.INTEGER},
    product_article: {type: DataTypes.INTEGER},
    quantity: {type: DataTypes.INTEGER},
    total_price: {type: DataTypes.DOUBLE}
},{
    timestamps: false
})

const Payments = sequelize.define('payments', {
    id_operation: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    order_id:{type: DataTypes.INTEGER},
    status: {type: DataTypes.STRING(255)},
    amount: {type: DataTypes.DOUBLE},
    date:{type: DataTypes.DATE},
},{
    timestamps: false
})

const Products = sequelize.define('product', {
    article: {type: DataTypes.INTEGER, primaryKey: true},
    name_product: {type: DataTypes.STRING(255)},
    description: {type: DataTypes.TEXT},
    volume: {type: DataTypes.DOUBLE},
    price: {type: DataTypes.DOUBLE},
    quantity_stock: {type: DataTypes.INTEGER},
    season: {type: DataTypes.ENUM('spring', 'summer', 'autumn', 'winter')},
    name_category: {type: DataTypes.STRING(255)},
},{
    timestamps: false
})

const Subcategory = sequelize.define('subcategory', {
    id_subcategory: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    id_category: {type: DataTypes.INTEGER},
    name_subcategory: {type: DataTypes.STRING(255)},
    description: {type: DataTypes.TEXT}
},{
    timestamps: false
})

// ОПИСАНИЕ СВЯЗЕЙ
Payments.belongsTo(Orders,  {foreignKey: 'id_order'})
Orders.hasMany(Payments, {onDelete: 'RESTRICT'})

Order.belongsTo(Orders, {foreignKey: 'id_order'})
Orders.hasMany(Order)

Orders.belongsTo(Clients, {foreignKey: 'id_clients'})
Clients.hasMany(Orders)

Order.belongsTo(Products, {foreignKey: 'article'})
Products.hasMany(Order)

Products.hasMany(Cart_Items, {foreignKey: 'product_id_cart'} )
Cart_Items.belongsTo(Products)

Products.hasOne(Image, {foreignKey: 'article'})
Image.hasOne(Products)

Cart_Items.belongsTo(Cart, {foreignKey: "id_cart"})
Cart.hasMany(Cart_Items)

Cart.hasOne(Clients, {foreignKey: 'id_clients'})
Clients.hasOne(Cart)

Products.hasOne(Favourites)
Favourites_Items.hasOne(Products, {foreignKey: 'article'})

Favourites.hasMany(Favourites_Items)
Favourites_Items.belongsTo(Favourites, {foreignKey: 'id_fav'})

Favourites.hasOne(Clients, {foreignKey: 'id_clients'})
Clients.hasOne(Favourites)

Category.hasMany(Products)
Products.belongsTo(Category, {foreignKey: 'article'})

Subcategory.belongsTo(Category, {foreignKey: 'name_category'})
Category.hasMany(Subcategory)



export {
    Cart,
    Cart_Items,
    Category,
    Clients,
    Favourites,
    Favourites_Items,
    Image,
    Order,
    Orders,
    Payments,
    Products,
    Subcategory
}
