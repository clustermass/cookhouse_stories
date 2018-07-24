export const getAllRecipes = () =>(
  $.ajax({
    method: 'GET',
    url:'api/recipes',
  })
)

export const getRecipe = (id) =>(
  $.ajax({
    method: 'GET',
    url:`api/recipes/${id}`,
  })
)

export const postLikeRecipe = (like) =>(
  $.ajax({
    method: 'POST',
    url:'api/likes/',
    data: {like: like}
  })
)


export const getAllRecipeFeatures = () =>(
  $.ajax({
    method: 'GET',
    url: 'api/recipes/new'
  })
)

export const getQueriedRecipes = (query) =>(
  $.ajax({
    method: 'GET',
    url: 'api/recipes',
    data: {query:query}
  })
)

export const postRecipe = (recipe) =>(
  $.ajax({
    method: 'POST',
    url: 'api/recipes',
    data:{recipe: recipe}
  })
)

export const patchRecipe = (recipe) =>(
  $.ajax({
    method: 'PATCH',
    url: 'api/recipes',
    data:{recipe: recipe}
  })
)
