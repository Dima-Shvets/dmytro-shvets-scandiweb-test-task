import { Component } from "react";

import { gql } from "apollo-boost";
import { Query } from '@apollo/react-components';

const GET_PRODUCT = gql`
    query Category ($id: String!) {
        product (id: $id){
    id
    name
    inStock
    gallery
    description
    prices{
      currency{
        label
        symbol
      }
      amount
    }
    attributes{
      id
      name
      type
      items{
        displayValue
        value
        id
      }
    }
    brand
  }
}
    `

export class ProductDetailsView extends Component {

    render() {
        return (
            <Query
                query={GET_PRODUCT}
                variables={{id: "huarache-x-stussy-le"}}
            >
            {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;  
                    return (
                    <p>This is product details view</p>
                );
            }}
            </Query>
        )
    }
}