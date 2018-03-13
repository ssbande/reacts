# counter App with redux

## Process

* npm i 
* npm start

## Description

**Webpack** webpack is a static module bundler for modern JavaScript applications
**Babel** Babel is a tool that helps you write code in the latest version of JavaScript.

## In File Descriptions 

There are mainly two types of components when you are dealing with React and Redux.

**Smart Component**
**Dumb Component**

Smart Component
The smart component is the kind of component, which directly interacts with the state of our application. It has access to the store and it can either dispatch the actions or get the current state of our application. It is the smart components because when the store is changed, by default, it subscribes the new state and changes the view according to it. In our application, there are three smart components.

 > Counter.js
 > AddCounter.js 
 > RemoveCounter.js
All these smart components are put in the containers folder, which I will create later in this article.
Container components only contain that components that are smart.

Dumb Component
 > App.js is the Dumb component, it includes the child component but, it does not interact the store. So we put that component inside components folder.

**Reducers** 
Reducers have to be a pure functions which do not mutate any store state, just take the old state value and add that old value plus new value and assign it to the variable and return the new state of our application. This is the central principle of Redux after all.

Function **mapDispatchToProps** is needed because we need to pass dispatch as a property to our component and also we need to bind the actions with this component.

**combineReducer** function as the name suggests to combine all reducers in one store and return as a global application state object.

Function **mapStateToProps** maps the state to the props of current component and shows the data as a property of the component.