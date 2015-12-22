var React = require('react');

//Components
var HelloNavbar = require('./hello_navbar');
var SpotFocus = require('./spot_focus');
var SpotPreview = require('./spot_preview');

//Stores & Utils
window.UserStore = require('../stores/user_store');
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
    SpotStore.addListener(this.updateHome);
    UserAPIUtil.fetchCurrentUser();
  },
  updateUser: function(){
    console.log("updated user");
    this.setState({user: UserStore.currentUser()});
    SpotAPIUtil.fetchSpot(this.state.user.favorites[0]);
  },
  updateHome: function(){
    this.setState({home: SpotStore.getSpot(this.state.user.favorites[0])});
  },
  userInfo: function(){
    return <h3> Hello, {this.state.user.username} </h3>;
  },
  home: function(){
    if (typeof this.state.home === 'undefined') {
      return;
    }
    return <div><h1>Home</h1><SpotFocus spotId={this.state.home.id}/></div>;
  },
  favorites: function(){
    if (this.state.user.favorites.length < 2) {
      return;
    }
    var favs = this.state.user.favorites.slice(1);

    var els = favs.map(function(spot_id, idx){
      return <SpotPreview key={idx} spotId={spot_id}/>
    });
    return <div className="container-fluid feature-box"><h3>Favorites</h3>{els}</div>;
  },
  neighbors: function(){
    if (typeof this.state.home === 'undefined'){ 
      return;
    }

    var result = this.state.home.neighbors.map(function(neighborId, idx){
      return <SpotPreview key={idx} spotId={neighborId}/>;
    });

    return <div className="container-fluid feature-box"><h3>Spots Nearby</h3>{result}</div>;
  },
  render: function(){
    return(
      <div className="container hello">
        <HelloNavbar history={this.props.history}/>
        {this.home()}
        {this.favorites()}
        {this.neighbors()}
      </div>
      );
  }
});

// var Hello = React.createClass({
//   getInitialState: function(){
//     return ({
//       user: UserStore.currentUser(),
//     });
//   },
//   componentDidMount: function(){
//     UserStore.addListener(this.updateUser);
//     SpotStore.addListener(this.updateSpots);
//   },
//   updateUser: function(){
//     this.setState({
//       user: UserStore.currentUser(),
//     });
//     user.favorites.forEach(function(spot){
//       SpotAPIUtil.getSpotById(spot);
//     });
//   },

//   showFavorites: function(){
//     return this.spotNames(this.state.user.favorites);
//   },
//   spotNames: function(array){
//     if (array.length === 0){
//       return [];
//     }
//     var names = [];
//     array.forEach(function(spot){
//       names.push(spot.name);
//     });
//     return names;
//   },
//   renderHome: function(){
    
//     if (this.state.user.favorites.length === 0) {
//       return;
//     }
//     return (<div>
//               <h1>Home</h1>
//               <SpotFocus spotId={this.state.user.favorites[0]}/>
//           </div>);
//   },
//   renderFavorites: function(){
//     if (this.state.user.favorites.length < 2) {
//       return;
//     }
//     var _favorites = this.state.user.favorites.slice(1, this.length);
//     var result = _favorites.map(function(fav){
//       return (<SpotPreview spotId={fav}/>);
//     });
//     return (<div className="feature-box">{result}</div>);
//   },
//   renderNeighbors: function(){
//     if (typeof this.state.user.favorites[0].neighbors === 'undefined' || 
//         typeof this.state.user ){
//       return;
//     }
//     var _neighbors = this.state.user.favorites[0].neighbors
//     var result = _neighbors.map(function(neighbor){
//       var _neighbor = SpotStore.show(neighbor);
//       if (typeof _neighbor !== 'undefined'){
//         return (<SpotPreview spotId={_neighbor}/>);
//       } else {
//         return <div/>
//       }
//     });

//     return <div className="feature-box">{result}</div>
//   },
//   render: function(){
//     return(
//       <div id="hello"> 
//         <HelloNavbar history={this.props.history}/>
//         {this.userInfo()}
//         {this.renderHome()}
//         {this.renderFavorites()}
//         {this.renderNeighbors()}
//       </div>
//     );
//   }
// });

module.exports = Hello;





