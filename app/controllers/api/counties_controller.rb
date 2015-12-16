class Api::CountiesController < ApplicationController
	def index
		if params.has_key?(:region_id)
			@counties = Region.find(params[:region_id]).counties
		else
			@counties = County.all
		end
	end
	def show
		@county = County.find(params[:id])
	end
end