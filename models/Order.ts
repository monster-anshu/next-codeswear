import mongoose, { Schema, model, models } from 'mongoose'
import { OrderState } from 'types'

export interface IOrder {
  userId: string
  products: {
    productId: string
    quantity: number
  }[]
  address: string
  amount: number
  state: typeof OrderState[number]
}

const OrderSchema = new Schema<IOrder>(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: Schema.Types.ObjectId, required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    state: { type: String, enum: OrderState, default: 'pendding' },
  },
  {
    timestamps: true,
  }
)

const MOrder =
  (models['order'] as mongoose.Model<IOrder>) ??
  model<IOrder>('order', OrderSchema)

export default MOrder
