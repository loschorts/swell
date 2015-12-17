var React = require('react');

var Hello = React.createClass({
	render: function(){
		console.log('hello');
		return( 
		<div>
			Hello
		</div>
		);
	}
});

module.exports = Hello;