class Api::RecipesController < ApplicationController

  def index
      @recipes
    if params["query"] != nil
      query = params["query"].chomp.downcase
      @recipes = Recipe.all.includes(:followers,:video,:cuisine,:difficulty,:category,:diet,:ingredients )
      @steps = Step.where(["lower(body) like ?" ,"%#{query}%"])

      @return = @recipes.select{|rec| rec.title.downcase.include?(query) ||
            rec.ingredients.any?{|ing| ing.name.downcase.include?(query) ||
              rec.cuisine.sort.downcase.include?(query) || rec.cuisine.country.downcase.include?(query)}}
      @steps.each do |step|
        @return << @recipes.select{|rec| rec.id == step.recipe_id}.first  if @return.none?{|rec| rec.id == step.recipe_id}
      end
      @recipes =  @return
    else
      @recipes = Recipe.all.includes(:followers, :cuisine,:difficulty,:category,:diet )
    end

    @followers_count = []
    @cuisines = []
    @categories = []
    @diets = []
    @difficulties = []
    @ingredients = []
    @videos = []

    @ingredients.push(Ingredient.find_by(name:"beef"))  if   Ingredient.find_by(name:"beef") != nil
    @ingredients.push(Ingredient.find_by(name:"pork")) if Ingredient.find_by(name:"pork") != nil
    @ingredients.push(Ingredient.find_by(name:"poultry")) if Ingredient.find_by(name:"poultry") != nil
    @ingredients.push(Ingredient.find_by(name:"pasta")) if Ingredient.find_by(name:"pasta") != nil


    @recipes.each do |rec|
      @followers_count += [{recipe_id:rec.id,followers_count: rec.followers.length}]
      @cuisines += [rec.cuisine]  unless @cuisines.include?(rec.cuisine)
      @categories += [rec.category]  unless @categories.include?(rec.category)
      @diets += [rec.diet] unless @diets.include?(rec.diet)
      @difficulties += [rec.difficulty] unless @difficulties.include?(rec.difficulty)
      if rec.video.nil?
          @videos += [{recipe_id:rec.id,video_url:''}]
      else
          @videos += [{recipe_id:rec.id,video_url:rec.video.video_url}]
      end

    end
    # render json: {}


  end


  def show
    @recipe = Recipe.includes(:followers,:cuisine,:video, :difficulty,:category,:diet,:ingredients,:ingredient_amounts,:steps,:video,:comments ).find_by(id: params[:id])

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
    @video_url = ""
    if !@recipe.video.nil?
      @video_url = @recipe.video.video_url
    end

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

    if recipe_params[:cuisine_id].chomp.to_i == -1
      render json: ["Please, select cuisine"], status: 422
      return nil
    elsif recipe_params[:category_id].chomp.to_i == -1
      render json: ["Please, select category"], status: 422
      return nil
    elsif recipe_params[:diet_id].chomp.to_i == -1
      render json: ["Please, select diet"], status: 422
      return nil
    elsif recipe_params[:difficulty_id].chomp.to_i == -1
      render json: ["Please, select difficulty"], status: 422
      return nil
    elsif recipe_params[:title] == nil
      render json: ["Please, specify title"], status: 422
      return nil
    elsif recipe_params[:cooking_time].chomp.to_i == 0
      render json: ["Please, specify cooking time"], status: 422
      return nil
    end
    # @author_id = current_user.id
    @recipe ={}

    @cuisine

    # Checking if user created custom cuisine
    if recipe_params[:cuisine_id].to_i == 1000
      @cuisine = Cuisine.new(country:recipe_params[:custom_cuisine_country].chomp,
                             sort:recipe_params[:custom_cuisine_sort].chomp)
      if !@cuisine.valid?
        errors = @cuisine.errors.full_messages
        render json: errors, status: 422
        return nil
      end

    else
      @cuisine = Cuisine.find(recipe_params[:cuisine_id].to_i)
    end

      @ingredients_map = {}
      @ingredients_hash = Hash.new
      # @ingredients_ids = []

      # If no ingredients passed, raise error.
      if recipe_params[:all_ingredients] == nil
          render json: ["Please, add at least one ingredient to recipe."], status: 422
          return nil
      end

      @ingredients_arr = recipe_params[:all_ingredients].values
      recipe_params[:ingredient_ids].map{|id| id.to_i}.each do |id|
        @ingredients_map[id] = id
        # @ingredients_ids << id
      end

      # Getting measurings from DB
      @measurings = {}
      recipe_params[:measuring_ids].each do |k,v|
        @measurings[k.to_i] = Measuring.find(v.to_i)
      end

      # Converting amounts to integers
      @amounts = {}
      recipe_params[:amounts].each do |k,v|
        @amounts[k.to_i] = v.to_i
        # Checking if all amounts are digits.
        if @amounts[k.to_i] == 0
          render json: ["Wrong amount. Please, use integers as amount value"], status: 422
          return nil
        end
      end

      # Checking if user created custom ingredients

      if @ingredients_map.any? {|k,v| k >= 9000}
           @new_ing_arr = @ingredients_arr.select{|ing| ing[:id].to_i >= 9000 }
           @new_ing_arr.each do |ing|
             @temp_id = ing[:id].to_i
             @new_ing = Ingredient.new(name:ing[:name].chomp.downcase)
             if !@new_ing.valid?
               errors = @new_ing.errors.full_messages
               render json: errors, status: 422
               return nil
             end
             @ingredients_hash[@temp_id] = @new_ing
              # @ingredients_map[@temp_id] = @new_ing.id
            end
        end
        # At this point all new ingredients passed validation.
        # Let's grab all existing ingredients.
          @old_ing_arr = @ingredients_arr.select{|ing| ing[:id].to_i < 9000 }
          @old_ing_arr.each do |ing|
            @id = ing[:id].to_i
            @old_ing = Ingredient.find(@id)
            @ingredients_hash[@id] = @old_ing
          end

          # Creating new recipe and validating.
          @recipe = Recipe.new
          @recipe.author = current_user
          @recipe.title = recipe_params[:title].chomp
          @recipe.main_picture_url = recipe_params[:main_picture_url].chomp
          @recipe.cooking_time = recipe_params[:cooking_time].chomp.to_i
          @recipe.difficulty = Difficulty.find(recipe_params[:difficulty_id].chomp.to_i)
          #  If cuisine has not been created, we set temporarily placeholder to pass recipe validation.
          if @cuisine &&  @cuisine.id == nil
            @recipe.cuisine_id = 1000
          else
            @recipe.cuisine = @cuisine
          end

          @recipe.category = Category.find(recipe_params[:category_id].chomp.to_i)

          # If ingredient hasn't been saved, let's assing valid ingredient to validate recipe
          if @ingredients_hash[recipe_params[:main_ingredient_id].chomp.to_i] && @ingredients_hash[recipe_params[:main_ingredient_id].chomp.to_i].id == nil
            @recipe.main_ingredient = Ingredient.first
          else
            @recipe.main_ingredient = @ingredients_hash[recipe_params[:main_ingredient_id].chomp.to_i]
          end


          @recipe.diet = Diet.find(recipe_params[:diet_id].chomp.to_i)

          # Returning error if recipe is not valid
          if !@recipe.valid?
            errors = @recipe.errors.full_messages
            render json: errors, status: 422
            return nil
          end
          #  returning main ingredient, if it hasn't been save to DB.

          if @ingredients_hash[recipe_params[:main_ingredient_id].chomp.to_i] && @ingredients_hash[recipe_params[:main_ingredient_id].chomp.to_i].id == nil

            @recipe.main_ingredient = @ingredients_hash[recipe_params[:main_ingredient_id].chomp.to_i]

          end

          # # assigning it back to recipe.
          # if @recipe.cuisine_id = 1000
          #   @recipe.cuisine_id = @cuisine.id
          # end

          @steps = []

          recipe_params[:all_steps].each do |_,v|
            @steps << Step.new(num:v["num"].to_i, image:v["image"], body:v["body"].chomp)
          end

          # If any step has no text, raise error.
          if @steps.any? {|s| s.body.length == 0}
            render json: ["Every step should have text."], status: 422
            return nil
          end

          #  Let's grab optional video if it is exist.
          @video = nil
          if recipe_params[:video_url] != ""
            @video = Video.new(video_url:recipe_params[:video_url].chomp, author_id:current_user.id)
          end

          #  Finish Validation. Start saving to DB...

          # Saving cuisine, if it is newly created.
          if @cuisine && @cuisine.id == nil
            @cuisine.save
          end


          # Saving new ingredients
          @ingredients_hash.each do |k,v|
            if v.id == nil
              # Let's check if we have this ingredient already...
              t_ing = Ingredient.find_by(name:v.name)
              if t_ing
                @ingredients_hash[k] = t_ing
              else
                v.save
              end
            end
          end

          # Saving recipe.
          @recipe.cuisine = @cuisine
          @recipe.main_ingredient = @ingredients_hash[recipe_params[:main_ingredient_id].chomp.to_i]

          if !@recipe.save
            errors = @recipe.errors.full_messages
            render json: errors, status: 422
            return nil
          end

          # Adding ingredients to recipe

          @ingredients_hash.each do |k,v|
            ia = IngredientAmount.new(ingredient:v, recipe:@recipe, measuring:@measurings[k], amount:@amounts[k])
            ia.save
          end

          if !@video.nil?
            @video.recipe_id = @recipe.id
            @video.save
          end

          @steps.each do |step|
            step.recipe = @recipe
            step.save
          end
          debugger
          render json: @recipe


  end

  def update
    if !logged_in?
      render json: ["Unauthorized, please log in"], status: 401
      return nil
    end

    # if recipe_params[:cuisine_id].chomp.to_i == -1
    #   render json: ["Please, select cuisine"], status: 422
    #   return nil
    # elsif recipe_params[:category_id].chomp.to_i == -1
    #   render json: ["Please, select category"], status: 422
    #   return nil
    # elsif recipe_params[:diet_id].chomp.to_i == -1
    #   render json: ["Please, select diet"], status: 422
    #   return nil
    # elsif recipe_params[:difficulty_id].chomp.to_i == -1
    #   render json: ["Please, select difficulty"], status: 422
    #   return nil
    if recipe_params[:title] == nil
      render json: ["Please, specify title"], status: 422
      return nil
    elsif recipe_params[:cooking_time].chomp.to_i == 0
      render json: ["Please, specify cooking time"], status: 422
      return nil
    end
    # @author_id = current_user.id
    @recipe ={}

    @cuisine

    # Checking if user created custom cuisine
    if recipe_params[:cuisine_id].to_i == 1000
      @cuisine = Cuisine.new(country:recipe_params[:custom_cuisine_country].chomp,
                             sort:recipe_params[:custom_cuisine_sort].chomp)
      if !@cuisine.valid?
        errors = @cuisine.errors.full_messages
        render json: errors, status: 422
        return nil
      end

    else
      @cuisine = Cuisine.find(recipe_params[:cuisine_id].to_i)
    end

      @ingredients_map = {}
      @ingredients_hash = Hash.new
      # @ingredients_ids = []

      # If no ingredients passed, raise error.
      if recipe_params[:all_ingredients] == nil
          render json: ["Please, add at least one ingredient to recipe."], status: 422
          return nil
      end

      @ingredients_arr = recipe_params[:all_ingredients].values
      recipe_params[:ingredient_ids].map{|id| id.to_i}.each do |id|
        @ingredients_map[id] = id
        # @ingredients_ids << id
      end

      # Getting measurings from DB
      @measurings = {}
      recipe_params[:measuring_ids].each do |k,v|
        @measurings[k.to_i] = Measuring.find(v.to_i)
      end

      # Converting amounts to integers
      @amounts = {}
      recipe_params[:amounts].each do |k,v|
        @amounts[k.to_i] = v.to_i
        # Checking if all amounts are digits.
        if @amounts[k.to_i] == 0
          render json: ["Wrong amount. Please, use integers as amount value"], status: 422
          return nil
        end
      end

      # Checking if user created custom ingredients

      if @ingredients_map.any? {|k,v| k >= 9000}
           @new_ing_arr = @ingredients_arr.select{|ing| ing[:id].to_i >= 9000 }
           @new_ing_arr.each do |ing|
             @temp_id = ing[:id].to_i
             @new_ing = Ingredient.new(name:ing[:name].chomp.downcase)
             if !@new_ing.valid?
               errors = @new_ing.errors.full_messages
               render json: errors, status: 422
               return nil
             end
             @ingredients_hash[@temp_id] = @new_ing
              # @ingredients_map[@temp_id] = @new_ing.id
            end
        end
        # At this point all new ingredients passed validation.
        # Let's grab all existing ingredients.
          @old_ing_arr = @ingredients_arr.select{|ing| ing[:id].to_i < 9000 }
          @old_ing_arr.each do |ing|
            @id = ing[:id].to_i
            @old_ing = Ingredient.find(@id)
            @ingredients_hash[@id] = @old_ing
          end

          # Updating existing recipe and validating.
          @recipe = Recipe.find_by(id:recipe_params[:recipe_id].to_i)
          # @recipe = Recipe.new
          if @recipe.nil?
            render json: ["Recipe was not found in database"], status: 422
            return nil
          end
          @recipe.author = current_user
          @recipe.title = recipe_params[:title].chomp
          @recipe.main_picture_url = recipe_params[:main_picture_url].chomp
          @recipe.cooking_time = recipe_params[:cooking_time].chomp.to_i
          @recipe.difficulty = Difficulty.find(recipe_params[:difficulty_id].chomp.to_i)
          #  If cuisine has not been created, we set temporarily placeholder to pass recipe validation.
          if @cuisine &&  @cuisine.id == nil
            @recipe.cuisine_id = 1000
          else
            @recipe.cuisine = @cuisine
          end

          @recipe.category = Category.find(recipe_params[:category_id].chomp.to_i)

          # If ingredient hasn't been saved, let's assing valid ingredient to validate recipe
          if @ingredients_hash[recipe_params[:main_ingredient_id].chomp.to_i] && @ingredients_hash[recipe_params[:main_ingredient_id].chomp.to_i].id == nil
            @recipe.main_ingredient = Ingredient.first
          else
            @recipe.main_ingredient = @ingredients_hash[recipe_params[:main_ingredient_id].chomp.to_i]
          end


          @recipe.diet = Diet.find(recipe_params[:diet_id].chomp.to_i)

          # Returning error if recipe is not valid
          if !@recipe.valid?
            errors = @recipe.errors.full_messages
            render json: errors, status: 422
            return nil
          end
          #  returning main ingredient, if it hasn't been save to DB.

          if @ingredients_hash[recipe_params[:main_ingredient_id].chomp.to_i] && @ingredients_hash[recipe_params[:main_ingredient_id].chomp.to_i].id == nil

            @recipe.main_ingredient = @ingredients_hash[recipe_params[:main_ingredient_id].chomp.to_i]

          end

          # assigning it back to recipe.
          # if @recipe.cuisine_id = 1000
          #   @recipe.cuisine_id = @cuisine.id
          # end

          @steps = []

          recipe_params[:all_steps].each do |_,v|
            @steps << Step.new(num:v["num"].to_i, image:v["image"], body:v["body"].chomp)
          end

          # If any step has no text, raise error.
          if @steps.any? {|s| s.body.length == 0}
            render json: ["Every step should have text."], status: 422
            return nil
          end

          #  Let's grab optional video if it is exist.
          @video = nil
          if recipe_params[:video_url] != ""
            @video = Video.new(video_url:recipe_params[:video_url].chomp, author_id:current_user.id)
          end

          #  Finish Validation. Start saving to DB...

          # Saving cuisine, if it is newly created.
          if @cuisine && @cuisine.id == nil
            @cuisine.save
          end


          # Saving new ingredients
          @ingredients_hash.each do |k,v|
            if v.id == nil
              # Let's check if we have this ingredient already...
              t_ing = Ingredient.find_by(name:v.name)
              if t_ing
                @ingredients_hash[k] = t_ing
              else
                v.save
              end
            end
          end

          # Saving recipe.
          @recipe.cuisine = @cuisine
          @recipe.main_ingredient = @ingredients_hash[recipe_params[:main_ingredient_id].chomp.to_i]

          if !@recipe.save
            errors = @recipe.errors.full_messages
            render json: errors, status: 422
            return nil
          end

          # removing previous ingredient amounts
          @recipe.ingredients = []

          # Adding ingredients to recipe

          @ingredients_hash.each do |k,v|
            ia = IngredientAmount.new(ingredient:v, recipe:@recipe, measuring:@measurings[k], amount:@amounts[k])
            ia.save
          end

          # Removing previous video if it was attached to recipe
          if !@recipe.video.nil?
            Video.destroy(@recipe.video.id)
          end

          if !@video.nil?
            @video.recipe_id = @recipe.id
            @video.save
          end


          # removing previous steps
          Step.destroy(@recipe.steps.map{|step| step.id})

          @steps.each do |step|
            step.recipe = @recipe
            step.save
          end
          render json: @recipe
  end


  def recipe_params

    params.require(:recipe).permit(:author_id,:video_url,:recipe_id,:title, :main_picture_url,:difficulty_id,:cooking_time,
      :diet_id,:cuisine_id,:custom_cuisine_country, :custom_cuisine_sort,:main_ingredient_id,
      :custom_main_ingredient, :category_id,:recipe_id,:ingredient_ids => [],:amounts => {},
      :measuring_ids => {},:all_ingredients => {},:all_steps => {})
  end

end
