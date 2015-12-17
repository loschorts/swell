var React = require('react');

var SpotPreview = React.createClass({
	render: function(){
		return (
			<div className="spot-detail">
				<div className="highlight">{this.props.name}</div>
				<div className="detail">{this.props.quality}</div>
				<div className="detail mini">{this.props.forecast.wave_height}</div>
			</div>
		);
	}
});

module.exports = SpotPreview;