json.recipes do
    json.set! @recipe.id do
      json.id @recipe.id
      json.author_id @recipe.author_id
      json.title @recipe.title
      json.main_picture_url @recipe.main_picture_url
      json.cooking_time @recipe.cooking_time
      json.difficulty_id @recipe.difficulty_id
      json.cuisine_id @recipe.cuisine_id
      json.category_id @recipe.category_id
      json.main_ingredient_id @recipe.main_ingredient_id
      json.diet_id @recipe.diet_id
      json.ingredients_list  @ingredients_list
      json.steps  @steps
      json.video_url  @video_url

      json.ingredients_amounts do
        @ingredients_amounts.each do |am|
          json.set! am.keys.first do
            json.extract! am, am.keys.first
          end
        end
      end
      json.ingredients_measurings do
        @ingredients_measurings.each do |im|
          json.set! im.keys.first do
            json.extract! im, im.keys.first
          end
        end
      end
    end
end



json.difficulties do

    json.set! @difficulty.id do
      json.extract! @difficulty, :id, :level
    end
end


json.followers do
  @followers.each  do |fol|
    json.set! fol[:user_id] do
      json.extract! fol, :user_id, :name
    end
  end
end


json.cuisines do
    json.set! @cuisine.id do
      json.extract! @cuisine, :id, :sort, :country
    end

end

json.categories do
  @categories.each do |cat|
    json.set! cat.id do
      json.extract! cat, :id, :name
    end
  end
end

json.diets do
    json.set! @diet.id do
      json.extract! @diet, :id, :name
    end
end

json.comments do
  @comments.each  do |comment|
    json.set! comment[:id] do
      json.extract! comment, :id, :user_id,:recipe_id,:body,:updated_at
    end
  end
end

json.measurings do
  @measurings.each  do |measuring|
    json.set! measuring[:id] do
      json.extract! measuring, :id, :name
    end
  end
end

json.ingredients do
  @ingredients.each  do |ing|
    json.set! ing.id do
      json.extract! ing, :name
      # json.extract! ing, :ingid, :name,
    end
  end

end

# json.ingredients_amount do
#   @ingredients.each  do |ing|
#     json.set! ing.id do
#       json.extract! ing, :ingid, :name,
#     end
#   end
# end
