var React = require('react');
var linkedState = require('react-addons-linked-state-mixin');

var LinkBox = require('./linkbox');

var Search = React.createClass({
	mixins: [linkedState],
	getInitialState: function(){
		return {
			query: this.props.query || "",
			terms: {}
		};
	},
	componentDidMount: function(){
		this.getTerms();
	},
	getTerms: function(){
		var self = this;
		$.ajax({
			url: '/api/search-terms',
			type: 'get',
			success: function(data){
				self.setState({terms: data});
			}
		});
	},
	results: function(){
		if (!this.state.terms) {return;}
		var _results = [];
		for (var term in this.state.terms)
			if (term.toLowerCase().includes(this.state.query.toLowerCase())){
				_results.push(
					<div className="col-md-3">
						<LinkBox history={this.props.history} 
						text={term} 
						link={this.state.terms[term]}/>
					</div>
				);
			}
		return _results;
	},
	render: function(){
		return(
			<div className="container">
				<div className="centered">
					<h3>Search: </h3>
					<input className="search-field" valueLink={this.linkState('query')}/>
				</div>
				<div className="row featurebox">
					{this.results()}
				</div>
			</div>
		);

	}

});

module.exports = Search;