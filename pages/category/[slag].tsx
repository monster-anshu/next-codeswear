import Link from 'next/link'
import type { NextPage } from 'next'
import React from 'react'
import { GetServerSideProps } from 'next'
import { IProduct } from 'types'
import CURRANCY from 'helper/currancy'
import { connectOnce } from 'middleware/Mongo'
import { ProductActions } from 'utils/product'

interface Proptypes {
  products: IProduct[]
}

export const getServerSideProps: GetServerSideProps<Proptypes> = async (
  context
) => {
  const { slag } = context.query
  try {
    connectOnce()
    const products = await ProductActions.getProductByCategory(slag as string)
    const data = JSON.parse(JSON.stringify(products))
    return {
      props: {
        products: data,
      },
    }
  } catch (error) {
    return {
      props: {
        products: [],
      },
    }
  }
}

const Tshirts: NextPage<Proptypes> = ({ products }) => {
  return products.length ? (
    <div>
      <section className='text-gray-600 body-font'>
        <div className='container px-5 py-10 mx-auto'>
          <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-3'>
            {products.map((item, index) => (
              <div className='max-w-sm p-4 shadow-xl' key={index}>
                <Link href={`/product/${item.slag}`}>
                  <a className='relative block overflow-hidden rounded '>
                    <img
                      alt='ecommerce'
                      className='block object-contain object-center h-64 m-auto'
                      src={item.thumbnail}
                    />
                  </a>
                </Link>
                <div className='mt-4 text-center md:text-left '>
                  <h3 className='mb-1 text-xs tracking-widest text-gray-500 title-font'>
                    {item.category}
                  </h3>
                  <h2 className='text-lg font-medium text-gray-900 title-font'>
                    {item.title}
                  </h2>
                  <p className='mt-1'>
                    {CURRANCY}
                    {item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  ) : (
    <>'Not Found'</>
  )
}

export default Tshirts
