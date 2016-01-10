var React = require('react');
var LineChart = require('react-chartjs').Line;
var TimeUtil = require('../../util/time_util');
var ChartOptions = require('../../util/chart_options');

var SwellChart = React.createClass({
	setData: function(swellFull, swellIdx) {

		var _labels = [];
		for (var i = 0 ; i < 24 ; i++) {
			_labels.push(TimeUtil.convert(i));
		}

		var _data = [];
		swellFull.forEach(function(hour){
			_data.push(hour[swellIdx].hs);
		});

		chartData = {};
		chartData.labels = _labels;
		chartData.datasets = [
			{
			    label: "Swell #" + swellIdx,
			    fillColor: "rgba(220,220,220,0.2)",
			    strokeColor: "rgba(220,220,220,1)",
			    pointColor: "rgba(220,220,220,1)",
			    pointStrokeColor: "#fff",
			    pointHighlightFill: "#fff",
			    pointHighlightStroke: "rgba(220,220,220,1)",
			    data: _data
			}
		];

		return chartData;
	},
	getInitialState: function(){
		return ({
			chartData: this.setData(this.props.data, 0),
			chartOptions: ChartOptions
		});
	},
	render: function(){
    return <LineChart data={this.state.chartData} options={this.state.chartOptions} width="600" height="250"/>
	}
});