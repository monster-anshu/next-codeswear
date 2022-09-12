import axios from 'axios'
import React, { useState } from 'react'
import { IAddress, IPostOffice } from 'types'

interface Proptypes {
  details?: IAddress
  onValueChange?: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >
  onLoadingChange?: (state: boolean) => void
}

const AddressFiller: React.FC<Proptypes> = ({
  details,
  onValueChange,
  onLoadingChange,
}) => {
  const [PostOffices, setPostOffices] = useState<IPostOffice[]>([])
  const fetchByPincode = () => {
    onLoadingChange?.(true)
    axios
      .get(`https://api.postalpincode.in/pincode/${details?.pincode}`)
      .then(({ data }) => {
        const { PostOffice } = data[0] as { PostOffice?: IPostOffice[] }
        if (!PostOffice?.length) return
        setPostOffices(PostOffice)
      })
      .catch((err) => console.warn(err))
      .finally(() => {
        onLoadingChange?.(false)
      })
  }
  const States = Array.from(new Set(PostOffices.map((item) => item.State)))
  const Cities = Array.from(new Set(PostOffices.map((item) => item.Name)))

  return (
    <div className='flex flex-wrap max-w-2xl gap-2 p-6 mx-auto mt-8 rounded-md box'>
      <h2 className='w-full text-xl text-center '>Delivery Details</h2>
      <div className='flex-1'>
        <label htmlFor='name' className='text-sm leading-7 text-gray-600'>
          Name
        </label>
        <input
          type='text'
          id='name'
          name='name'
          className='w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
          onChange={onValueChange}
          value={details?.name}
        />
      </div>
      <div className='flex-1'>
        <label htmlFor='email' className='text-sm leading-7 text-gray-600'>
          Email
        </label>
        <input
          type='email'
          id='email'
          name='email'
          className='w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
          onChange={onValueChange}
          value={details?.email}
        />
      </div>
      <div className='w-full'>
        <label htmlFor='address' className='text-sm leading-7 text-gray-600'>
          Address
        </label>
        <textarea
          id='address'
          name='address'
          rows={2}
          className='w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
          onChange={onValueChange}
          value={details?.address}
        />
      </div>
      <div className='flex-1'>
        <label htmlFor='phone' className='text-sm leading-7 text-gray-600'>
          Phone
        </label>
        <input
          type={'tel'}
          id='phone'
          name='phone'
          className='w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
          onChange={(e) => {
            const reg = /^[0-9]*$/g
            if (reg.test(e.target.value)) onValueChange?.(e)
          }}
          value={details?.phone}
        />
      </div>

      <div className='flex-1'>
        <label htmlFor='pincode' className='text-sm leading-7 text-gray-600'>
          Pincode
        </label>
        <div className='flex items-center gap-1'>
          <input
            type={'text'}
            id='pincode'
            name='pincode'
            className='w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
            onChange={onValueChange}
            value={details?.pincode}
          />
          <button className='cursor-pointer' onClick={fetchByPincode}>
            check
          </button>
        </div>
      </div>
      <div className='w-full'>
        <label htmlFor='state' className='text-sm leading-7 text-gray-600'>
          State
        </label>
        <select
          id='state'
          disabled={!States.length}
          name='state'
          className={[
            'w-full  rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out',
            !States.length ? 'bg-gray-200' : 'bg-white',
          ].join(' ')}
          value={details?.state}
          onChange={onValueChange}
          placeholder='State'
        >
          <option value={''}>Select State</option>

          {States.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className='w-full'>
        <label htmlFor='city' className='text-sm leading-7 text-gray-600'>
          City
        </label>
        <select
          id='city'
          disabled={!Cities.length}
          name='city'
          className={[
            'w-full  rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out',
            !Cities.length ? 'bg-gray-200' : 'bg-white',
          ].join(' ')}
          value={details?.city}
          onChange={onValueChange}
        >
          <option value={''}>Select City</option>
          {Cities.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default AddressFiller
