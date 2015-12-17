var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var UserAPIUtil = require('../util/user_api_util');

var SignUpForm = React.createClass({
	mixins: [LinkedStateMixin],
	getInitialState: function(){
		return {username:"", password: ""};
	},
	createUser: function(e){
		e.preventDefault();
		UserAPIUtil.createUser(this.state);
		this.props.history.push('hello')
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