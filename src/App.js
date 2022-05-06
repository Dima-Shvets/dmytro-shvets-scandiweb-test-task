import "./App.css";
import { Component } from "react";
import { gql } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { Query } from "@apollo/react-components";
import { Switch, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";

import { v4 as uuidv4 } from "uuid";

import Container from "./components/Container";
import CategoryView from "./views/CategoryView";
import ProductDetailsView from "./views/ProductDetailsView";
import NotFoundView from "./views/NotFoundView";
import CartView from "./views/CartView";
import AppHeader from "./components/AppHeader";
import { Redirect } from "react-router-dom";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
});

const CATEGORIES = gql`
  {
    categories {
      name
    }
  }
`;

class App extends Component {
  state = {
    currency: {},
    cart: [],
    cartOpen: false,
  };

  setCurrency = (currency) => {
    this.setState({ currency });
  };

   deleteProduct = (cartId) => {
    this.setState((prevState) => ({
      cart: prevState.cart.filter((product) => product.cartId !== cartId),
    }));
  };

  quantityIncrement = (cartId) => {
    this.setState((prevState) => ({
      cart: prevState.cart.map((product) =>
        product.cartId === cartId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      ),
    }));
  };

  quantityDecrement = (cartId) => {
    const product = this.state.cart.find((product) => product.cartId === cartId);
    if (product.quantity === 1) {
      this.deleteProduct(cartId);
    }
    this.setState((prevState) => ({
      cart: prevState.cart.map((product) => {
        return product.cartId === cartId
          ? { ...product, quantity: product.quantity - 1 }
          : product;
      }),
    }));
  };

 

   shallowEqual = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }
  return true;
}

  addToCart = (newProduct) => {
    // const productInTheCart = this.state.cart.find(
    //   (item) => item.id === newProduct.id
    // );
    const productsInTheCart = this.state.cart.filter(
      (item) => item.id === newProduct.id
    ); 

    if (productsInTheCart.length > 0) {
      
      productsInTheCart.forEach(product => {
        if (this.shallowEqual(product.selectedAttributes, newProduct.selectedAttributes)) {
        this.quantityIncrement(product.cartId);
        return
      }
      this.setState(({ cart }) => ({ cart: [...cart, { ...newProduct, cartId: uuidv4() }] }))
      return
      })
    }
    this.setState(({cart}) => ({ cart: [...cart, {...newProduct, cartId:uuidv4()}] }));
  };

  toggleCart = () => {
    this.setState(({ cartOpen }) => ({ cartOpen: !cartOpen }));
  };

  changeSelectedAttributes = (changedAttribute, id) => {
    this.setState((prevState) => ({
      cart: prevState.cart.map((product) =>
        product.cartId === id
          ? {
              ...product,
              selectedAttributes: {
                ...product.selectedAttributes,
                ...changedAttribute,
              },
            }
          : product
      ),
    }));
  };

  

  calculateCartQuantity = (cart) => {
    return cart.reduce((a, v) => a + v.quantity, 0);
  };

  render() {
    const {
      setCurrency,
      toggleCart,
      addToCart,
      changeSelectedAttributes,
      quantityIncrement,
      quantityDecrement,
    } = this;

    const { cartOpen, currency, cart } = this.state;

    const cartQuantity = this.calculateCartQuantity(cart);

    return (
      <ApolloProvider client={client}>
        <Query query={CATEGORIES}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            const { categories } = data;
            return (
              <Container>
                <AppHeader
                  categories={categories}
                  cartOpen={cartOpen}
                  cart={cart}
                  cartQuantity={cartQuantity}
                  currency={currency}
                  toggleCart={toggleCart}
                  setCurrency={setCurrency}
                  changeSelectedAttributes={changeSelectedAttributes}
                  quantityIncrement={quantityIncrement}
                  quantityDecrement={quantityDecrement}
                />
                <Switch>
                  <Route path="/" exact>
                    <Redirect to={categories[0].name} />
                  </Route>

                  {categories.map(({ name }) => (
                    <Route path={`/${name}`} key={name} exact>
                      <CategoryView
                        title={name}
                        currency={currency}
                        addToCart={addToCart}
                      />
                    </Route>
                  ))}

                  {categories.map(({ name }) => (
                    <Route path={`/${name}/:productId`} key={name} exact>
                      <ProductDetailsView
                        addToCart={addToCart}
                        currency={currency}
                      />
                    </Route>
                  ))}

                  <Route path={"/cart"}>
                    <CartView
                      cart={cart}
                      cartQuantity={cartQuantity}
                      currency={currency}
                      changeSelectedAttributes={changeSelectedAttributes}
                      quantityIncrement={quantityIncrement}
                      quantityDecrement={quantityDecrement}
                    />
                  </Route>
                  <Route>
                    <NotFoundView />
                  </Route>
                </Switch>
              </Container>
            );
          }}
        </Query>
      </ApolloProvider>
    );
  }
}

export default App;
