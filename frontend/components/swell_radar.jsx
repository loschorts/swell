var React = require('react');
var Radar = require('react-chartjs').Radar;
var chartOptions = require('../util/chart_options');
var parseData = require('../util/chart_util').swellRadarData;

var SwellRadar = React.createClass({
	getInitialState: function(){
		return({
			data: parseData(this.props.data.swellDetail),
			options: chartOptions
		});
	},
	render: function(){
		return (
			<Radar data={this.state.data} options={this.state.options}/>
		);
	}
});

module.exports = SwellRadar;