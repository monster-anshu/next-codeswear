import connectDB from 'middleware/Mongo'
import { NextApiHandler } from 'next'
import { IProduct, ResponseFuncs } from 'types'
import { ProductActions } from 'utils/product'

const handler: NextApiHandler = async (req, res) => {
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  const handleCase: ResponseFuncs = {
    GET: async (req, res) => {
      const products = await ProductActions.getAllProducts()
      res.json(products)
    },
    POST: async (req, res) => {
      const {
        title,
        category,
        description,
        images,
        price,
        stock,
        slag,
        color,
        thumbnail,
        brand,
        discount,
      } = req.body as IProduct
      const product = await ProductActions.addProduct({
        title,
        category,
        description,
        images,
        price,
        stock,
        slag,
        color,
        thumbnail,
        brand,
        discount,
        rating: 0,
      })

      res.json({ product })
    },
    PUT: async (req, res) => {
      const {
        _id,
        title,
        category,
        description,
        images,
        price,
        stock,
        slag,
        color,
        brand,
        discount,
        thumbnail,
        size,
      } = req.body as IProduct
      const product = await ProductActions.updateProduct({
        _id,
        title,
        category,
        description,
        images,
        price,
        stock,
        slag,
        color,
        brand,
        discount,
        thumbnail,
        size,
      })
      res.status(200).json({ product })
    },
  }

  const response = handleCase[method]
  if (!response)
    return res.status(500).json({ error: 'No Response for This Request' })
  try {
    await response(req, res)
  } catch (error: any) {
    res.status(400).json({ error: error.toString() })
  }
}

export default connectDB(handler)
