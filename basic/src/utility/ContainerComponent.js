import React from 'react';
import { Link, Route } from 'react-router-dom';

const ContainerComponent = ({ component: RouteComponent, ...rest }) => (
  <div>
    <nav className='header'>
      <ul className='nav'>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/category'>Category</Link></li>
        <li><Link to='/products'>Products</Link></li>
        <li><Link to='/admin'>Admin</Link></li>
      </ul>
    </nav>
    <Route
      {...rest}
      render={props => <RouteComponent {...props} />}
    />
  </div>
);

export default ContainerComponent;
