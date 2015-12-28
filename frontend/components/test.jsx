var React = require('react');
var Search = require('./search');
var FavoriteButton = require('./favorite_button');

var Test = React.createClass({
  render: function() {

    return (
    	<div className="container">
    		<FavoriteButton id={15}/>
    	</div>
    	);
  }
});

module.exports = Test;