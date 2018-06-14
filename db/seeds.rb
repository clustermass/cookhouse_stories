# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

demouser = User.new({username:'demo',password:'password', name:'Demo User'})
demouser.save!
usr1 = User.new({username:'1',password:'111111', name:'Tom McAnderson'})
usr1.save!
usr2 = User.new({username:'2',password:'111111', name:'Kate Jhonson'})
usr2.save!
usr3 = User.new({username:'3',password:'111111', name:'Mr Bean'})
usr3.save!

tbs = Measuring.new({name:'tablespoon'})
teas = Measuring.new({name:'teaspoon'})
quart = Measuring.new({name:'quart'})
oz = Measuring.new({name:'oz'})
cup = Measuring.new({name:'cup'})
lb = Measuring.new({name:'lb'})
pcs = Measuring.new({name:'pcs'})


tbs.save!
teas.save!
quart.save!
oz.save!
cup.save!
lb.save!
pcs.save!

am = Cuisine.new({sort:"traditional",country:"America"})
rus = Cuisine.new({sort:"authentic",country:"Russia"})
ital = Cuisine.new({sort:"modern",country:"Italy"})
mex = Cuisine.new({sort:"traditional",country:"Mexico"})
east = Cuisine.new({sort:"traditional",country:"Eastern"})
other = Cuisine.new({sort:"other",country:"other"})

am.save!
rus.save!
ital.save!
mex.save!
east.save!
other.save!
Cuisine.where(id: 6).update_all(id: 1000)

veg = Diet.new({name:"Vegan"})
healthy = Diet.new({name:"Healthy"})
gf = Diet.new({name:"Gluten Free"})
reg = Diet.new({name:"Regular"})

veg.save!
healthy.save!
gf.save!
reg.save!

easy = Difficulty.new({level:"Easy"})
med = Difficulty.new({level:"Medium"})
hard = Difficulty.new({level:"Hard"})
nm = Difficulty.new({level:"Nightmare"})

easy.save!
med.save!
hard.save!
nm.save!

pot = Ingredient.new({name:"potatos"})
car = Ingredient.new({name:"carrots"})
on = Ingredient.new({name:"onions"})
eggs = Ingredient.new({name:"eggs"})
bp = Ingredient.new({name:"balck pepper"})
salt = Ingredient.new({name:"salt"})
rice = Ingredient.new({name:"rice"})
water = Ingredient.new({name:"water"})
beans = Ingredient.new({name:"beans"})
lamb = Ingredient.new({name:"lamb"})
tomatoes = Ingredient.new({name:"tomatoes"})

pot.save!
car.save!
on.save!
eggs.save!
bp.save!
salt.save!
rice.save!
water.save!
beans.save!
lamb.save!
tomatoes.save!

lowcarb = Category.new({name:"Low Carbs"})
under400 = Category.new({name:"Under 400 Kcal"})
wedinner = Category.new({name:"Weekend dinner"})
webreakfast = Category.new({name:"Weekend breakfast"})


lowcarb.save!
under400.save!
wedinner.save!
webreakfast.save!




dir1 = "Peel and slice (or cube) potatoes.
Let soak for 5-10 minutes in salted ice water.
Drain well and pat dry - make sure they are VERY dry!
Heat 1/4 cup peanut oil in a skillet on high heat until it's shimmering and almost smoking.
Add potatoes and let fry for about 2 minutes.
Cover the pan and reduce heat to medium."

dir2 = "Heat oven to 375 degrees.
Heat oil in a large skillet over medium-low heat. Add onion and bell pepper. Cook gently until very soft, about 20 minutes. ...
Gently crack eggs into skillet over tomatoes. Season with salt and pepper. Transfer skillet to oven and bake until eggs are just set, 7 to 10 minutes."

dir3 = "Place the grated carrots in a medium bowl, add the lemon juice and toss. For the dressing, whisk together the sour cream, mayonnaise, sugar and salt. Pour the dressing over the carrots and add the pineapple and raisins. Toss together and serve."

dir4 = "This recipe is simple to make requiring just 10 ingredients and 1 pot to prepare. Many traditional Mexican pinto bean recipes require bacon or ham hocks to prepare, but to keep mine plant-based, I relied on vegetable broth, garlic, onion, and diced tomatoes and green chilies."

dir5 = "Place red bell peppers, onion wedges, mushrooms, beef, and chicken in the bag with the marinade. Seal, and refrigerate 4 to 24 hours. Discard marinade, and thread the meat and vegetables onto skewers, leaving a small space between each item. Lightly oil the grill grate."



recipe1 = Recipe.new(author:usr1,title: "Shakshuka", main_picture_url: "https://www.onceuponachef.com/images/2017/06/Shakshuka_-575x404.jpg",cooking_time:20,difficulty:easy,cuisine: east,category: webreakfast, main_ingredient: eggs,diet:reg ) #Shakshuka
vid1 = Video.new({title: "Shakshuka",author_id: 2, video_url: "https://www.youtube.com/watch?v=ifWWRZSWS18"})


recipe2 = Recipe.new(author:usr2,title: "Fried potatoes", main_picture_url:"https://www.restlesschipotle.com/wp-content/uploads/2014/11/fried-potatoes-1_qbtdpu.jpg",cooking_time:40,difficulty:med,cuisine: rus,category: webreakfast, main_ingredient: pot,diet:reg) # Fried potatoes

recipe3 = Recipe.new(author:usr3,title: "Carrot salad", main_picture_url:"https://www.onceuponachef.com/images/2009/07/French-Grated-Carrot-Salad.jpg",cooking_time:15,difficulty:easy,cuisine: ital,category: under400, main_ingredient: car,diet:healthy )
recipe4 = Recipe.new(author:usr3,title: "Mexican beans", main_picture_url:"https://www.seriouseats.com/recipes/images/2016/05/20160605-frijoles-charros-5.JPG",cooking_time:40,difficulty:med,cuisine: mex,category: wedinner, main_ingredient: beans,diet:healthy  )
recipe5 = Recipe.new(author:usr3,title: "Kabob", main_picture_url:"https://23n36y3svldl2ozcgmntrris-wpengine.netdna-ssl.com/wp-content/uploads/2017/06/Grilled-Chicken-Kabob-Recipe-e1498152151776.jpg",cooking_time:90,difficulty:nm,cuisine: east,category: wedinner, main_ingredient: lamb,diet:reg )

recipe1.save!
recipe2.save!
recipe3.save!
recipe4.save!
recipe5.save!

vid1.recipe = recipe1
vid1.save!

step1 = Step.new({body:dir2,num:1,recipe: recipe1}) #Shakshuka
step2 = Step.new({body:dir1,num:1,recipe: recipe2}) # Fried potatoes
step3 = Step.new({body:dir3,num:1,recipe: recipe3}) # Carrot salad
step4 = Step.new({body:dir4,num:1,recipe: recipe4}) # Mex Beans
step5 = Step.new({body:dir5,num:1,recipe: recipe5})# Kabob

step1.save!
step2.save!
step3.save!
step4.save!
step5.save!

IngredientAmount.create(recipe: recipe1, measuring: pcs, amount: 5, ingredient: eggs)
IngredientAmount.create(recipe: recipe1, measuring: teas, amount: 1, ingredient: bp)
IngredientAmount.create(recipe: recipe1, measuring: cup, amount: 1, ingredient: water)
IngredientAmount.create(recipe: recipe1, measuring: pcs, amount: 3, ingredient: tomatoes)

IngredientAmount.create(recipe: recipe5, measuring: oz, amount: 15, ingredient: lamb)
IngredientAmount.create(recipe: recipe5, measuring: teas, amount: 1, ingredient: salt)
IngredientAmount.create(recipe: recipe5, measuring: teas, amount: 1, ingredient: bp)

Comment.create(recipe:recipe1, user:usr1, body:"Shacksuka was the best! really cool recipe!")
Comment.create(recipe:recipe1, user:usr3, body:"I agree!")
Comment.create(recipe:recipe5, user:usr2, body:"Labm is great too!")
Comment.create(recipe:recipe5, user:usr3, body:"Thank you!")

FavoriteRecipe.create(user:usr2,recipe:recipe5)
FavoriteRecipe.create(user:usr1,recipe:recipe5)
FavoriteRecipe.create(user:usr3,recipe:recipe1)
