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
    if !logged_in?
      render json: ["Unauthorized, please log in"], status: 401
    end
    @cuisines = Cuisine.all
    @categories = Category.all
    @diets = Diet.all
    @difficulties = Difficulty.all
    @measurings = Measuring.all
    @ingredients = Ingredient.all
  end

  def create
    if !logged_in?
      render json: ["Unauthorized, please log in"], status: 401
      return nil
    end

    @recipe ={}
    # Checking if user created custom cuisine
    @cuisine_id
    @cuisine
    if recipe_params[:cuisine_id].to_i == 1000
      @cuisine_id = Cuisine.new(country:recipe_params[:custom_cuisine_country],
                             sort:recipe_params[:custom_cuisine_sort])
      if !@cuisine_id.save
        errors = @cuisine_id.errors.full_messages
        render json: errors, status: 422
        return nil
      else
          @cuisine = recipe_params[@cuisine_id.id]
      end

    else
      @cuisine = recipe_params[:cuisine_id]
    end

      @ingredients_map = {}
      @ingredients_ids = []

      recipe_params[:ingredient_ids].map{|id| id.to_i}.each do |id|
        @ingredients_map[id] = id
        @ingredients_ids << id
      end

      @measurings = recipe_params[:measuring_ids].values

      @amounts = recipe_params[:amounts].values

      @ingredients_arr = recipe_params[:all_ingredients].values


      # Checking if user created custom ingredients

      if @ingredients_map.any? {|k,v| k >= 9000}
           @new_ing_arr = @ingredients_arr.select{|ing| ing[:id].to_i >= 9000 }
           @new_ing_arr.each do |ing|
             @temp_id = ing[:id].to_i
             @new_ing = Ingredient.new(name:ing[:name].downcase)
             if !@new_ing.save
               errors = @new_ing.errors.full_messages
               render json: errors, status: 422
               return nil
             end
              @ingredients_map[@temp_id] = @new_ing.id
            end
        end

debugger

          # # Checking if user selected custom ingridient as main
          # if recipe_params[:main_ingredient_id].to_i >= 100000
          #   @name = @ingredients_arr.select{|ing| ing[:id].to_i == recipe_params[:main_ingredient_id].to_i }.first[:name]
          #   @temp_ing = Ingredient.new(name:@name)
          #   # trying to save
          #   if !@temp_ing.save
          #     errors = @temp_ing.errors.full_messages
          #     render json: errors, status: 422
          #   end
          #
          # else
          #   @ingredients_arr.each do |ing|
          #
          #   end
          # end
      # else






    debugger
    @recipe = Recipe.new(
      author_id:recipe_params[:author_id],
      title:recipe_params[:title],
      main_picture_url:recipe_params[:main_picture_url],
      cooking_time:recipe_params[:cooking_time],
      difficulty_id:recipe_params[:difficulty_id],
      cuisine_id:recipe_params[:cuisine_id],
      category_id:recipe_params[:category_id],
      main_ingredient_id:recipe_params[:main_ingredient_id],
      diet_id:recipe_params[:diet_id],
      main_picture_url:recipe_params[:main_picture_url])

  end


  def recipe_params

    params.require(:recipe).permit(:author_id,:title, :main_picture_url,:difficulty_id,:cooking_time,
      :diet_id,:cuisine_id,:custom_cuisine_country, :custom_cuisine_sort,:main_ingredient_id,
      :custom_main_ingredient, :category_id,:recipe_id,:ingredient_ids => [],:amounts => {},
      :measuring_ids => {},:all_ingredients => {},:all_steps => {})
  end

end
