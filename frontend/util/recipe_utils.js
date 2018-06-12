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
