var React = require('react');
var Radar = require('react-chartjs').Radar;

var SwellRadar = React.createClass({
	stringify: function(){
		return JSON.stringify(this.props);
	},
	render: function(){
		return <div>{this.stringify()}</div>
	}
});

module.exports = SwellRadar;