class Api::LikesController < ApplicationController

  before_action :require_logged_in

  def create
    @user = User.find_by(id: like_params[:user_id])
      render json: ["No such user!"], status: 404 if  @user == nil
    @recipe = Recipe.find_by(id: like_params[:recipe_id])
      render json: ["No such recipe!"], status: 404 if  @recipe == nil
    if @user.liked_recipes.include?(@recipe)
      @user.liked_recipes.delete(@recipe)
    else
      @user.liked_recipes.push(@recipe)
    end
      @like = {:user_id => @user.id,:recipe_id=> @recipe.id }
  end


  def destroy
  end

  def like_params
    params.require(:like).permit(:user_id,:recipe_id)
  end

end
