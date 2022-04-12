import logo from './logo.svg';
import './App.css';
import { gql } from "apollo-boost";
import { ApolloProvider } from '@apollo/react-hooks';
import { Query } from '@apollo/react-components';

import ApolloClient from 'apollo-boost';
const client = new ApolloClient({
  uri: 'http://localhost:4000/',
});

client
  .query({
    query: gql`
      {
  categories{
    name
    products {
      name
    }
  }
}
    `
  })
  .then(result => console.log(result));

const CATEGORIES = gql`
      {
  categories{
    name
    products {
      name
    }
  }
}
    `

function App() {
  return (
    <ApolloProvider client={client}>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        </header>
        <Query
    query={CATEGORIES}
  >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return data.categories[0].products.map(({ name }) => (
              <div key={name}>
                <p>
                  {name}
                </p>
              </div>
            ));
          }}
  </Query>
    </div>  
    </ApolloProvider>
  );
}

export default App;
