class Api::FavoritesController < ApplicationController
	def create
		@favorite = Favorite.new(
			user_id: params[:favorite][:user_id],
			spot_id: params[:favorite][:spot_id])

		if @favorite.save
			@user = User.find(params[:favorite][:user_id])
			render 'api/users/show/', user: @user
		end
	end

	def destroy
		if Favorite.destroy(Favorite.find_by(spot_id: params[:id]))
			@user = User.find(params[:favorite][:user_id])
			render 'api/users/show/', user: @user
		end
	end

	private

	def fav_params
		params.require(:favorite).permit(:user_id, :spot_id)
	end
end

