class PagesController < ApplicationController
	def search_terms
		@items = Spot.all + County.all + Region.all

		result = {}

		@items.each do |item|
			entry = item.name
			entry += " County" if item.class.to_s == "County" && item.name != "Orange County"
			result[entry] = getLink(item)
		end

		render json: result
	end

	private

	def getLink(item)
		case (item.class.to_s)
		when "Region"
			return "/region/#{item.id}"
		when "County"
			return "/county/#{item.spitcast_county}"
		when "Spot"
			return "/forecast/#{item.id}"
		end
	end

end
