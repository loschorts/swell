var React = require('react');
var Search = require('./search');
var Linkbox = require('./linkbox');

var County = React.createClass({
	componentDidMount: function(){

		var self = this;
		$.ajax({
			url: 'api/counties/' + self.props.params.id + '/spots/',
			type: 'GET',
			success: function(data){
				self.setState({spots: data});
			}
		})
	},
	formatResponse: function(){
		var result = [];
		var self = this;
		this.state.spots.forEach(function(spot){
			result.push(
				<div className="col-md-3">
					<Linkbox history={self.props.history} text={spot.name} link={'/forecast/' + spot.id}/>
				</div>);
		});
		return result;
	},
	render: function(){
		if (!this.state || !this.state.spots) {
			return <div>Loading</div>
		} else {
			return <div className="container">{this.formatResponse()}</div>;
		}

	}
});

module.exports = County;