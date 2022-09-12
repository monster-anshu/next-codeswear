import { Context } from 'context'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect, useRef } from 'react'
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
} from 'react-icons/ai'
import { BsBagCheck } from 'react-icons/bs'
import { MdAccountCircle } from 'react-icons/md'
import { ProductCatgories } from 'types'

const Navbar: React.FC = ({}) => {
  const { clearCart, cart, addToCart, removeFromCart } = useContext(Context)

  const sidebarRef = useRef<HTMLDivElement>(null)

  const toggleCart = () => {
    const item = sidebarRef?.current?.classList
    if (!item) return
    if (item.contains('translate-x-full')) {
      item.remove('translate-x-full')
      item.add('translate-x-0')
      return
    }
    item.remove('translate-x-0')
    item.add('translate-x-full')
  }

  return (
    <nav className='sticky top-0 z-10 flex flex-col items-center justify-center bg-white md:flex-row md:justify-start '>
      <div className='logo'>
        <Image src={'/logo.png'} height={40} width={200} />
      </div>
      <div className='nav'>
        <ul className='flex space-x-6 font-bold'>
          {ProductCatgories.map((item, index) => (
            <Link href={`/category/${item}`} key={index}>
              <a>
                <li>{item}</li>
              </a>
            </Link>
          ))}
        </ul>
      </div>
      <div className='absolute right-0 flex gap-3 mx-4 '>
        <button>
          <Link href={'/login'}>
            <a>
              <MdAccountCircle className='text-xl cursor-pointer md:text-2xl ' />
            </a>
          </Link>
        </button>
        <button onClick={toggleCart}>
          <a>
            <AiOutlineShoppingCart className='text-xl cursor-pointer md:text-2xl ' />
          </a>
        </button>
      </div>
      <div
        className='sidecart absolute top-0 right-0 bg-pink-200 py-10 px-8 transition-transform translate-x-full w-72 z-10 h-[100vh] '
        ref={sidebarRef}
      >
        <h2 className='text-xl font-bold text-center '>Shopping Cart</h2>
        <button className='absolute top-5 right-5 ' onClick={toggleCart}>
          <AiFillCloseCircle className='text-xl cursor-pointer ' />
        </button>

        {cart?.length ? (
          <>
            <ul className='font-bold list-decimal '>
              {cart.map((item, index) => (
                <li key={index}>
                  <div className='flex my-5 item'>
                    <div className='w-2/3 font-semibold '>{item.title}</div>
                    <div className='flex items-center justify-center w-1/3 space-x-2 font-semibold '>
                      <AiOutlineMinusCircle
                        className='text-2xl cursor-pointer '
                        onClick={() => removeFromCart?.(item)}
                      />
                      <span>{item.quantity}</span>
                      <AiOutlinePlusCircle
                        className='text-2xl cursor-pointer '
                        onClick={() => addToCart?.(item)}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className='flex gap-3 '>
              <Link href={'/checkout'} passHref>
                <button className='flex items-center flex-1 px-1 py-4 text-sm text-white bg-pink-500 border-0 rounded focus:outline-none hover:bg-pink-600'>
                  <BsBagCheck className='mx-2' />
                  Checkout
                </button>
              </Link>
              <button
                className='flex items-center flex-1 px-1 py-4 text-sm text-white bg-pink-500 border-0 rounded focus:outline-none hover:bg-pink-600'
                onClick={() => clearCart?.()}
              >
                Clear Chart
              </button>
            </div>
          </>
        ) : (
          <p className='mt-4 text-center'>Your Cart is Empty</p>
        )}
      </div>
    </nav>
  )
}

export default Navbar
