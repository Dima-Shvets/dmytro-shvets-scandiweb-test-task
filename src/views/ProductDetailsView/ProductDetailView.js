import { Component } from "react";

import { gql } from "apollo-boost";
import { Query } from '@apollo/react-components';
import { withRouter } from "react-router";

import AttributesButtons from "../../components/AttributesButtons";
import ImagesGallery from "../../components/ImagesGallery";

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

class ProductDetailsView extends Component {
  

  render() {
    const { productId } = this.props.match.params;
        return (
            <Query
                query={GET_PRODUCT}
                variables={{id: productId}}
            >
            {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
              if (error) return <p>Error :(</p>; 
              
              const { product } = data;

              console.log(data)
              return (
                <>
                  <ImagesGallery gallery={product.gallery} name={product.name}/>
                  <div>
                    <h2>{product.brand}</h2>
                    <p>{product.name}</p>
                    <AttributesButtons attributes={product.attributes}/>
                    <div>
                      <h3>Price</h3>
                      <p><span>{product.prices[0].currency.symbol}</span>{product.prices[0].amount}</p>
                    </div>
                    <button>Add to cart</button>
                    <div dangerouslySetInnerHTML={{__html: product.description} }/>
                  </div>
                  </>
                );
            }}
            </Query>
        )
    }
}

export default withRouter(ProductDetailsView)