var React = require('react');

//Components
var SpotFocus = require('./spot_focus');
var SpotPreview = require('./spot_preview');
var Linkbox = require('./linkbox');

//Stores & Utils
var UserStore = require('../stores/user_store');
var SpotStore = require('../stores/spot_store');
var UserAPIUtil = require('../util/user_api_util');
var SpotAPIUtil = require('../util/spot_api_util');

var Hello = React.createClass({
  // lifecycle events
  getInitialState: function(){
    return({
      user: UserStore.nullUser()
    });
  },
  componentDidMount: function(){
    UserStore.addListener(this.updateUser);
    SpotStore.addListener(this.updateHome);
    UserAPIUtil.fetchCurrentUser();
  },

  //listeners
  updateUser: function(){
    this.setState({
      user: UserStore.currentUser()
    });
  },
  updateHome: function(){
    if (this.state.user.favorites.length < 1) {return;}
    this.setState({
      home: SpotStore.getSpot(this.state.user.favorites[0])
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
      return <SpotFocus 
        spotId={this.state.user.favorites[0]}
        history={this.props.history}
      />;
    }
  },
  favorites: function(){
    var self = this;
    if (this.state.user.favorites.length < 2) {
      return;
    }

    var favs = [];
    this.state.user.favorites.slice(1).forEach(function(spotId, idx){
      favs.push(<SpotPreview key={idx} spotId={spotId}
          history={self.props.history}/>);
    });

    return favs;
  },
  links: function(){
    var links = []

    links.push(
      <Linkbox 
        key={links.length}
        history={this.props.history} 
        link={"/search"} 
        text={"Search for a Spot"}
      />   
    );

    if (this.state.home) {
      links.push(
        <Linkbox 
          key={links.length}
          history={this.props.history} 
          link={"/region/" + this.state.home.region.id} 
          text={this.state.home.region.name}
        />
      );
    }

    return (
        <div className="container featurebox">{links}</div>
    );
  }
});

module.exports = Hello;





