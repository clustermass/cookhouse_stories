

# json.set! :recipes do
#   @recipes.each do |rec|
#     json.extract! rec, :id, :title
#   end
# end
# json.recipes @recipes
json.entities do
json.recipes @recipes do |recipe|
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
json.difficulties @difficulties do |dif|
  json.extract! dif, :id, :level
end

json.followers @followers do |fol|
  json.extract! fol, :recipe_id, :followers_count
end

json.cuisines @cuisines do |cus|
  json.extract! cus, :id, :sort, :country
end

json.categories @categories do |cat|
  json.extract! cat, :id, :name
end

json.diets @diets do |diet|
  json.extract! diet, :id, :name
end

end
