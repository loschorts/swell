var React = require('react');

var SpotFocus = React.createClass({
	render: function(){
		return (
			<div className="spot-focus">

				<div className="highlight">{this.props.name}</div>
				<div className="highlight">{this.props.quality}</div>

				<div className="detail">{this.props.forecast.wind}</div>
				<div className="detail">{this.props.forecast.wave_height}</div>
				<div className="detail">{this.props.forecast.tide}</div>
				
				<div className="detail mini">{this.props.forecast.air_temp}</div>
				<div className="detail mini">{this.props.forecast.water_temp}</div>
			</div>
		);
	}
});

module.exports = SpotFocus;