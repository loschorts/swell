var React = require('react');
var Forecast = require('./forecast');

var Test = React.createClass({
  render: function() {
    return <Forecast spotId={47}/>
  }
});

module.exports = Test;