var React = require('react');
var SpotFocus = require('./spot_focus');

var Test = React.createClass({
	render: function(){
		return (<SpotFocus spotId={15}/>);
	}
});

module.exports = Test;