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
      render json: current_user_info
    end
  end

  def destroy
    sign_out
    redirect_to new_session_url
  end

  def current_user_info
    {username: current_user.username, id: current_user.id}
  end

end
