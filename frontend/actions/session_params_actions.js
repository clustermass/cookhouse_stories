export const SAVE_SEARCH_FILTERS = "SAVE_SEARCH_FILTERS"
export const SAVE_FAVORITE_RECIPES = "SAVE_FAVORITE_RECIPES"
export const DELETE_FAVORITE_RECIPES = "DELETE_FAVORITE_RECIPES"


export const saveSearchFilters = (state) => (
  {
    type: SAVE_SEARCH_FILTERS,
    state: state
  }
)

export const saveFavoriteRecipes = (state) => (
  {
    type: SAVE_FAVORITE_RECIPES,
    state: state
  }
)

export const deleteFavoriteRecipes = () => (
  {
    type: DELETE_FAVORITE_RECIPES
  }
)
