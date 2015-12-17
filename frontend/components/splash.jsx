var React = require ('react');
var Navbar = require('./navbar');
var History = require('react-router').History;
var SignInForm = require('./sign_in_form');
var UserStore = require('../stores/user_store');

var Splash = React.createClass({
	getInitialState: function(){
		return {form: "", user: UserStore.currentUser()};
	},
	updateUser: function(){
		this.setState({user: UserStore.currentUser()});
	},
	componentDidMount: function(){
		UserStore.addListener(this.updateUser);
	},
	showForm: function(formName){
		this.props.history.push(formName);
	},
	goToMain: function(){
		this.props.history.push('hello');
	},
	render: function(){
		return (
				<div className="splash fullscreen">
					<Navbar history={this.props.history}/>
					<div className = "row">
						<img 
							onClick={this.goToMain}
							className="logo center-block" src="http://res.cloudinary.com/swell/image/upload/v1450301564/swell-logo_1_imizgd.png"/>
					</div>
					{this.props.children}
				</div>
		);
	}
});

module.exports = Splash;