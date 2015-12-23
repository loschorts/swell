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
		return <div className="widget">
			<h4>Wind</h4>
			<PolarArea data={this.state.data} options={this.state.options}/>
		</div>
	}
});

module.exports = WindPolar;