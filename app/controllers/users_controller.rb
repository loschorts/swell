class UsersController < ApplicationController

  before_action :require_signed_in!, only: [:edit, :update, :destroy]
  before_action :require_signed_out!, only: [:new]

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)


    if @user.save
      sign_in(@user)
      render json: @user
    end
  end

  def show
    @user = User.find(params[:id])
  end

  def destroy
    user = User.find(params[:id])
    user.destroy
    redirect_to root_url
  end

  private
  def user_params
    params.require(:user).permit(:username, :password, :units)
  end


end
