class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      @liked_recipes_ids = @user.favorite_recipes.map{|rec| rec.recipe_id }
      render "api/users/create"
    else
      errors = @user.errors.full_messages
      render json: errors, status: 422
    end
  end

  def index
    @users = User.all.includes(:favorite_recipes)
    @liked_recipes_ids = {}
    @users.each do |user|
      @liked_recipes_ids[user.id] = user.favorite_recipes.map{|rec| rec.recipe_id }
    end
  end

  def show
    if logged_in?
      @user = User.find_by_id(params[:id])
      if @user != nil
          @liked_recipes_ids = @user.favorite_recipes.map{|rec| rec.recipe_id }
          render  "api/users/create"
      else
          render json: ["No such user!"], status: 404
          return nil
      end
    else
      render json: ["Unauthorized, please log in"], status: 401
      return nil
    end
  end


  def user_params
    params.require(:user).permit(:username, :password, :name)
  end
end
