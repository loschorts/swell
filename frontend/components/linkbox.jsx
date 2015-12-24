var React = require('react');

var Linkbox = React.createClass({
	go: function(){
		this.props.history.push(this.props.link);
	},
	render: function(){
		return (
			<div className="linkbox widget" onClick={this.go}>
				<h1>{this.props.text}</h1>
			</div>
			);
	}

});

module.exports = Linkbox;