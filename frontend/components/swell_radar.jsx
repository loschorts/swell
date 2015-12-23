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
			<div className="widget">
				<h4>Swell</h4>
				<Radar data={this.state.data} options={this.state.options}/>
			</div>
		);
	}
});

module.exports = SwellRadar;