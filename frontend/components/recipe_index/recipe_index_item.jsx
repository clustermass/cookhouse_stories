import React from "react";

const RecipeIndexItem = ({ recipe, followers }) => {

return(

  <div >

    {recipe.title}<br/>
      <img width="200" height="350" src={recipe.main_picture_url}></img><br/>
    {recipe.cooking_time} min.<br/>
  ❤{followers.followers_count}
  </div>
)

}





export default RecipeIndexItem
