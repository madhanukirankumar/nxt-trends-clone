import React from 'react'

import Popup from 'reactjs-popup'

import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      console.log(cartList)
      const cartListLen = cartList.length
      let tempTotalAmount = 0
      cartList.map(each => {
        tempTotalAmount = tempTotalAmount + each.price * each.quantity
      })
      console.log(tempTotalAmount)

      // TODO: Update the functionality to remove all the items in the cart

      const removeAllButt = () => {
        removeAllCartItems()
      }

      const onConfirmOrder = () => {}

      const onCheckOut = () => {
        console.log('========')
        return (
          <Popup
            modal
            trigger={open => (
              <button className="button">
                Trigger - {open ? 'Opened' : 'Closed'}
              </button>
            )}
            position="right center"
            closeOnDocumentClick
          >
            <span> Popup content </span>
          </Popup>
        )
      }

      // <p>Your order has been placed successfully</p>
      // <p>{tempTotalAmount}</p>
      // <p>{cartListLen}</p>

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button onClick={removeAllButt}>Remove All</button>
                <CartListView />
                <h1>Order Total: Rs {tempTotalAmount}/-</h1>
                <p>{cartListLen} Items in cart</p>

                <Popup
                  modal
                  trigger={open => <button className="button">Checkout</button>}
                  position="right center"
                  closeOnDocumentClick
                >
                  <div className="pop-up">
                    <label htmlFor="sell">Select Payment Method:</label>
                    <select id="sell" className="indi">
                      <option disabled={true}>Card</option>
                      <option disabled={true}>Net Banking</option>
                      <option disabled={true}>UPI</option>
                      <option disabled={true}>Wallet</option>
                      <option disabled={false}>Cash on Delivery</option>
                    </select>
                    <p className="para1">
                      <span className="summ">Summary:</span>
                      No.of items: {cartListLen} <br />
                      Total Bill Amount: {tempTotalAmount}
                    </p>
                    <button className="indi" onClick={onConfirmOrder}>
                      Confirm Order
                    </button>
                  </div>
                </Popup>
                {/* TODO: Add your code for Cart Summary here */}
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
