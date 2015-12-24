var React = require('react');
var Search = require('./search')

var County = React.createClass({
	componentDidMount: function({

	}),
	render: function(){
		return <h1>{this.props.params.id}</h1>
	}

});

module.exports = County;