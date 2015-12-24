//Dependencies
var React = require('react');
var ReactDom = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;

// Components
var App = require('./components/app');
var Splash = require('./components/splash');
var Hello = require('./components/hello');
var Navbar = require('./components/navbar');
var SignInForm = require('./components/sign_in_form');
var SignUpForm = require('./components/sign_up_form');
var Forecast = require('./components/forecast');
var Test = require('./components/test');
var Search = require('./components/search');
var County = require('./components/county');
var Region = require('./components/region');

var routes = (
    <Route path="/" component={App}>
    	 <IndexRoute component={Splash}/>
        <Route path="splash" component={Splash}>
         	<Route path="sign-in" component={SignInForm}/>
         	<Route path="sign-up" component={SignUpForm}/>
        </Route>
    	<Route path="hello" component={Hello}/>
      <Route path="forecast/:spotId" component={Forecast}/>
      <Route path="test" component={Test}/>
      <Route path="search" component={Search}/>
      <Route path="county/:id" component={County}/>
      <Route path="region/:id" component={Region}/>
    </Route>
);

document.addEventListener('DOMContentLoaded', function(){
  ReactDom.render(
    <Router>{routes}</Router>,
    document.getElementById('root')
  );
});

