import sequelize from "../sequelize.js";
import database from 'sequelize'

const { DataTypes } = database

const Cart = sequelize.define('cart', {
    id_cart: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    id_client: {type: DataTypes.INTEGER},
    total_price: {type: DataTypes.DOUBLE, defaultValue: 0.0, allowNull: false}
})

const Cart_Items = sequelize.define('cart_items', {
    id_cart: {type: DataTypes.INTEGER},
    product_id_cart: {type: DataTypes.INTEGER},
    quantity: {type: DataTypes.INTEGER, allowNull: false},
    price_cart: {type: DataTypes.INTEGER}
})

const Category = sequelize.define('category', {
    name_category: {type: DataTypes.STRING(255), primaryKey: true},
    description: {type: DataTypes.TEXT},
})

const Clients = sequelize.define('clients', {
    id_clients: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    FIO_clients:{type: DataTypes.STRING(255)},
    contact_info: {type: DataTypes.JSON}
})

const Favourites = sequelize.define('favourites', {
    id_fav: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    id_clients: {type: DataTypes.INTEGER},
})

const Favourites_Items = sequelize.define('favourites_items', {
    id_fav: {type: DataTypes.INTEGER},
    product_id_fav: {type: DataTypes.INTEGER},
})

const Image = sequelize.define('image_product', {
    id_img: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    article: {type: DataTypes.INTEGER},
    image: {type: DataTypes.JSON}
})

const Orders = sequelize.define('orders', {
    id_order: {type: DataTypes.INTEGER, primaryKey: true},
    id_clients: {type: DataTypes.INTEGER},
    data_order: {type: DataTypes.DATE},
})

const Order = sequelize.define('order', {
    id_order: {type: DataTypes.INTEGER},
    product_article: {type: DataTypes.INTEGER},
    quantity: {type: DataTypes.INTEGER},
    total_price: {type: DataTypes.DOUBLE}
})

const Payments = sequelize.define('payments', {
    id_operation: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    order_id:{type: DataTypes.INTEGER},
    status: {type: DataTypes.STRING(255)},
    amount: {type: DataTypes.DOUBLE},
    date:{type: DataTypes.DATE},
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
})

const Subcategory = sequelize.define('subcategory', {
    id_subcategory: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    id_category: {type: DataTypes.INTEGER},
    name_subcategory: {type: DataTypes.STRING(255)},
    description: {type: DataTypes.TEXT}
})

// ОПИСАНИЕ СВЯЗЕЙ
Payments.belongsTo(Orders,  {foreignKey: 'id_order'})
Orders.hasMany(Payments, {onDelete: 'RESTRICT'})

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
