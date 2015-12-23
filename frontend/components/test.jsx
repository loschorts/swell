var React = require('react');
var Forecast = require('./forecast');

var Test = React.createClass({
  render: function() {
    return <Forecast spotId={150}/>
  }
});

module.exports = Test;