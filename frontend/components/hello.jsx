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
  userInfo: function(){
		return( <div> 
              <h3> Hello, {this.state.user.username || "Stranger"} </h3>
              <h3> ID: {this.state.user.id} </h3>
              <h3> Favorites: {this.showFavorites()} </h3>
            </div>);
  },
  showFavorites: function(){
    return this.spotNames(this.state.user.favorites);
  },
  spotNames: function(array){
    if (array.length === 0){
      return [];
    }
    var names = [];
    array.forEach(function(spot){
      names.push(spot.name);
    });
    return names;
  },
  renderHome: function(){
    
    if (this.state.user.favorites.length === 0) {
      return;
    }
    return <SpotFocus spot={this.state.user.favorites[0]}/>
  },
  renderFavorites: function(){
    if (this.state.user.favorites.length < 2) {
      return;
    }
    var _favorites = this.state.user.favorites.slice(1, this.length);
    var result = _favorites.map(function(fav){
      return (<SpotPreview spot={fav}/>);
    });
    return (<div className="feature-box">{result}</div>);
  },
  render: function(){
    return(
      <div id="hello"> 
        <HelloNavbar history={this.props.history}/>
        {this.userInfo()}
        {this.renderHome()}
        {this.renderFavorites()}
      </div>
    );
  }
});

module.exports = Hello;





