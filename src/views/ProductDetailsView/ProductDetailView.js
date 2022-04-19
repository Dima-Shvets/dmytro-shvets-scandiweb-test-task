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
  state = {
        selectedAttributes: {},
    };

  onButtonClick = (data) => {
    const selectedAttributes = this.getSelectedAttributes();
    this.props.addToCart({...data, selectedAttributes})
  }

  updateSelectedAttributes = (updatedAttributes) => {
    this.setState({selectedAttributes: updatedAttributes})
  }

  render() {
    const { currency: selectedCurrency } = this.props;

    const { productId } = this.props.match.params;
        return (
            <Query
                query={GET_PRODUCT}
            variables={{ id: productId }}
            onCompleted={({product})=>(this.setDefaultAttributes(product.attaributes))}
            >
            {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
              if (error) return <p>Error :(</p>; 
              
              const { product } = data;
              const selectedCurrencyPrice = product.prices.find(price => (price.currency.label === selectedCurrency))

              return (
                <>
                  <ImagesGallery gallery={product.gallery} name={product.name}/>
                  <div>
                    <h2>{product.brand}</h2>
                    <p>{product.name}</p>
                    <AttributesButtons 
                    updateSelectedAtributes={this.updateAttributes} attributes={product.attributes}/>
                    <div>
                      <h3>Price</h3>
                      <p><span>{selectedCurrencyPrice.currency.symbol}</span>{selectedCurrencyPrice.amount}</p>
                    </div>
                    <button type="button" onClick={() => (this.onButtonClick(data))}>Add to cart</button>
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