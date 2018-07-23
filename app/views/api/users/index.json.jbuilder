# json.users do
#   @users.each do |user|
#     json.set! user.id do
#       json.extract! user,:id, :name
#     end
#   end
# end
json.users do
  @users.each do |user|
    json.set! user.id do
      json.id user.id
      json.username user.username
      json.name user.name
      json.favorite_recipes @liked_recipes_ids[user.id]
    end
  end
end
