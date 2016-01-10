var React = require('react');

//Components
var SpotFocus = require('./spot_focus');
var SpotPreview = require('./spot_preview');
var Linkbox = require('./linkbox');

//Stores & Utils
var UserStore = require('../stores/user_store');
var UserAPIUtil = require('../util/user_api_util');
var SpotAPIUtil = require('../util/spot_api_util');

var Hello = React.createClass({

  // lifecycle methods
  getInitialState: function(){
    return({
      user: UserStore.nullUser()
    });
  },
  componentDidMount: function(){
    UserStore.addListener(this.updateUser);
    UserAPIUtil.fetchCurrentUser();
  },

  //listeners
  updateUser: function(){
    this.setState({
      user: UserStore.currentUser()
    });
  },

  //render
  render: function(){
    return(
      <div className="container hello">
        {this.home()}          
        {this.favorites()}
        {this.links()}
      </div>
      );
  },

  //render helpers
  home: function(){
    if (this.state.user.favorites.length < 1) { 
      return
    } else {
      return <SpotFocus spotId={this.state.user.favorites[0]}/>;
    }
  },
  favorites: function(){
    if (this.state.user.favorites.length < 2) {
      return;
    }
    return this.state.user.favorites.slice(1).map(function(spotId){
      return <SpotPreview spotId={spotId}/>
    });
  },
  links: function(){
    return [
    <Linkbox 
      history={this.props.history} 
      link={"/search"} 
      text={"Search for a Spot"}
    />


    ];
  }
});

module.exports = Hello;





