var React = require('react');
var LineChart = require("react-chartjs").Line;
var ChartOptions = require('../util/chart_options');
var TimeUtil = require('../util/time_util');


var WindChart = React.createClass({
	chartData: function(){
		var _labels = [];
		for (var i = 0 ; i < 24 ; i++) {
			_labels.push(TimeUtil.convert(i));
		}

		var _data = [];
		this.props.data.forEach(function(entry){
			_data.push(entry.speed_mph);
		});

		_chartData = {};
		_chartData.labels = _labels;
		_chartData.datasets = [
			{
			    label: "Swell",
			    fillColor: "rgba(0, 61, 255,0.2)",
			    strokeColor: "rgba(0, 24, 102,1)",
			    pointColor: "rgba(0, 24, 102,1)",
			    pointStrokeColor: "rgba(0, 24, 102,1)",
			    pointHighlightFill: "#fff",
			    highlightFill: "#fff",
			    pointHighlightStroke: "rgba(220,220,220,1)",
			    data: _data
			}
		];	
		return _chartData;
	},
	display: function(){
		if (!this.props || !this.props.data) {
			return <div/>;
		} else {
			return (
				<div>
					<LineChart 
						data={this.chartData()} 
						options={ChartOptions}
						height="300px"
						width="800px"/>
				</div>);
		}		
	},
	render: function(){
		return this.display();
	}
});

module.exports = WindChart;