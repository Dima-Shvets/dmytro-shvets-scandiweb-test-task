import './App.css';
import { Component } from 'react';
import { gql } from "apollo-boost";
import { ApolloProvider } from '@apollo/react-hooks';
import { Query } from '@apollo/react-components';
import { Switch, Route } from 'react-router-dom';
import ApolloClient from 'apollo-boost';

import { Navigation } from './components/Navigations';
import { CategoryView } from './views/CategoryView.js';

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
          
          <Navigation />
          <Switch>
          <Query
                query={CATEGORIES}>
            {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;
                data.categories.map(({ name }) => {
                  console.log(name)
                  return (
                    <Route path={`${name}`} exact>
                    <CategoryView title={name}/>
                    </Route>
                  )
                })
                       
                
            }}
                </Query>
          
        </Switch>
        </div>
      </ApolloProvider>
    );
  };
}

export default App;
