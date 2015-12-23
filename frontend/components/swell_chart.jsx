var React = require('react');
var LineChart = require("react-chartjs").Line;
var ChartOptions = require('../util/chart_options');
var TimeUtil = require('../util/time_util');


var SwellChart = React.createClass({
	chartData: function(){
		var _labels = [];
		for (var i = 0 ; i < 24 ; i++) {
			_labels.push(TimeUtil.convert(i));
		}

		var _data = [];
		this.props.swellData.forEach(function(entry){
			_data.push(entry[0].hs);
		});

		_chartData = {};
		_chartData.labels = _labels;
		_chartData.datasets = [
			{
			    label: "Swell",
			    fillColor: "rgba(220,220,220,0.2)",
			    strokeColor: "rgba(220,220,220,1)",
			    pointColor: "rgba(220,220,220,1)",
			    pointStrokeColor: "#fff",
			    pointHighlightFill: "#fff",
			    pointHighlightStroke: "rgba(220,220,220,1)",
			    data: _data
			}
		];	
		return _chartData;
	},
	display: function(){
		if (!this.props || !this.props.swellData) {
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

module.exports = SwellChart;