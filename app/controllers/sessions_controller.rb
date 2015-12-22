require 'byebug'

class SessionsController < ApplicationController
  before_action :require_signed_out!, only: [:new]
  before_action :require_signed_in!, only: [:destroy]

  def new
    render :new
  end

  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if @user
      sign_in(@user)
      render 'api/users/show', user: @user
    end
  end

  def destroy
    render json: sign_out
  end

  def show
    @user = current_user
    sign_in(@user)
    if @user
      render 'api/users/show', user: @user
    end
  end

end
