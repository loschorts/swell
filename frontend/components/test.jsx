var React = require('react');
var LineChart = require("react-chartjs").Line;
var chartOptions = require('../util/chart_options');

chartData = {};
chartData.labels = ["a", "b", "c", "d"];
chartData.datasets = [
        {
            label: "LABEL",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [0,1,2,3]
        }
];

var Test = React.createClass({
  render: function() {
    return <LineChart data={chartData} options={chartOptions} width="600" height="250"/>
  }
});

module.exports = Test;