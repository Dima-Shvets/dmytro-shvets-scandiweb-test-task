import { Component } from "react";

import { gql } from "apollo-boost";
import { Query } from '@apollo/react-components';

const GET_ALL = gql`
      {
  category (input: {title: "all"} ){
    name
  }
}
    `

export class AllView extends Component {

    render() {
        
        return (
            <Query query={GET_ALL}>
            {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;
                        
                console.log(data)
            }}
                </Query>
        )
    }
}