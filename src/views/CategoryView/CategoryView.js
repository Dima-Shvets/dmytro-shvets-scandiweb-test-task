import { Component } from "react";

import { Query } from "@apollo/react-components";

import { ReactComponent as CartIcon } from "./cart-icon.svg";

import { GET_CATEGORY } from "../../graphql/queries";

import ProductCard from "../../components/ProductCard";

import s from "./CategoryView.module.scss";


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

  render() {
    const { title, currency } = this.props;
    const { addToCart} = this;
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
                    {product.inStock &&
                      <button
                        className={s.cartBtn}
                        onClick={() => addToCart(product.id)}
                      >
                        <CartIcon />
                      </button>}
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
