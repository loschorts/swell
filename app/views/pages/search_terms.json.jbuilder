require 'byebug'

def getLink item
	case (item.class.to_s)
	when "Region"
		return "/region/#{item.id}"
	when "County"
		return "/county/#{item.spitcast_county}"
	when "Spot"
		return "/forecast/#{item.id}"
	end
end

result = {}

@items.each do |item|
	result[item.name] = getLink(item)
end

json.array! @items do |item|
	json.text item.name
	json.link getLink(item)
end
