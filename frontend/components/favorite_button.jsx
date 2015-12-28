var React = require('react');
var UserStore = require('../stores/user_store');
var UserApiUtil = require('../util/user_api_util');

var FavoriteButton = React.createClass({
	getInitialState: function(){
		return {
			favorites: UserStore.currentUser().favorites
		};
	},
	componentDidMount: function(){
		UserStore.addListener(this.updateFavorites);
	},
	updateFavorites: function(){
		this.setState({favorites: UserStore.currentUser().favorites});
	},
	button: function(){
		var thisIsFav = false;
		if (this.state.favorites.length < 1){
			return "BUTTON";
		}
		var self = this;
		this.state.favorites.forEach(function(fav){
			if (fav === self.props.id) {
				thisIsFav = true;
			}
		});

		if (thisIsFav) {
			return this.favorite();
		} else {
			return this.notFavorite();
		}
	},
	favorite: function(){
		var self = this;
		return(
			<div>
				<img src="http://res.cloudinary.com/swell/image/upload/v1451331378/fav.png"
					onClick={function(){UserApiUtil.removeFavorite(self.props.id)}}
					/>
			</div>
			);
	},
	notFavorite: function(){
		var self = this;
				return(
			<div>
				<img src="http://res.cloudinary.com/swell/image/upload/v1451331329/not_fav.png"
					onClick={function(){UserApiUtil.addFavorite(self.props.id)}}
					/>
			</div>
			);
	},
	render: function(){
		return (
			<div>
				{this.button()}
			</div>
			);
	}
});

module.exports = FavoriteButton;