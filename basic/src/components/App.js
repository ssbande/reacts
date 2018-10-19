import React, { Component } from 'react';
import {
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import Home from './Home';
import Category from './Category';
import Products from './Products';
import Login from './Login';
import Admin from './Admin';
import PrivateRoute from '../utility/PrivateRoute';
import NoMatch from './NoMatch';
import '../contents/main.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      isValidRoute: true,
    };

    this.setIsValidRoute = this.setIsValidRoute.bind(this);
  }

  setIsValidRoute(val) {
    this.setState({
      isValidRoute: val,
    });
  }

  render() {
    return (
      <div>
        {this.state.isValidRoute
          && (
            <nav className='header'>
              <ul className='nav'>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/category'>Category</Link></li>
                <li><Link to='/products'>Products</Link></li>
                <li><Link to='/admin'>Admin</Link></li>
              </ul>
            </nav>
          )
        }

        <div className='container'>
          <Switch>
            <Route path='/login' component={Login} />
            <Route
              exact
              path='/'
              render={props => (
                <Home
                  {...props}
                  setIsValidRoute={this.setIsValidRoute}
                />
              )}
            />
            <Route path='/category' component={Category} />
            <PrivateRoute path='/admin' component={Admin} />
            <Route path='/products' component={Products} />
            <Route
              render={props => (
                <NoMatch {...props} setIsValidRoute={this.setIsValidRoute} />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
