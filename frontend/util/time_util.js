module.exports = {
	now: function(){
		var hour = new Date().getHours();

		if (hour === 0){
			hour = "12AM";
		} else if (hour < 12) {
			hour += "AM";
		} else {
			hour = (hour % 12) + "PM";
		}
		return hour;
	}
};