import React, { useContext, useState } from 'react'
import { IAddress } from 'types'
import Loader from 'components/Loader'
import { Context } from 'context'
import ReviewCart from 'components/ReviewCart'
import AddressFiller from 'components/AddressFiller'
import CURRANCY from 'helper/currancy'
import { NextPage } from 'next'

const tableCols = ['Product', 'Price', 'Quantity', 'Subtotal']

const checkout: NextPage = () => {
  const { cart, addToCart, removeFromCart } = useContext(Context)

  const [details, setDetails] = useState<IAddress>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  })

  const [loading, setLoading] = useState(false)

  const handleLoadingChange = (state: boolean) => {
    setLoading(state)
  }

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  > = ({ target }) => {
    const { value, name } = target
    const keys = Object.keys(details)
    if (!keys.includes(name)) return
    setDetails((curr) => ({ ...curr, [name]: value }))
  }

  const totalPrice = cart?.reduce((pre, curr) => pre + curr.price, 0)

  return (
    <div className='px-4 mx-auto lg:px-16 md:px-8 '>
      {loading && <Loader />}
      <h1 className='text-3xl font-bold text-center'>Checkout</h1>
      <AddressFiller
        details={details}
        onLoadingChange={handleLoadingChange}
        onValueChange={handleChange}
      />
      <ReviewCart
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />
      <hr />

      <div className='max-w-5xl mx-auto mt-16 overflow-hidden '>
        <table className='min-w-full border '>
          <thead className='border-b bg-slate-50 '>
            <tr>
              {tableCols.map((item, index) => (
                <th
                  scope='col'
                  className='px-6 py-4 text-sm font-medium text-center text-gray-900 '
                  key={index}
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cart?.map((item, index) => (
              <tr className='border-b' key={index}>
                <td className='flex flex-wrap items-center gap-6 px-6 py-4 text-sm font-medium text-center text-gray-900 whitespace-nowrap '>
                  <button>
                    <img
                      src='https://upload.wikimedia.org/wikipedia/commons/8/8f/Flat_cross_icon.svg'
                      alt=''
                      height={20}
                      width={20}
                    />
                  </button>
                  <img
                    src={item.thumbnail}
                    className='object-contain text-center w-14 h-14'
                  />
                  {item.title}
                </td>
                <td className='px-6 py-4 text-sm font-light text-center text-gray-900 whitespace-nowrap'>
                  {CURRANCY + item.price}
                </td>
                <td className='px-6 py-4 text-sm font-light text-center text-gray-900 whitespace-nowrap '>
                  <div className='flex justify-center gap-3 border rounded bg-slate-100 border-slate-100 '>
                    <button onClick={() => removeFromCart?.(item)}>-</button>
                    <p className='px-3 py-1 bg-white '>{item.quantity}</p>
                    <button onClick={() => addToCart?.(item)}>+</button>
                  </div>
                </td>
                <td className='px-6 py-4 text-sm font-light text-center text-gray-900 whitespace-nowrap'>
                  {CURRANCY + item.quantity * item.price}
                </td>
              </tr>
            ))}
            <tr className='border-b'>
              <td className='px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap'>
                <input
                  className='w-full p-2 border outline-none max-w-[200px] '
                  placeholder='Coupon code'
                  type={'text'}
                />
                <button className='px-3 py-2 mx-2 font-medium text-white bg-pink-500 rounded '>
                  APPLY COUPON
                </button>
              </td>
              <td
                className='px-6 py-4 text-sm font-light text-pink-900 whitespace-nowrap'
                colSpan={2}
              >
                <span className='text-lg font-medium '>Total : </span>
                <span className='text-xl font-semibold '>
                  {CURRANCY + totalPrice}
                </span>
              </td>
              <td>
                <button className='px-3 py-2 mx-2 font-medium text-white uppercase bg-pink-500 rounded '>
                  Checkout
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default checkout
