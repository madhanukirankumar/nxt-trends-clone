import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    //   TODO: Update the code here to implement addCartItem
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state

    const updatedCartList = cartList.map(each => {
      if (id === each.id) {
        return {...each, quantity: each.quantity + 1}
      } else {
        return each
      }
    })
    this.setState({cartList: updatedCartList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state

    const productItem = cartList.filter(eachProd => {
      if (id === eachProd.id) {
        return true
      }
    })
    const isQuantOne = productItem[0].quantity === 1
    if (isQuantOne) {
      //remove product from list
      const updatedCartList = cartList.filter(each => {
        if (id !== each.id) {
          return true
        }
      })
      this.setState({cartList: updatedCartList})
    } else {
      const updatedCartList = cartList.map(each => {
        if (id === each.id) {
          return {...each, quantity: each.quantity - 1}
        } else {
          return each
        }
      })
      this.setState({cartList: updatedCartList})
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(each => {
      if (id !== each.id) {
        return true
      }
    })
    this.setState({cartList: updatedCartList})
  }

  updateQuantity = (product, quant) => {
    // console.log(product)
    // console.log(quantity)
    const {cartList} = this.state
    //  console.log(cartList)
    const updatedCartList = cartList.map(each => {
      if (product.id === each.id) {
        // console.log(each.quantity)
        return {...each, quantity: each.quantity + quant}
      } else {
        return each
      }
    })
    this.setState({cartList: updatedCartList})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          removeAllCartItems: this.removeAllCartItems,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          updateQuantity: this.updateQuantity,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
