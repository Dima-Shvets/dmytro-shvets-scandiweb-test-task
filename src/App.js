import "./App.css";
import { Component } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { Query } from "@apollo/react-components";
import { Switch, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";

import { v4 as uuidv4 } from "uuid";

import { GET_CATEGORIES } from "./graphql/queries";

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

class App extends Component {
  state = {
    currency: {},
    cart: [],
  };

  setCurrency = (currency) => {
    this.setState({ currency });
  };

  addProduct = (newProduct) => {
    this.setState(({ cart }) => ({
      cart: [...cart, { ...newProduct, cartId: uuidv4() }],
    }));
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
    const product = this.state.cart.find(
      (product) => product.cartId === cartId
    );
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

  checkEqualAttributes = (attributes1, attributes2) => {
    const keys1 = Object.keys(attributes1);
    const keys2 = Object.keys(attributes2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (let key of keys1) {
      if (attributes1[key] !== attributes2[key]) {
        return false;
      }
    }
    return true;
  };

  addToCart = (newProduct) => {
    const productsInTheCart = this.state.cart.filter(
      (item) => item.id === newProduct.id
    );

    if (productsInTheCart.length > 0) {
      let existingProduct = false;
      for (const product of productsInTheCart) {
        const check = this.checkEqualAttributes(
          product.selectedAttributes,
          newProduct.selectedAttributes
        );

        if (check) {
          this.quantityIncrement(product.cartId);
          existingProduct = true;
          break;
        }
      }

      if (!existingProduct) {
        this.addProduct(newProduct);
      }
      return;
    }

    this.addProduct(newProduct);
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
      addToCart,
      changeSelectedAttributes,
      quantityIncrement,
      quantityDecrement,
    } = this;

    const { currency, cart } = this.state;

    const cartQuantity = this.calculateCartQuantity(cart);

    return (
      <ApolloProvider client={client}>
        <Query query={GET_CATEGORIES}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            const { categories } = data;
            return (
              <Container>
                <AppHeader
                  categories={categories}
                  cart={cart}
                  cartQuantity={cartQuantity}
                  currency={currency}
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
