import { Products as ProductMapping } from "./mapping.js"

class Product {
    static async getOne(article) {
            const product = await ProductMapping.findByPk(article)
            return product;
    }
    static async addProduct(article, name, description, volume, price, quantityStock, season, nameCat) {
        try {
          const product = await ProductMapping.create({
            article, name, description, volume, price, quantityStock, season, nameCat
          });
          console.log('Продукт успешно создан:', product.toJSON());
        } catch (error) {
          console.error('Ошибка создания продукта:', error);
        }
      }
      static async deleteProduct(article){
        const product = await ProductMapping.findByPk(article)
        if (product==false){
          console.log('Продукт не найден')
        }
        else {
          await product.destroy()
          console.log('Продукт успешно удален')
        }
      static
}
}
export default Product;