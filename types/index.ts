import { NextApiHandler } from 'next'
import React from 'react'

export const ProductSizes = [
  '2xs',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
] as const
export const ProductCatgories = ['t-shirt', 'mug'] as const
export const OrderState = ['pendding', 'delivered'] as const

export interface ResponseFuncs {
  GET?: NextApiHandler
  POST?: NextApiHandler
  PUT?: NextApiHandler
  DELETE?: NextApiHandler
}

export interface IProduct {
  _id: string
  title: string
  description: string
  images: string[]
  category: typeof ProductCatgories[number]
  price: number
  brand: string
  thumbnail: string
  stock: number
  discount: number
  rating: number
  slag: string
  size?: typeof ProductSizes[number]
  color?: string
}

export interface ICartItem extends IProduct {
  quantity: number
  varient: string
}

export interface IContext {
  clearCart?: () => void
  removeFromCart?: (item: ICartItem) => void
  addToCart?: (item: IProduct) => void
  cart?: ICartItem[]
}

export interface IAddress {
  name: string
  email: string
  phone: string
  address: string
  pincode: string
  city: string
  state: string
}

export interface IPostOffice {
  Block: string
  BranchType: string
  Circle: string
  Country: string
  DeliveryStatus: string
  Description: null | string
  District: string
  Division: string
  Name: string
  Pincode: string
  Region: string
  State: string
}
export interface IOrder extends ICartItem {
  orderID: number
  status: string
}
