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
          const product = await ProductMapping.create({
            article, name, description, volume, price, quantityStock, season, nameCat
          });
          console.log('Продукт успешно создан:', product.toJSON());
        } catch (error) {
          console.error('Ошибка создания продукта:', error);
        }
      }
<<<<<<< HEAD

      
=======
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
>>>>>>> 761ac219c170dbc984f1d8105eb8bfe613072efc
}
export default Product;