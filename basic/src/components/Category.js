import React from 'react';
import { Link, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../contents/category.css';

const Category = ({ match }) => (
  <div className='categoryContainer'>
    <div className='categoryMenu'>
      <ul>
        <li>
          <Link to={`${match.url}/shoes`}>Shoes</Link>
        </li>
        <li>
          <Link to={`${match.url}/boots`}>Boots</Link>
        </li>
        <li>
          <Link to={`${match.url}/footwear`}>Footwear</Link>
        </li>
      </ul>
    </div>
    <div>
      <Route
        path={`${match.path}/:name`}
        render={p => (<h3>{p.match.params.name}</h3>)}
      />
    </div>
  </div>
);

Category.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      productId: PropTypes.string,
    }),
    url: PropTypes.string,
    path: PropTypes.string,
  }).isRequired,
};

export default Category;
