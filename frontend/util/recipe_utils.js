export const getAllRecipes = () =>(
  $.ajax({
    method: 'GET',
    url:'api/recipes',
  })
)
