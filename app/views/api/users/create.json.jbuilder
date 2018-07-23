# json.extract! @user, :id, :username, :name
# json.extract! @user, :id, :username, :name
# json.favorite_recipes @user.favorite_recipes.pluck(:id)

  json.id @user.id
  json.username @user.username
  json.name @user.name
  json.favorite_recipes @liked_recipes_ids
