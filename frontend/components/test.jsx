var React = require('react');
var SpotPreview = require('./spot_preview');

var Test = React.createClass({
	render: function(){
		return (<SpotPreview spotId={15}/>);
	}
});

module.exports = Test;