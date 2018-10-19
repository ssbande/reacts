import React from 'react';
import { Link, Route } from 'react-router-dom';
import Product from './Product';
import '../contents/products.css';

const Products = ({ match }) => {
  const productsData = [
    {
      id: 1,
      name: 'NIKE Liteforce Blue Sneakers',
      description: 'Lorem ipsum dolor sit amet, NIKE Liteforce Blue Sneakers.',
      status: 'Available',
    },
    {
      id: 2,
      name: 'U.S. POLO ASSN. Slippers',
      description: 'Lorem ipsum dolor sit amet, U.S. POLO ASSN. Slippers',
      status: 'Available',
    },
    {
      id: 3,
      name: 'ADIDAS Adispree Running Shoes',
      description: 'Lorem ipsum dolor sit amet, ADIDAS Adispree Running Shoes.',
      status: 'Available',
    },
    {
      id: 4,
      name: 'Lee Cooper Mid Sneakers',
      description: 'Lorem ipsum dolor sit amet, Lee Cooper Mid Sneakers',
      status: 'Out of Stock',
    },
  ];
  const linkList = productsData.map(product => (
    <li key={product.id}>
      <Link to={`${match.url}/${product.id}`}>{product.name}</Link>
    </li>));

  return (
    <div className='productContainer'>
      <div className='productMenu'>
        <ul>
          {linkList}
        </ul>
      </div>
      <div className='productData'>
        <Route
          path={`${match.url}/:productId`}
          render={props => <Product data={productsData} {...props} />}
        />
        <Route
          exact
          path={match.url}
          render={() => (
            <div>Please select a product.</div>
          )}
        />
      </div>
    </div>
  );
};

export default Products;
