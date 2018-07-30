import React from "react";
import { Link } from 'react-router-dom';
const CatIndexItem = ({ recipe, cat, recipes}) => {


  let recipeItemBgImgStyle = {
    backgroundImage: "url(" + recipe.main_picture_url  + ")",
    backgroundRepeat  : 'no-repeat',
    backgroundPosition: 'center',
    backgroundHeight: '100%',
  };

  if (recipes > 0 ){
    return(
    <Link className="main-recipe-item-link" to={`/category/${cat.id}`}>
      <div className="recipe-item">
        <div className="recipe-item-img" style={ recipeItemBgImgStyle }>
          <div className="cat-name-index-item">
            <div>{cat.name}</div>
          </div>
        </div>

      </div>
    </Link>
    )
  }else{
    return null
  }

}

export default CatIndexItem
