import { Component } from "react";

import { gql } from "apollo-boost";
import { Query } from '@apollo/react-components';

import  ProductCard  from "../../components/ProductCard";

const GET_CATEGORY = gql`
    query Category ($title: String!) {
        category (input: {title: $title} ){
    products {
      id
      name
      gallery
      prices{
        currency{
          label
          symbol
        }
        amount
      }
    }
  }
}
    `

export default class CategoryView extends Component {
    
    render() {       
        const { title } = this.props;
        return (
            <Query
                query={GET_CATEGORY}
                variables={{title}}
            >
            {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;  
                return data.category.products.map((product) => (
                    <ProductCard key={product.id} product={product}/>
                ));
            }}
        </Query>
        )
    }
}