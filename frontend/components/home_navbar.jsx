var React = require('react');
var UserStore = require('../stores/user_store');
var UserAPIUtil = require('../util/user_api_util');


var HomeNavbar = React.createClass({
  getInitialState: function(){
    return ({user: UserStore.currentUser()});
  },
  componentDidMount: function(){
    UserStore.addListener(this.updateUser);
  },
  updateUser: function(){
    this.setState({user: UserStore.currentUser()});
  },
  guestLogin: function(e){
    e.preventDefault();
    UserAPIUtil.guestLogin();
  },
  newUser: function(e){
    e.preventDefault();
    this.props.history.push('splash/sign-up');
  },
  signIn: function(e){
    e.preventDefault();
    this.props.history.push('splash/sign-in');
  },
  signOut: function(e){
    e.preventDefault()
    UserAPIUtil.logout();
  },
  logToggle: function(){
    if (this.state.user.username === null || 
        typeof this.state.user === 'undefined') {
      return <li><a onClick={this.signIn} href="/users/sign-in">Sign In</a></li>;
    } else {
      return <li><a onClick={this.signOut} href="/sign-out">Sign Out</a></li>;
    }
  },
  render: function(){
    return(
          <div className="container-fluid">
            <div className="navbar-header navbar-right">
              <ul className="nav navbar-nav">

                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                    <img src="http://res.cloudinary.com/swell/image/upload/c_scale,h_71/v1450302743/--logo_2_a32kqk.png"/>

                  </a>
                  <ul className="dropdown-menu">
                      <li><a 
                      href="#">Customize Me!!!</a></li>
                    <li><a 
                      onClick={this.guestLogin}
                      href="/guest-login">Sign in as Guest</a></li>
                    <li><a 
                      onClick={this.newUser}
                      href="/users/new">Create Account</a></li>
                    {this.logToggle()}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
    );
  }
});

module.exports = HomeNavbar;





