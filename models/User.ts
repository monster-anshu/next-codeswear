import mongoose, { Schema, model, models } from 'mongoose'

export interface IUser {
  name: string
  email: string
  phone: string
  image: string
  password?: string
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    image: { type: String },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const MUser =
  (models['user'] as mongoose.Model<IUser>) ?? model<IUser>('user', UserSchema)

export default MUser
