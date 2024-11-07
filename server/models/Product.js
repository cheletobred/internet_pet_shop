import { Products as ProductMapping } from "./mapping.js"

const pretty = (basket) => {
    const data = {}
    data.id = basket.id
    data.products = []
    if (basket.products) {
        data.products = basket.products.map(item => {
            return {
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.basket_product.quantity
            }
        })
    }
    return data
}

class Product {
    static async getOne(article) {
            const product = await ProductMapping.findByPk(article)
            return product;
    }
    static async addProduct(article, name, description, volume, price, quantityStock, season, nameCat) {
        try {
          const cart = await ProductMapping.create({
            article, name, description, volume, price, quantityStock, season, nameCat
          });
          console.log('Product created:', cart.toJSON());
        } catch (error) {
          console.error('Error creating product:', error);
        }
      }
}
export default Product;