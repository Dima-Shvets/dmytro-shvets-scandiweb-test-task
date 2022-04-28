import "./App.css";
import { Component } from "react";
import { gql } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { Query } from "@apollo/react-components";
import { Switch, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";

import Container from "./components/Container";
import CategoryView from "./views/CategoryView.js";
import ProductDetailsView from "./views/ProductDetailsView/ProductDetailView";
import AppHeader from "./components/AppHeader";
import { Redirect } from "react-router-dom";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
});

// client
//   .query({
//     query: gql`
//       {
//   categories{
//     name
//   }
// }
//     `
//   })
//   .then(result => console.log(result));

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
    this.setState(({ cart }) => {
      const filteredCart = cart.filter((product) => product.id !== id);
      console.log(filteredCart);
      const product = cart.find((product) => product.id === id);
      product.selectedAttributes = {
        ...product.selectedAttributes,
        ...changedAttribute,
      };
      return { cart: [...filteredCart, product] };
    });
    // this.setState(prevState => ({
    //   cart: prevState.cart.map(
    //     product => product.id === id ? {product, selectedAttributes: changedAttribute} : product
    //   )
    // }))
  };

  quantityIncrement = (id) => {
    this.setState(prevState => ({
      cart: prevState.cart.map(
        product => product.id === id ? {...product, quantity: product.quantity + 1 } : product)
      
    }))
  }

  quantityDecrement = (id) => {
    this.setState(prevState => ({
      cart: prevState.cart.map(
        product => product.id === id ? {...product, quantity: product.quantity - 1 } : product)
      
    }))
  }


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
                  setCurrency={setCurrency}
                  cartOpen={cartOpen}
                  toggleCart={toggleCart}
                  cart={cart}
                  currency={currency}
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
                      <CategoryView title={name} currency={currency} />
                    </Route>
                  ))}

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
