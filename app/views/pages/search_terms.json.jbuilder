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

json.array! @items do |item|
	json.term item.name
	json.link getLink(item)
end
