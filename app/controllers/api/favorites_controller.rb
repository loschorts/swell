class Api::FavoritesController < ApplicationController
	def create
		@favorite = Favorite.new(
			user_id: params[:favorite][:user_id],
			spot_id: params[:favorite][:spot_id])

		if @favorite.save
			@user = User.find(params[:favorite][:user_id])
			render 'api/users/user/', user: @user
		end
	end

	def destroy
		@favorite = Favorite.find(params[:id])
		render json: @favorite.destroy
	end

	private

	def fav_params
		params.require(:favorite).permit(:user_id, :spot_id)
	end
end

