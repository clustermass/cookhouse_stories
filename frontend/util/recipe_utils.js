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
