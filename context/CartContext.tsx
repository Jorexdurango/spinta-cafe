'use client'

import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react'

const formatCOP = (value: number) =>
  `$COP ${new Intl.NumberFormat('es-CO').format(value)}`

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface CartState {
  items: CartItem[]
  discountCode: string
  customerName: string
  customerAddress: string
}

type CartAction =
  | { type: 'ADD'; item: Omit<CartItem, 'quantity'>; qty?: number }
  | { type: 'CHANGE_QTY'; id: string; delta: number }
  | { type: 'REMOVE'; id: string }
  | { type: 'SET_DISCOUNT'; code: string }
  | { type: 'SET_NAME'; value: string }
  | { type: 'SET_ADDRESS'; value: string }
  | { type: 'CLEAR' }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const qty = action.qty ?? 1
      const existing = state.items.find((l) => l.id === action.item.id)
      const items = existing
        ? state.items.map((l) =>
            l.id === action.item.id ? { ...l, quantity: l.quantity + qty } : l
          )
        : [...state.items, { ...action.item, quantity: qty }]
      return { ...state, items }
    }
    case 'CHANGE_QTY': {
      const items = state.items
        .map((l) =>
          l.id === action.id
            ? { ...l, quantity: Math.max(0, l.quantity + action.delta) }
            : l
        )
        .filter((l) => l.quantity > 0)
      return { ...state, items }
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter((l) => l.id !== action.id) }
    case 'SET_DISCOUNT':
      return { ...state, discountCode: action.code }
    case 'SET_NAME':
      return { ...state, customerName: action.value }
    case 'SET_ADDRESS':
      return { ...state, customerAddress: action.value }
    case 'CLEAR':
      return { ...state, items: [] }
    default:
      return state
  }
}

interface CartContextValue {
  items: CartItem[]
  cartCount: number
  cartSubtotal: number
  discount: number
  cartTotal: number
  discountCode: string
  customerName: string
  customerAddress: string
  cartOpen: boolean
  cartBumping: boolean
  toastMessage: string | null
  addToCart: (item: Omit<CartItem, 'quantity'>, qty?: number) => void
  changeQuantity: (id: string, delta: number) => void
  removeFromCart: (id: string) => void
  setDiscountCode: (code: string) => void
  setCustomerName: (v: string) => void
  setCustomerAddress: (v: string) => void
  setCartOpen: (open: boolean) => void
  sendWhatsApp: () => void
  formatCOP: (v: number) => string
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    discountCode: '',
    customerName: '',
    customerAddress: '',
  })
  const [cartOpen, setCartOpen] = useState(false)
  const [cartBumping, setCartBumping] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!toastMessage) return
    const t = setTimeout(() => setToastMessage(null), 2400)
    return () => clearTimeout(t)
  }, [toastMessage])

  const cartCount = useMemo(
    () => state.items.reduce((s, i) => s + i.quantity, 0),
    [state.items]
  )
  const cartSubtotal = useMemo(
    () => state.items.reduce((s, i) => s + i.price * i.quantity, 0),
    [state.items]
  )
  const isDiscountValid =
    state.discountCode.trim().toUpperCase() === 'ZORROCAFETERO'
  const discount = isDiscountValid ? Math.round(cartSubtotal * 0.1) : 0
  const cartTotal = cartSubtotal - discount

  const addToCart = useCallback(
    (item: Omit<CartItem, 'quantity'>, qty = 1) => {
      dispatch({ type: 'ADD', item, qty })
      setCartBumping(true)
      setToastMessage('¡Agregado al carrito!')
      setTimeout(() => setCartBumping(false), 450)
    },
    []
  )

  const changeQuantity = useCallback((id: string, delta: number) => {
    dispatch({ type: 'CHANGE_QTY', id, delta })
  }, [])

  const removeFromCart = useCallback((id: string) => {
    dispatch({ type: 'REMOVE', id })
  }, [])

  const setDiscountCode = useCallback((code: string) => {
    dispatch({ type: 'SET_DISCOUNT', code })
  }, [])

  const setCustomerName = useCallback((value: string) => {
    dispatch({ type: 'SET_NAME', value })
  }, [])

  const setCustomerAddress = useCallback((value: string) => {
    dispatch({ type: 'SET_ADDRESS', value })
  }, [])

  const sendWhatsApp = useCallback(() => {
    if (
      !state.customerName.trim() ||
      !state.customerAddress.trim() ||
      state.items.length === 0
    )
      return
    const lines = state.items
      .map(
        (item) =>
          `• ${item.name} x${item.quantity} — ${formatCOP(
            item.price * item.quantity
          )}`
      )
      .join('%0A')
    const discountLine =
      discount > 0
        ? `%0ADescuento (ZORROCAFETERO -10%): -${formatCOP(discount)}`
        : ''
    const message = `Hola SPINTA,%0A%0AQuiero hacer este pedido:%0A${lines}%0A%0ASubtotal: ${formatCOP(
      cartSubtotal
    )}${discountLine}%0ATotal: ${formatCOP(
      cartTotal
    )}%0A%0ANombre: ${encodeURIComponent(
      state.customerName.trim()
    )}%0ADirección en Medellín / Área Metropolitana: ${encodeURIComponent(
      state.customerAddress.trim()
    )}`
    window.open(
      `https://wa.me/573244122482?text=${message}`,
      '_blank',
      'noopener,noreferrer'
    )
  }, [state, discount, cartSubtotal, cartTotal])

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        cartCount,
        cartSubtotal,
        discount,
        cartTotal,
        discountCode: state.discountCode,
        customerName: state.customerName,
        customerAddress: state.customerAddress,
        cartOpen,
        cartBumping,
        toastMessage,
        addToCart,
        changeQuantity,
        removeFromCart,
        setDiscountCode,
        setCustomerName,
        setCustomerAddress,
        setCartOpen,
        sendWhatsApp,
        formatCOP,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
