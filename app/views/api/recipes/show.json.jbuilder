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
    json.set! @category.id do
      json.extract! @category, :id, :name
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
      json.extract! comment, :id, :user_id,:recipe_id,:body
    end
  end
end
