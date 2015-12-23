var React = require('react');
var PolarArea = require('react-chartjs').PolarArea;
var chartOptions = require('../util/chart_options');
var parseData = require('../util/chart_util').windPolarData;


var WindPolar = React.createClass({
	getInitialState: function(){
		return {
			data: parseData(this.props.data.windDetail),
			options: chartOptions
		};
	},
	stringify: function(){
		return JSON.stringify(this.props);
	},
	render: function(){
		return <PolarArea data={this.state.data} options={this.state.options}/>
	}
});

module.exports = WindPolar;