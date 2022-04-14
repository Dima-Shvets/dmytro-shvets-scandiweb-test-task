import { Component } from "react";

import { gql } from "apollo-boost";
import { Query } from '@apollo/react-components';

const GET_CATEGORY = gql`
    query Category ($title: String!) {
        category (input: {title: $title} ){
    name
  }
}
    `

export class CategoryView extends Component {
    
    render() {
        console.log(this.props)
        return (
            <p>{this.props.title}</p>
        )
    }
}