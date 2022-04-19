import './App.css';
import { Component } from 'react';
import { gql } from "apollo-boost";
import { ApolloProvider } from '@apollo/react-hooks';
import { Query } from '@apollo/react-components';
import { Switch, Route } from 'react-router-dom';
import ApolloClient from 'apollo-boost';

import  CategoryView  from './views/CategoryView.js';
import  ProductDetailsView  from './views/ProductDetailsView/ProductDetailView';
import AppHeader from './components/AppHeader';
import { Redirect } from 'react-router-dom';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
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
  categories{
    name
  }
}
    `


class App extends Component {
  state = {
    currency: "",
    cart: []
  }

  setCurrency = (currency) => {
    this.setState({currency})
  }

  addToCart = (product) => {
    const productInTheCart = this.state.cart.find(item => item.id === product.id);

    if (productInTheCart) {
      console.log(`Product ${product.name} is already in the cart`)
      return
    }
    this.setState((prevState)=>({cart: [...prevState.cart, product]}))
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Query
                query={CATEGORIES}>
            {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;
              const { categories } = data
              
              return (
                <div>
                  <AppHeader categories={categories} setCurrency={this.setCurrency}/> 
                  <Switch>
                    <Route path="/" exact>
                      <Redirect to={categories[0].name}/>
                    </Route>
                  {categories.map(({ name }) => (
                    <Route path={`/${name}`} key={name}>
                      <CategoryView title={name} currency={this.state.currency}/>
                    </Route>))}
                    <Route path={"/:productId"}>
                      <ProductDetailsView addToCart={this.addToCart} currency={this.state.currency}/>
                    </Route>
                  </Switch>
                </div>
              );
              }}
          </Query>
        </div>
      </ApolloProvider>
    );
  };
}

export default App;
