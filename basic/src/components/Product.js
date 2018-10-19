import React from 'react';
import PropTypes from 'prop-types';
import '../contents/products.css';

const Product = ({ match, data }) => {
  const product = data.find(p => p.id === Number(match.params.productId));
  let productData;

  if (product) {
    productData = (
      <div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <hr />
        <h4>{product.status}</h4>
        {' '}
      </div>
    );
  } else productData = <h2> Sorry. Product doesnt exist </h2>;

  return (
    <div className='productRightContainer'>
      <div className='productData'>
        {productData}
      </div>
    </div>
  );
};

Product.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      productId: PropTypes.string,
    }),
  }).isRequired,
};

export default Product;
