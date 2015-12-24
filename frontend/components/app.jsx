var React = require('react');
var UserStore = require('../stores/user_store');
var HelloNavbar = require('./hello_navbar');

var App = React.createClass({
	render: function(){
		return <div>
		<div className="container"><div className="row"><HelloNavbar history={this.props.history}/></div></div>
		{this.props.children}
		</div>
	}
});

module.exports = App;