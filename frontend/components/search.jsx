var React = require('react');
var linkedState = require('react-addons-linked-state-mixin');

var Search = React.createClass({
	mixins: [linkedState],
	getInitialState: function(){
		return {
			query: ""
		};
	},
	componentWillMount: function(){

	},
	result: function(){

	},
	render: function(){
		return(
			<div>
			<input valueLink={this.linkState('query')}/>
			{this.state.query}
			</div>
		);
	}

});

module.exports = Search;