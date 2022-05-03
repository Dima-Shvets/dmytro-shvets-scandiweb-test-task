import { Component } from "react";

import { gql } from "apollo-boost";
import { Query } from "@apollo/react-components";

import { ReactComponent as CartIcon } from "./cart-icon.svg";

import ProductCard from "../../components/ProductCard";

import s from "./CategoryView.module.scss";

const GET_CATEGORY = gql`
  query Category($title: String!) {
    category(input: { title: $title }) {
      products {
        id
        name
        gallery
        inStock
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
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;

export default class CategoryView extends Component {
  state = {
    products: [],
  };

  addToCart = (id) => {
    const product = this.state.products.find((product) => product.id === id);
    const selectedAttributes = this.setDefaultAttributes(product.attributes);
    this.props.addToCart({ ...product, quantity: 1, selectedAttributes });
  };

  setDefaultAttributes = (attributes) => {
    const defaultAttributes = attributes.reduce(
      (a, v) => ({ ...a, [v.name]: v.items[0].value }),
      {}
    );
    return defaultAttributes;
  };

  setButtonStyle = (id) => {
    const cardText = document.querySelector(`#${id}`);
    if (cardText) {
      return cardText.getBoundingClientRect().height;
    }
  };

  render() {
    const { title, currency } = this.props;
    const { addToCart, setButtonStyle } = this;
    return (
      <section className={s.CategoryView}>
        <h2 className={s.title}>{title}</h2>
        <Query
          query={GET_CATEGORY}
          variables={{ title }}
          onCompleted={(data) => {
            this.setState({ products: data.category.products });
          }}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            return (
              <ul className={s.cardContainer}>
                {data.category.products.map((product) => (
                  <li key={product.id} className={s.card}>
                    <ProductCard
                      product={product}
                      currency={currency}
                      addToCart={this.addToCart}
                    />
                    <button
                      style={{ bottom: `${setButtonStyle(product.id) + 12}px` }}
                      className={s.cartBtn}
                      onClick={() => addToCart(product.id)}
                    >
                      <CartIcon />
                    </button>
                  </li>
                ))}
              </ul>
            );
          }}
        </Query>
      </section>
    );
  }
}
