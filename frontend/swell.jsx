var React = require('react');
var ReactDom = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;

var App = require('./components/app');

var routes = (
    <Route path="/" component={App}>
    	<Route path="animals" component={App}/>
    </Route>
);

document.addEventListener('DOMContentLoaded', function(){
  ReactDom.render(
    <Router>{routes}</Router>,
    document.getElementById('root')
  );
});

