class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
    if @user
      login(@user)
      @liked_recipes_ids = @user.favorite_recipes.map{|rec| rec.recipe_id }
      render "api/users/create"
    else
      render json: ["Invalid username/password combination"], status: 401
    end
  end

  def destroy
    @user = current_user
    if @user
      logout
      render json: ["Good bye, #{@user.name}"], status: 200
    else
      render json: ["Nobody signed in"], status: 404
    end

  end
end
