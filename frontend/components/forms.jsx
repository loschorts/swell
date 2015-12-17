var React = require('react');

Forms = {};

Forms.signIn = React.createClass({
	render: function(){
		return "HELLO"
	}
});

// Forms.signIn = React.createClass({
// 	getInitialState: function(){
// 		return {username:"", password: ""};
// 	},
// 	try: function(e){
// 		e.preventDefault();
// 		$.ajax({
// 			url: '/session/create',
// 			data: {user: this.state},
// 			success: function(data){
// 				console.log(data)
// 			}
// 		});
// 	},
// 	render: function(){
// 		return(
// 			<div>
// 				<h4>Sign In </h4>
// 				<form onSubmit={this.try}>
					
// 					<label for="username">Username</label>
// 					<input 
// 						id="username" 
// 						type="text"
// 						valueLink={this.linkState('username')}/>

// 					<label for="password">Password</label>
// 					<input 
// 						id="password" 
// 						type="text"
// 						valueLink={this.linkState('password')}/>
// 				</form>
// 			</div>
// 		);
// 	}
// });

// Forms.signUp = React.createClass({
// 	getInitialState: function(){
// 		return {user:"", pw: ""};
// 	},
// 	render: function(){
// 		return(
// 			<div class="form">
// 				<h4>Sign Up </h4>
// 				<form onSubmit={this.krequestSignUp}>
// 					<label for="username">Username</label>
// 					<input id="username" type="text"/>

// 					<label for="password">Password</label>
// 					<input id="passsword" type="password"/>

// 					<input type="submit"/>
// 				</form>
// 			</div>
// 		);
// 	}
// });

module.exports = Forms;