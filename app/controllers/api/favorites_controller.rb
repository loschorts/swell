class Api::FavoritesController < ApplicationController
	def create
		@favorite = Favorite.new(fav_params)
		debugger
		@favorite.save!
		render 'api/users/show/', user: @favorite.user 
	end

	def destroy
		@user = User.find(params[:favorite][:user_id])
		@favorite = Favorite.find_by(spot_id: params[:id])
		Favorite.destroy!( @favorite )
		render 'api/users/show/', user: @user
	end

	private

	def fav_params
		params.require(:favorite).permit(:user_id, :spot_id)
	end
end

