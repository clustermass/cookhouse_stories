class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      render "api/users/create"
    else
      errors = @user.errors.full_messages
      render json: errors, status: 422
    end
  end

  def index
    @users = User.all
  end

  def user_params
    params.require(:user).permit(:username, :password, :name)
  end
end
