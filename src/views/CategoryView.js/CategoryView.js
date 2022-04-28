import { Component } from "react";

import { gql } from "apollo-boost";
import { Query } from "@apollo/react-components";

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
  render() {
    const { title, currency } = this.props;
    return (
      <section className={s.CategoryView}>
        <h2 className={s.title}>{title}</h2>
        <Query query={GET_CATEGORY} variables={{ title }}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            return (
              <ul className={s.wrapper}>
                {data.category.products.map((product) => (
                  <li key={product.id} className={s.card}>
                    <ProductCard
                      product={product}
                      currency={currency}
                    />
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
