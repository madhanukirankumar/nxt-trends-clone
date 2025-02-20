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
                <button>Checkout</button>
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
