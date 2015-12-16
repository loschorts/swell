json.array! @spots do |spot|
	json.partial! 'api/spots/spot', spot: spot
end



