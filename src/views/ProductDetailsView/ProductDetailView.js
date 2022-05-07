import { Component } from "react";

import { gql } from "apollo-boost";
import { Query } from "@apollo/react-components";
import { withRouter } from "react-router";

import parse from 'html-react-parser';

import AttributesButtons from "../../components/AttributesButtons";
import ImagesGallery from "../../components/ImagesGallery";

import s from "./ProductDetailsView.module.scss";

const GET_PRODUCT = gql`
  query Category($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      brand
    }
  }
`;

class ProductDetailsView extends Component {
  state = {
    selectedAttributes: {},
  };

  onButtonClick = ({ product }) => {
    const selectedAttributes = this.state.selectedAttributes;
    this.props.addToCart({ ...product, selectedAttributes, quantity: 1 });
  };

  updateSelectedAttributes = (newAttributes) => {
    this.setState((prevState) => ({
      selectedAttributes: { ...prevState.selectedAttributes, ...newAttributes },
    }));
  };

  setDefaultAttributes = (attributes) => {
    if (Object.keys(this.state.selectedAttributes).length === 0) {
      const defaultAttributes = attributes.reduce(
        (a, v) => ({ ...a, [v.name]: v.items[0].value }),
        {}
      );
      this.setState({ selectedAttributes: defaultAttributes });
    }
  };

  render() {
    const { updateSelectedAttributes, onButtonClick, setDefaultAttributes } =
      this;
    
    const { currency: selectedCurrency } = this.props;
    
    const { selectedAttributes } = this.state;

    const { productId } = this.props.match.params;
    return (
      <Query
        query={GET_PRODUCT}
        variables={{ id: productId }}
        onCompleted={(data) => {
          setDefaultAttributes(data.product.attributes);
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          const { product } = data;
          const selectedCurrencyPrice = product.prices.find(
            (price) => price.currency.label === selectedCurrency.label
          );

          return (
            <section className={s.section}>
              <ImagesGallery gallery={product.gallery} name={product.name} />
              <div className={s.contentWrapper}>
                <h2 className={s.title}>{product.brand}</h2>
                <p className={s.name}>{product.name}</p>
               {!product.inStock && <p>Out of stock</p>}
                {product.attributes && (
                  <AttributesButtons
                    type="view"
                    changeSelectedAttributes={updateSelectedAttributes}
                    attributes={product.attributes}
                    selectedAttributes={selectedAttributes}
                  />
                )}
                <div className={s.priceWapper}>
                  <h3 className={s.priceTitle}>Price:</h3>
                  <p className={s.priceText}>
                    {selectedCurrencyPrice.currency.symbol}
                    {selectedCurrencyPrice.amount}
                  </p>
                </div>
                <button
                  className={s.addBtn}
                  type="button"
                  disabled={!product.inStock}
                  onClick={() => onButtonClick(data)}
                >
                  Add to cart
                </button>
                <div className={s.description}>
                  {parse(product.description)} 
                </div>
              </div>
            </section>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(ProductDetailsView);
