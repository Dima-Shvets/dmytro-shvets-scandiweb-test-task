import { Component } from "react";
import { gql } from "apollo-boost";
import { Query } from '@apollo/react-components';
import { NavLink } from 'react-router-dom';

const CATEGORIES = gql`
      {
  categories{
    name
  }
}
    `

export class Navigation extends Component {

    render() {
        return(
            <nav>
              <Query query={CATEGORIES}>
            {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;
                        
                return data.categories.map(({ name }) => (
                    <NavLink key={ name } to={`/${name}`}>{name}</NavLink>
                ));
            }}
                </Query> 
           </nav>
        )
    }
}