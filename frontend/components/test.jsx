var React = require('react');
var Search = require('./search');
var Linkbox = require('./linkbox');

var Test = React.createClass({
  render: function() {

    return (
    	<div className="container">
    		<Search/>
    	</div>
    	);
  }
});

module.exports = Test;