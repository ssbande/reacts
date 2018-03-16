# Login and Registration App with Redux

npm i -S history react react-dom react-redux react-router-dom redux redux-logger redux-thunk
<br/>
npm i -D babel-core babel-loader babel-preset-es2015 babel-preset-react babel-preset-stage-3 html-webpack-plugin path webpack webpack-dev-server webpack-cli

## Project Structure
All source code for the React + Redux tutorial app is located in the /src folder. Inside the src folder there is a folder per feature (App, HomePage, LoginPage, RegisterPage) and a bunch of folders for non-feature code that can be shared across different parts of the app (_actions, _components, _constants, _helpers, _reducers, _services).

I prefixed non-feature folders with an underscore "_" to group them together and make it easy to distinguish between features and non-features, it also keeps the project folder structure shallow so it's quick to see everything at a glance from the top level and to navigate around the project.

The index.js files in each folder are barrel files that group all the exported modules together so they can be imported using the folder path instead of the full module path and to enable importing multiple modules in a single import (e.g. import { userActions, alertActions } from '../_actions').

## Private route component 
The react private route component renders a route component if the user is logged in, otherwise it redirects the user to the /login page.

The way it checks if the user is logged in is by checking that there is a user object in local storage. While it's possible to bypass this check by manually adding an object to local storage using browser dev tools, this would only give access to the client side component, it wouldn't give access to any real secure data from the server api because a valid authentication token (JWT) is required for this.

//http://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example