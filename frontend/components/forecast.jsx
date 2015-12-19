var React = require('react');

//Components
var HelloNavbar = require('./hello_navbar');
var SpotFocus = require('./spot_focus');
var SpotPreview = require('./spot_preview');

//Stores & Utils
var UserStore = require('../stores/user_store');
var SpotStore = require('../stores/spot_store');
var UserAPIUtil = require('../util/user_api_util');
var SpotAPIUtil = require('../util/spot_api_util');

var Hello = React.createClass({
  getInitialState: function(){
    return ({
      user: UserStore.currentUser(),
    });
  },
  componentDidMount: function(){
    UserStore.addListener(this.updateUser);
  },
  updateUser: function(){
    this.setState({user: UserStore.currentUser()});

  },
  render: function(){
    return(
      <div id="hello"> 
        <HelloNavbar history={this.props.history}/>
        <SpotFocus spot={this.props.spot}/>
      </div>
    );
  }
});

module.exports = Hello;





