import React from "react";
import { Link } from 'react-router-dom';
const RecipeIndexItem = ({ recipe, followers, likesArr }) => {


  let recipeItemBgImgStyle = {
    backgroundImage: "url(" + recipe.main_picture_url  + ")",
    backgroundRepeat  : 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'auto 287px' ,
  };

let icon = window.hearticon
if (likesArr !== undefined && likesArr.includes(recipe.id) ){
  icon = window.heartyellow2
}

return(
<Link className="main-recipe-item-link" to={`/recipes/${recipe.id}`}>
  <div className="recipe-item">
    <div className="recipe-item-img" style={ recipeItemBgImgStyle }>
      <div className="likes-time">
      <img src={icon}/><span>{typeof followers === "undefined" ? '0' : followers.followers_count}  <span>{recipe.cooking_time} min.</span></span>

      </div>
    </div>
    <div className="recipe-item-text">
      {recipe.title}
    </div>
  </div>
</Link>
)

}

export default RecipeIndexItem
