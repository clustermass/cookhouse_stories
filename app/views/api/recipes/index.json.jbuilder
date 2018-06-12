

# json.set! :recipes do
#   @recipes.each do |rec|
#     json.extract! rec, :id, :title
#   end
# end
# json.recipes @recipes




# json.entities do
# json.recipes @recipes do |recipe|
#
#
# end
json.recipes do
  @recipes.each do |recipe|
    json.set! recipe.id do
      json.id recipe.id
      json.author_id recipe.author_id
      json.title recipe.title
      json.main_picture_url recipe.main_picture_url
      json.cooking_time recipe.cooking_time
      json.difficulty_id recipe.difficulty_id
      json.cuisine_id recipe.cuisine_id
      json.category_id recipe.category_id
      json.main_ingredient_id recipe.main_ingredient_id
      json.diet_id recipe.diet_id
    end
  end
end



json.difficulties do

  @difficulties.each do |dif|
    json.set! dif.id do
      json.extract! dif, :id, :level
    end
  end
end


json.followers do
  @f.each do |fol|
    json.set! fol[:recipe_id] do
      json.extract! fol, :recipe_id, :followers_count
    end
  end
end


json.cuisines do
  @cuisines.each do |cus|
    json.set! cus.id do
      json.extract! cus, :id, :sort, :country
    end
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
  @diets.each do |diet|
    json.set! diet.id do
      json.extract! diet, :id, :name
    end
  end
end

# end
