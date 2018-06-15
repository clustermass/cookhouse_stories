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
    @steps = @recipe.steps.map {|step| {:id=> step.id, :recipe_id=>step.recipe_id,:num=>step.num,:body=>step.body,:image=>step.image}}
    @cuisine = @recipe.cuisine
    @category = @recipe.category
    @diets = @recipe.diet
    @difficulty = @recipe.difficulty
    @comments = @recipe.comments
    @video = @recipe.video
    @ingredients = @recipe.ingredients
    @measurings = []
    @ingredients_list = []
    @ingredients_amounts = []
    @ingredients_measurings  = []
    @ingredients.each do |ing|
      @measurings << ing.measurings.first unless @measurings.include?(ing.measurings.first)
      @ingredients_measurings << {ing.id => ing.measurings.first.id}
      @ingredients_list << ing.id
      @ingredients_amounts << {ing.id => ing.ingredient_amounts.first.amount}
    end
    @diet = @recipe.diet
  end


  def new
    @cuisines = Cuisine.all
    @categories = Category.all
    @diets = Diet.all
    @difficulties = Difficulty.all
    @measurings = Measuring.all
    @ingredients = Ingredient.all
  end

  def create
    @rawrecipe = recipe_params
    @recipe = Recipe.new(
      author_id:recipe_params[:author_id],
      title:recipe_params[:title],
      main_picture_url:recipe_params[:main_picture_url],
      cooking_time:recipe_params[:cooking_time],
      difficulty_id:recipe_params[:difficulty_id],
      cuisine_id:recipe_params[:cuisine_id],
      category_id:recipe_params[:category_id]),
      
    debugger
  end


  def recipe_params

    params.require(:recipe).permit(:author_id,:title, :main_picture_url,:difficulty_id,:cooking_time,
      :diet_id,:cuisine_id,:custom_cuisine_country, :custom_cuisine_sort,:main_ingredient_id,
      :custom_main_ingredient, :category_id,:recipe_id,:ingredient_ids => [],:amounts => {},
      :measuring_ids => {},:all_ingredients => {},:all_steps => {})
  end

end
