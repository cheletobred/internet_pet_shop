import { Products as ProductMapping } from "./mapping.js"

class Product {
    static async getOne(article) {
      const product = await ProductMapping.findByPk(article)
      if (!product) {
        throw new Error(`Товар не найден`);
      }
      return product;
    }
    static async create(article, name, description, volume, price, quantityStock, season, nameCat) {
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