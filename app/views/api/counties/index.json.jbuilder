json.array! @counties do |county|
	json.partial! 'api/counties/county', county: county
end


