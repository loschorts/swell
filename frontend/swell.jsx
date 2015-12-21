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

var routes = (
    <Route path="/" component={Test}>
    	 <IndexRoute component={Splash}/>
        <Route path="splash" component={Splash}>
         	<Route path="sign-in" component={SignInForm}/>
         	<Route path="sign-up" component={SignUpForm}/>
        </Route>
    	<Route path="hello" component={Hello}/>
      <Route path="forecast" component={Forecast}/>
    </Route>
);

document.addEventListener('DOMContentLoaded', function(){
  ReactDom.render(
    <Router>{routes}</Router>,
    document.getElementById('root')
  );
});

