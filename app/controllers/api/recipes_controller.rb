class Api::RecipesController < ApplicationController

  def index
    # debugger
    @recipes = Recipe.all.includes(:followers, :cuisine,:difficulty,:category,:diet )
    @followers_count = []
    @cuisines = []
    @categories = []
    @diets = []
    @difficulties = []
    @recipes.each do |rec|
      @followers_count += [{recipe_id:rec.id,followers_count: rec.followers.length}]
      @cuisines += [rec.cuisine]  unless @cuisines.include?(rec.cuisine)
      @categories += [rec.category]  unless @categories.include?(rec.category)
      @diets += [rec.diet] unless @diets.include?(rec.diet)
      @difficulties += [rec.difficulty] unless @difficulties.include?(rec.difficulty)
    end
  # render json: {}


  end


  def show
    @recipe = Recipe.includes(:followers,:cuisine,:difficulty,:category,:diet,:ingredients,:ingredient_amounts,:steps,:video,:comments ).find_by(id: params[:id])

    if @recipe == nil
      render json: ["No such recipe"], status: 404
    end
    @followers = []
    @recipe.followers.each do |user|
      @followers << {user_id:user.id,name:user.name}
    end

    @cuisine = @recipe.cuisine
    @category = @recipe.category
    @diets = @recipe.diet
    @difficulty = @recipe.difficulty
    @comments = @recipe.comments
    @video = @recipe.video
    @steps = @recipe.steps
    @ingredients = @recipe.ingredients
    @measurings = []
    @ingredients.each do |ing|
      @measurings << ing.measurings.first unless @measurings.include?(ing.measurings.first)
    end
    @diet = @recipe.diet
  end

  # def recipe_params
  #   params.require
  # end

end
