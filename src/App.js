import "./App.css";
import { Component } from "react";
import { gql } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { Query } from "@apollo/react-components";
import { Switch, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";

import Container from "./components/Container";
import CategoryView from "./views/CategoryView/index.js";
import ProductDetailsView from "./views/ProductDetailsView/ProductDetailView";
import CartView from "./views/CartView";
import AppHeader from "./components/AppHeader";
import { Redirect } from "react-router-dom";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
});


// add portal for dropdowns
// change paths for router
// check code for refactoring needs 
// add opportunity to add goods with different attributes

const CATEGORIES = gql`
  {
    categories {
      name
    }
  }
`;

class App extends Component {
  state = {
    currency: "",
    cart: [],
    cartOpen: false,
  };

  setCurrency = (currency) => {
    this.setState({ currency });
  };

  addToCart = (product) => {
    const productInTheCart = this.state.cart.find(
      (item) => item.id === product.id
    );

    if (productInTheCart) {
      console.log(`Product ${product.name} is already in the cart`);
      return;
    }
    this.setState((prevState) => ({ cart: [...prevState.cart, product] }));
  };

  toggleCart = () => {
    this.setState(({ cartOpen }) => ({ cartOpen: !cartOpen }));
  };

  // NEED TO CHANGE TO MAP

  changeSelectedAttributes = (changedAttribute, id) => {
    this.setState((prevState) => ({
      cart: prevState.cart.map((product) =>
        product.id === id
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

  quantityIncrement = (id) => {
    this.setState((prevState) => ({
      cart: prevState.cart.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      ),
    }));
  };

  quantityDecrement = (id) => {
    this.setState((prevState) => ({
      cart: prevState.cart.map((product) => {
        if (product.quantity === 1) {
          return product;
        }
        return product.id === id
          ? { ...product, quantity: product.quantity - 1 }
          : product;
      }),
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
                    <Route path={`/${name}`} key={name}>
                      <CategoryView
                        title={name}
                        currency={currency}
                        addToCart={addToCart}
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

                  <Route path={"/:productId"}>
                    <ProductDetailsView
                      addToCart={addToCart}
                      currency={currency}
                    />
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
