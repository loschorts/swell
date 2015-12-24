class PagesController < ApplicationController
  def search_terms
  	@items = Spot.all + County.all + Region.all
  end
end
