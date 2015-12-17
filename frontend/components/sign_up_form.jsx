var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var APIUtil = require('../util/api_util');

var SignUpForm = React.createClass({
	mixins: [LinkedStateMixin],
	getInitialState: function(){
		return {username:"", password: ""};
	},
	createUser: function(e){
		e.preventDefault();
		APIUtil.createUser(this.state);

	},
	render: function(){
		return(
			<div>
				<h4>Sign Up</h4>
				<form onSubmit={this.createUser}>
					
					<label for="username">Username</label>
					<input 
						id="username" 
						type="text"
						valueLink={this.linkState('username')}/>

					<label for="password">Password</label>
					<input 
						id="password" 
						type="password"
						valueLink={this.linkState('password')}/>
					<input type="submit"/>
				</form>
			</div>
		);
	}
});

module.exports = SignUpForm;