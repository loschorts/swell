var React = require('react');
var UserStore = require('../stores/user_store');

var App = React.createClass({
	render: function(){
		return <div>{this.props.children}</div>
	}
});

module.exports = App;