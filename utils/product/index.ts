import MProduct from 'models/Product'
import { IProduct } from 'types'

export class ProductActions {
  static getAllProducts = async () => {
    return await MProduct.find()
  }
  static addProduct = async (product: Omit<IProduct, '_id'>) => {
    return await MProduct.create(product)
  }
  static updateProduct = async ({
    _id,
    ...product
  }: Omit<IProduct, 'rating'>) => {
    return await MProduct.findByIdAndUpdate(_id, product)
  }
  static getProductByCategory = async (category: string) => {
    return await MProduct.find({ category })
  }
}
