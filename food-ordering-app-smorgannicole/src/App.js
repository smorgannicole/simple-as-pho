import { useState, useRef, useEffect } from 'react'
import './App.scss'
import Menu from './components/Menu'
import Order from './components/Order'
import Header from './components/Header'
import Footer from './components/Footer'
import ReactModal from 'react-modal'
import chicken from './img/chicken.png'
import beef from './img/beef.png'
import tofu from './img/tofu.png'
import shrimp from './img/shrimp.png'
import beefIngred from './img/beef-ingred.jpg'
import tofuIngred from './img/tofu-ingred.jpg'
import chickIngred from './img/chicken-ingred.jpg'
import shrimpIngred from './img/shrimp-ingred.jpg'
import Blurb from './components/Blurb'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const App = () => {
  const [orderAdd, setOrderAdd] = useState([])
  const [total, setTotal] = useState('0.00')
  const [cartOpen, setCartOpen] = useState(false)
  const [numCartItems, setNumCartItems] = useState(0)
  const cartRef = useRef(null)

  ReactModal.setAppElement('#root')
  const menu = [
    { item: 'Chicken Pho', price: 14, img: chicken, ingredientImg: chickIngred },
    { item: 'Beef Pho', price: 16, img: beef, ingredientImg: beefIngred },
    { item: 'Shrimp Pho', price: 15, img: shrimp, ingredientImg: shrimpIngred },
    { item: 'Tofu Pho', price: 13, img: tofu, ingredientImg: tofuIngred },
  ]

  const handleOrderAdd = (index) => {
    const plateObj = menu[index]
    setOrderAdd((prevOrderAdd) => {
      const newOrderAdd = [...prevOrderAdd, plateObj]
      calcTotal(newOrderAdd)
      return newOrderAdd
    })
    setNumCartItems(numCartItems + 1)
  }
  
  const calcTotal = (updatedOrderAdd) => {
    let price = updatedOrderAdd.reduce((total, currentVal) => total + currentVal.price, 0)
    let priceTax = (price * 0.075) + price
    const dollarFormat = priceTax.toFixed(2)
    setTotal(dollarFormat)
  }
  
  const handleDelete = (index) => {
    if (orderAdd.length === 1) {
      setOrderAdd([])
      setTotal('0.00')
    } else {
      const price = orderAdd[index].price
      let priceTax = (price * 0.075) + price
      const newTotal = (total - priceTax).toFixed(2)
      setTotal(newTotal)
      const newOrderAdd = [
        ...orderAdd.slice(0, index),
        ...orderAdd.slice(index + 1)
      ]
      setOrderAdd(newOrderAdd)
    }
    if (numCartItems > 0) {
      setNumCartItems(numCartItems - 1)
    }
  }

  const toggleCart = () => {
    setCartOpen(prevCartOpen => !prevCartOpen)
  }
  
  const handleDocumentClick = (event) => {
    if (
      event.target.classList.contains('cart-icon') ||
      (event.target.parentNode && event.target.parentNode.classList.contains('cart-icon'))
    ) {
      return
    }
    if (cartRef.current && (cartRef.current.contains(event.target) ||
        event.target.classList.contains('cart-toggle'))
    ) {
      return
    }
    setCartOpen(false)
  }
  
  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick)
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick)
    }
  }, [])
  
  return (
    <>
      <div className='page-wrapper'>
        <button className="cart-toggle" onClick={toggleCart}>
          <div className={numCartItems > 0 ? 'num-cart-items' : ''}>{numCartItems > 0 ? numCartItems : ''}</div>
          <FontAwesomeIcon className='cart-icon' icon={faShoppingCart} size="sm" />
        </button>
        <div ref={cartRef} className={`sidebar ${cartOpen ? 'open' : ''}`}>
          <button className="close-cart" style={{ cursor: 'pointer' }} onClick={() => setCartOpen(false)}>X</button>
          <h2 className='mb-1'>Shopping Cart</h2>
          {orderAdd.map((foodObj, index) => {
            return <Order foodObj={foodObj} key={index} index={index} calcTotal={calcTotal} handleDelete={handleDelete} />
          })}
          <p style={{ fontWeight: 600 }}>Total: ${total}</p>
        </div>
        <div className='row'>
          <div className="left-col">
            <Header />
            <Blurb />
          </div>
          <div className="right-col">
            {menu.map((plate, index) => {
              return <Menu plate={plate} key={index} index={index} handleOrderAdd={handleOrderAdd} />
            })}
          </div>
        </div>
        <Footer />
      </div>
    </>
    )
  }

  export default App