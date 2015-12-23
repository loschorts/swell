ChartUtil = {};

ChartUtil.swellRadarData =  function(swellDetail){
	var _angles = {};

	for (var i = 0 ; i < 360 ; i += 10) {
		_angles[JSON.stringify(i)] = 0;
	}

	for (var i = 0 ; i < 3 ; i ++){
		var _detail = swellDetail[JSON.stringify(i)];
		if (_detail.dir && _detail.hs){
			var roundDir = JSON.stringify((_data.dir % 10 * 10) % 360);
			_angles[roundDir] = _data.hs;
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

	return {
		labels: _labels,
		datasets: _datasets
	};
};

module.exports = ChartUtil;
