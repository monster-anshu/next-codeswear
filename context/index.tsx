import React, { createContext, useState, useEffect, useRef } from 'react'
import { IContext, ICartItem, IProduct } from 'types'

export const Context = createContext<IContext>({})

export const Provider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<ICartItem[]>([])

  const addToCart: IContext['addToCart'] = (product) => {
    setCart((curr) => {
      let counter = 0
      const already = curr.map((item) => {
        if (item.id === product.id) {
          counter--
          return { ...item, quantity: item.quantity + 1 }
        }
        counter++
        return item
      })
      if (counter < curr.length) return already
      return curr.concat({ ...product, quantity: 1, varient: 'red' })
    })
  }

  const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  const clearCart = () => {
    setCart([])
    localStorage.removeItem('cart')
  }

  const removeFromCart: IContext['removeFromCart'] = (product) => {
    if (!cart.some((item) => item.id === product.id)) return
    setCart((curr) => {
      if (product.quantity === 1)
        return curr.filter((item) => item.id !== product.id)
      return curr.map((item) => {
        if (item.id === product.id)
          return { ...item, quantity: item.quantity - 1 }
        return item
      })
    })
  }

  useEffect(() => {
    if (!cart.length) return
    saveCart()
  }, [cart])

  useEffect(() => {
    try {
      const local = localStorage.getItem('cart')
      if (!local) return
      const savedCart = JSON.parse(local)
      setCart(savedCart)
    } catch (error) {
      clearCart()
    }
  }, [])

  const value: IContext = {
    addToCart,
    removeFromCart,
    clearCart,
    cart,
  }
  return <Context.Provider value={value}>{children}</Context.Provider>
}
