import CURRANCY from 'helper/currancy'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import { ICartItem } from 'types'

const ratings = [1, 2, 3, 4, 5]

interface PropsTypes {
  cart?: ICartItem[]
  addToCart?: (product: ICartItem) => void
  removeFromCart?: (product: ICartItem) => void
}
const ReviewCart: React.FC<PropsTypes> = ({
  cart,
  addToCart,
  removeFromCart,
}) => {
  return (
    <div className='flex flex-col items-center justify-center gap-8 p-6 mx-auto mt-8 rounded-md '>
      <h2 className='w-full max-w-2xl mb-4 text-xl text-center '>
        Review cart items
      </h2>
      {cart?.map((product, index) => (
        <div
          className='flex flex-col items-start w-full max-w-2xl gap-8 md:flex-row '
          key={index}
        >
          <div className='flex-1 max-w-[200px]'>
            <Image
              alt={product.title}
              src={product.thumbnail}
              width={100}
              height={100}
              className='object-contain w-full h-full '
            />
          </div>
          <div className='flex-1'>
            <p className='text-xl font-bold cursor-pointer hover:text-pink-700 '>
              <Link href={`/product/${product.slag}`}>
                <a>{product.title}</a>
              </Link>
            </p>
            <p className=' max-h-20 text-wrap'>{product.description}</p>
            <div className='flex items-center justify-start space-x-2 font-semibold '>
              <AiOutlinePlusCircle
                className='text-2xl cursor-pointer '
                onClick={() => addToCart?.(product)}
              />
              <span> {product.quantity} </span>
              <AiOutlineMinusCircle
                className='text-2xl cursor-pointer '
                onClick={() => removeFromCart?.(product)}
              />
            </div>
            <p className='my-2 text-2xl '>
              {CURRANCY}
              {product.price}
            </p>

            <span className='flex'>
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
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ReviewCart
