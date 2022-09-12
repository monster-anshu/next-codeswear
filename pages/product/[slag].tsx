import axios from 'axios'
import React, { useContext, useState } from 'react'
import { BsBagCheck } from 'react-icons/bs'
import { GetServerSideProps, NextPage } from 'next'
import { IProduct } from 'types'
import { Context } from 'context'
import CURRANCY from 'helper/currancy'
import { connectOnce } from 'middleware/Mongo'
import MProduct from 'models/Product'
interface Proptypes {
  product: IProduct | null
}

const ratings = [1, 2, 3, 4, 5]

export const getServerSideProps: GetServerSideProps<Proptypes> = async (
  context
) => {
  const { slag } = context.query
  connectOnce()
  const product = await MProduct.findOne({ slag })
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  }
}

const Product: NextPage<Proptypes> = ({ product }) => {
  const { addToCart } = useContext(Context)
  const [pincode, setPincode] = useState('')
  const [service, setService] = useState<boolean>()
  const checkService = () => {
    axios.post('/api/pincode', { pincode }).then((res) => {
      setService(res.data?.avilable)
    })
  }

  const onPinChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setService(undefined)
    setPincode(e.target.value)
  }

  const onAddClick = () => {
    if (!product || !addToCart) return
    addToCart(product)
  }

  return product ? (
    <section className='overflow-hidden text-gray-600 body-font'>
      <div className='container px-5 py-4 mx-auto'>
        <div className='flex flex-wrap mx-auto lg:w-4/5'>
          <img
            alt='ecommerce'
            className='object-contain w-full max-w-sm rounded '
            src={product.thumbnail}
          />
          <div className='w-full mt-6 lg:w-1/2 lg:pl-10 lg:py-6 lg:mt-0'>
            <h2 className='text-sm tracking-widest text-gray-500 title-font'>
              {product.category}
            </h2>
            <h1 className='mb-1 text-3xl font-medium text-gray-900 title-font'>
              {product.title}
            </h1>
            <div className='flex mb-4'>
              <span className='flex items-center'>
                {ratings.map((item, index) => (
                  <svg
                    fill={item < product.rating ? 'currentColor' : 'none'}
                    stroke={'currentColor'}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='w-4 h-4 text-pink-500'
                    viewBox='0 0 24 24'
                    key={index}
                  >
                    <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'></path>
                  </svg>
                ))}

                <span className='ml-3 text-gray-600'>
                  {product.rating} Reviews
                </span>
              </span>
              <span className='flex py-2 pl-3 ml-3 border-l-2 border-gray-200 space-x-2s'>
                <a className='text-gray-500'>
                  <svg
                    fill='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='w-5 h-5'
                    viewBox='0 0 24 24'
                  >
                    <path d='M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z'></path>
                  </svg>
                </a>
                <a className='text-gray-500'>
                  <svg
                    fill='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='w-5 h-5'
                    viewBox='0 0 24 24'
                  >
                    <path d='M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z'></path>
                  </svg>
                </a>
                <a className='text-gray-500'>
                  <svg
                    fill='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='w-5 h-5'
                    viewBox='0 0 24 24'
                  >
                    <path d='M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z'></path>
                  </svg>
                </a>
              </span>
            </div>
            <p className='leading-relaxed'>{product.description}</p>
            <div className='flex items-center pb-5 mt-6 mb-5 border-b-2 border-gray-100'>
              <div className='flex'>
                <span className='mr-3'>Color</span>
                <button className='w-6 h-6 border-2 border-gray-300 rounded-full focus:outline-none'></button>
                <button className='w-6 h-6 ml-1 bg-gray-700 border-2 border-gray-300 rounded-full focus:outline-none'></button>
                <button className='w-6 h-6 ml-1 bg-pink-500 border-2 border-gray-300 rounded-full focus:outline-none'></button>
              </div>
              <div className='flex flex-wrap items-center ml-6'>
                <span className='mr-3'>Size</span>
                <div className='relative'>
                  <select className='py-2 pl-3 pr-10 text-base border border-gray-300 rounded appearance-none focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500'>
                    <option>SM</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                  </select>
                  <span className='absolute top-0 right-0 flex items-center justify-center w-10 h-full text-center text-gray-600 pointer-events-none'>
                    <svg
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='w-4 h-4'
                      viewBox='0 0 24 24'
                    >
                      <path d='M6 9l6 6 6-6'></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className='flex'>
              <span className='text-2xl font-medium text-gray-900 title-font'>
                {CURRANCY}
                {product.price}
              </span>
              <button
                className='flex items-center px-6 py-2 ml-auto text-white bg-pink-500 border-0 rounded focus:outline-none hover:bg-pink-600 '
                onClick={onAddClick}
              >
                <BsBagCheck className='mx-2' />
                Add to Cart
              </button>
              <button className='inline-flex items-center justify-center w-10 h-10 p-0 ml-4 text-gray-500 bg-gray-200 border-0 rounded-full'>
                <svg
                  fill='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  className='w-5 h-5'
                  viewBox='0 0 24 24'
                >
                  <path d='M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z'></path>
                </svg>
              </button>
            </div>
            <div className='flex flex-wrap gap-2 mt-2 '>
              <input
                placeholder='Pincode'
                className='px-2 border-2 border-gray-400 rounded-md outline-none '
                value={pincode}
                onChange={onPinChange}
                type={'text'}
              />
              <button
                className='px-6 py-2 text-white bg-pink-500 border-0 rounded focus:outline-none hover:bg-pink-600'
                onClick={checkService}
              >
                Check
              </button>
            </div>
            {service === false && (
              <div className='mt-3 text-sm text-red-700'>
                Sorry, We don't Deliver to {pincode}.
              </div>
            )}
            {service === true && (
              <div className='mt-3 text-sm text-green-700'>
                {pincode} is serviceable.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  ) : (
    <p>Not found</p>
  )
}

export default Product
