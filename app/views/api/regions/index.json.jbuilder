json.array! @regions do |region|
	json.partial! 'api/regions/region', region: region
end


