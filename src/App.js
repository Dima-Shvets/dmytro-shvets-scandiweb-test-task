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
                  <AppHeader categories={categories}/> 
                <Switch>
                  {categories.map(({ name }) => (
                    <Route path={`/${name}`} key={name}>
                      <CategoryView title={name} />
                    </Route>))}
                    <Route path={"/:productId"}>
                      <ProductDetailsView/>
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
