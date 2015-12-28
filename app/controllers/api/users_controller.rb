require 'byebug'
class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in(@user)
      render 'api/users/show', user: @user
    end

  end

  def show
    if current_user.id != params[:id].to_i
      render json: "unauthorized"
    else
      @user = User.find(params[:id])
    end
  end

  def destroy
    user = User.find(params[:id])
    render json: "destroyed #{user.username}"
  end
  
  private

  def user_params
    params.require(:user).permit(:username, :password, :favorites)
  end

end
