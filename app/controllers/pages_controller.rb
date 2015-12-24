class PagesController < ApplicationController
	def search_terms
		@items = Spot.all + County.all + Region.all

		result = {}

		@items.each do |item|
			result[item.name] = getLink(item)
		end

		render json: result
	end

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
