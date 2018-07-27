import React from "react";
import { Link } from 'react-router-dom';
const VideoIndexItem = ({ recipe, followers, likesArr }) => {


let icon = window.hearticon
if (likesArr !== undefined && likesArr.includes(recipe.id) ){
  icon = window.heartyellow2
}

return(
<div className="video-item-main-container">
  <iframe style={{border:"0px"}}width="290" height="163"src={recipe.video_url}>
  </iframe>
  <div className="likes-time-video">
  <img src={icon}/><span>{typeof followers === "undefined" ? '0' : followers.followers_count}  <span>{recipe.cooking_time} min.</span></span>
  </div>
<Link className="main-recipe-item-link-video" to={`/recipes/${recipe.id}`}>



  <div className="recipe-item-video-title">
    {recipe.title}
  </div>

  </Link>
</div>

)

}

export default VideoIndexItem
