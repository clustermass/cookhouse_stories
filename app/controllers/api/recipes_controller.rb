class Api::RecipesController < ApplicationController

  def index

    @recipes = Recipe.all.includes(:followers,:cuisine,:difficulty,:category,:diet )
    @followers = []
    @cuisines = []
    @categories = []
    @diets = []
    @difficulties = []
    @recipes.each do |rec|
      @followers << {recipe_id:rec.id,followers_count: rec.followers.length}
      @cuisines << rec.cuisine  unless @cuisines.include?(rec.cuisine)
      @categories << rec.category  unless @categories.include?(rec.category)
      @diets << rec.diet unless @diets.include?(rec.diet)
      @difficulties << rec.difficulty unless @difficulties.include?(rec.difficulty)
    end

  end


end
