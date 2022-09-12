import CURRANCY from 'helper/currancy'
import Link from 'next/link'
import React from 'react'

const order = () => {
  return (
    <section className='text-gray-600 body-font'>
      {/* {Order.map((item, index) => (
        <div key={index} className='container px-5 py-10 mx-auto'>
          <div className='flex flex-wrap justify-center mx-auto my-3 lg:w-4/5 '>
            <div className='w-full mb-6 lg:w-1/2 lg:pr-10 lg:py-6 lg:mb-0'>
              <h2 className='text-sm tracking-widest text-gray-500 title-font'>
                {item.category}
              </h2>
              <h1 className='mb-4 text-3xl font-medium text-gray-900 title-font'>
                Order id : {item.orderID}
              </h1>

              <p className='mb-4 leading-relaxed'>{item.status}</p>
              <div className='flex py-2 border-t border-gray-200'>
                <span className='text-gray-500'>Color</span>
                <span className='ml-auto text-gray-900'>{item.varient}</span>
              </div>
              <div className='flex py-2 border-t border-gray-200'>
                <span className='text-gray-500'>Size</span>
                <span className='ml-auto text-gray-900'>Medium</span>
              </div>
              <div className='flex py-2 border-t border-gray-200'>
                <span className='text-gray-500'>Price</span>
                <span className='ml-auto text-gray-900'>
                  {CURRANCY + item.price}/-
                </span>
              </div>
              <div className='flex py-2 mb-6 border-t border-b border-gray-200'>
                <span className='text-gray-500'>Quantity</span>
                <span className='ml-auto text-gray-900'>{item.quantity}</span>
              </div>

              <div className='flex'>
                <span className='text-2xl font-medium text-gray-900 title-font'>
                  {CURRANCY + item.price * item.quantity}
                </span>
                <button className='flex px-6 py-2 ml-auto text-white bg-pink-500 border-0 rounded focus:outline-none hover:bg-pink-600'>
                  Track
                </button>
              </div>
            </div>
            <Link href={`/product/${item.id}`}>
              <img
                alt='ecommerce'
                className='w-full max-w-xs transition-opacity cursor-pointer hover:opacity-80 '
                src={item.image}
                loading={'lazy'}
              />
            </Link>
          </div>
        </div>
      ))} */}
    </section>
  )
}

export default order
