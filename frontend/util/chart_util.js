ChartUtil = {};

ChartUtil.windPolarData = function(windDetail){
	debugger
	var _data = [];

	var slice = {
        value: 300,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Red"
    };

    for (var i = 0 ; i < 8; i++) {
    	_data.push({
	        value: 0,
	        color:"#F7464A",
	        highlight: "#FF5A5E",
	        label: i
   		 });
    }

   var _angle = Math.round(windDetail.direction_degrees / 8) % 8;
   _data[_angle].value = windDetail.speed_mph;

   return _data;

};

ChartUtil.swellRadarData =  function(swellDetail){
	var _angles = {};

	for (var i = 0 ; i < 360 ; i += 45) {
		_angles[JSON.stringify(i)] = 0;
	}

	for (var i = 0 ; i < 5 ; i ++){
		var _detail = swellDetail[JSON.stringify(i)];
		if (_detail.dir && _detail.hs && _detail.tp){
			var roundDir = JSON.stringify(Math.round(_detail.dir / 45) * 45);
			_angles[roundDir] = _detail.hs;
		}
	}

	var _data = [];

	for (var angle in _angles) {
		_data.push(_angles[angle]);
	}

	var _datasets = [
	    {
	        label: "Swell",
	        fillColor: "rgba(220,220,220,0.2)",
	        strokeColor: "rgba(220,220,220,1)",
	        pointColor: "rgba(220,220,220,1)",
	        pointStrokeColor: "#fff",
	        pointHighlightFill: "#fff",
	        pointHighlightStroke: "rgba(220,220,220,1)",
	        data: _data
	    }
	];

	var _labels = Object.keys(_angles);

	return {
		labels: _labels,
		datasets: _datasets
	};
};

module.exports = ChartUtil;
