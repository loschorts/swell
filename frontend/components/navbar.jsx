var React = require('react');
var UserStore = require('../stores/user_store');

var Navbar = React.createClass({
  getInitialState: function(){
    return ({user: {username: "fff"}});
  },
  componentDidMount: function(){
    UserStore.addListener(this.updateUser);
  },
  updateUser: function(){
    this.setState({user: UserStore.currentUser()});
  },
  guestLogin: function(e){
    e.preventDefault();
    console.log("IMPLEMENT GUEST LOGIN");
  },
  newUser: function(e){
    e.preventDefault();
    this.props.history.push('sign-up');
  },
  signIn: function(e){
    e.preventDefault();
    this.props.history.push('sign-in');
  },
  signOut: function(e){
    e.preventDefault()
    console.log("implement signout");
  },
  render: function(){
    return(
      <div className="row">
          <h1>{this.state.user.username}</h1>
        <nav className="navbar ">
          <div className="container-fluid">
            <div className="navbar-header navbar-right">
              <ul className="nav navbar-nav">
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                    <img src="http://res.cloudinary.com/swell/image/upload/c_scale,h_71/v1450302743/--logo_2_a32kqk.png"/>

                  </a>
                  <ul className="dropdown-menu">
                    <li><a 
                      onClick={this.guestLogin}
                      href="/guest-login">Guest Account</a></li>
                    <li><a 
                      onClick={this.newUser}
                      href="/users/new">New</a></li>
                    <li><a 
                      onClick={this.signIn}
                      href="/users/sign-in">Sign In</a></li>
                    <li><a 
                      onClick={this.signOut}
                      href="/sign-out">Sign Out</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
});

module.exports = Navbar;





