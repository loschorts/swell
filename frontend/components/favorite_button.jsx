var React = require('react');
var UserStore = require('../stores/user_store');
var UserApiUtil = require('../util/user_api_util');

var Image = {
	not_fav: "http://res.cloudinary.com/swell/image/upload/v1451331329/not_fav.png",
	fav: "http://res.cloudinary.com/swell/image/upload/v1451331378/fav.png"
};

var FavoriteButton = React.createClass({
	getInitialState: function(){
		return {
			favorites: UserStore.currentUser().favorites
		};
	},
	componentWillMount: function(){
		UserStore.addListener(this.updateFavorites);
	},
	toggle: function(event){
		event.stopPropagation();
		if (this.state.favorites.includes(this.props.id)) {
				UserApiUtil.removeFavorite(this.props.id);
		} else {
			UserApiUtil.addFavorite(this.props.id);
		}
	},
	button: function(){
		if (!this.state.favorites || !this.props.user){return 'loading fav button'};

		var _button;

		if (this.state.favorites.includes(this.props.id)) {
			_button = <img src={Image['fav']}/>
		} else {
			_button = <img src={Image['not_fav']}/>
		}

		return _button;
	},
	render: function(){
		return (
			<div onClick={this.toggle}>
				{this.button()}
			</div>
			);
	}
});

module.exports = FavoriteButton;