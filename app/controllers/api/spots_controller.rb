class Api::SpotsController < ApplicationController
	def index
		if params.has_key?(:county_id)
			@spots = County.find(params[:county_id]).spots
		elsif params.has_key?(:region_id)
			@spots = Region.find(params[:region_id]).spots
		else
			@spots = Spot.all
		end
	end
	def show
		@spot = Spot.find(params[:id])
	end
	def apikey
		@spot = Spot.find_by(spitcast_id: params[:id])
	end
end
