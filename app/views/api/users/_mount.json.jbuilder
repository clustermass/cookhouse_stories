# json.extract! user, :id, :username, :name
json.id user.id
json.username user.username
json.name user.name
json.favorite_recipes user.favorite_recipes.map{|rec| rec.recipe_id }
