var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var UserAPIUtil = require('../util/user_api_util');

var SignInForm = React.createClass({
	mixins: [LinkedStateMixin],
	getInitialState: function(){
		return {username:"", password: ""};
	},
	login: function(e){
		e.preventDefault();
		UserAPIUtil.login(this.state);

	},
	render: function(){
		return(
			<div>
				<h4>Sign In</h4>
				<form onSubmit={this.login}>
					
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

module.exports = SignInForm;