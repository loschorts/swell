// unique items

function unique_items (array){
	var result = []
	array.forEach(function(item){
		if (!result.includes(item)){
			result.push(item);
		}
	});

	return result;
}

console.log(unique_items([1,2,3,4,5,2,3,4,5]));