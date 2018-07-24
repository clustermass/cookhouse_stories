import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import RecipeIndexItem from '../recipe_index/recipe_index_item'
// import Scrollchor from 'react-scrollchor'; //Thanks to https://github.com/bySabi/react-scrollchor
// import TimeAgo from 'javascript-time-ago'
// import en from 'javascript-time-ago/locale/en'

class UserInfo extends React.Component {
  constructor(props){
    super(props)
    this.state={
      ownProfile: false,
      loadMyRecipes:true,
      recipesOnPage : props.recipesOnPage,
    }

  this.loadMoreRecipes = this.loadMoreRecipes.bind(this)
  this.switchRecipeContext = this.switchRecipeContext.bind(this)
  }

  loadMoreRecipes(){
    let tempQuantity = this.state.recipesOnPage
    tempQuantity += 24
    this.setState({recipesOnPage:tempQuantity})
  }

  switchRecipeContext(context){
    if(context === "own"){
      this.setState({loadMyRecipes:true})
    }else if(context === "likes"){
      this.setState({loadMyRecipes:false})
    }
  }

componentDidMount(){
  if (this.props.userId === this.props.currentUserId){
    // If this is user's profile, we give him write permissions.
    this.setState({ownProfile:true})
  }else{
    this.setState({ownProfile:false})
  }

  this.props.getUserById(this.props.userId)
  this.props.importAllRecipes()
}

componentWillReceiveProps(nextProps){
  if (this.props.userId != nextProps.userId){
    if (nextProps.userId === this.props.currentUserId){
      // If this is user's profile, we give him write permissions.
      this.setState({ownProfile:true})
    }else{
      this.setState({ownProfile:false})
    }
    this.props.getUserById(nextProps.userId)
    this.props.importAllRecipes()
  }
}

componentWillUnmount(){
  this.props.clearErrors()
}

render(){
  console.log(this.state)
  console.log(this.props)
  let userloaded = Boolean(this.props.usersHash[this.props.userId])
  // let recipesloaded = Object.keys(this.props.recipes).length > 0 ? true : false
  let selectedRecipes = []


if(this.state.loadMyRecipes){
  this.props.recipes.forEach((recipe)=>{
    if(userloaded && recipe.author_id === this.props.userId){
      selectedRecipes.push(recipe)
    }
  })

}
else{
  this.props.recipes.forEach((recipe)=>{
    if(userloaded && this.props.favorites.includes(recipe.id)){
      selectedRecipes.push(recipe)
    }
  })

}

  let countedRecipesOnUser =[]
  for (let i = 0; i < this.state.recipesOnPage; i++) {
    if (selectedRecipes[i] !== undefined){
      countedRecipesOnUser.push(selectedRecipes[i])
    }
  }

  let recipesBtnClass = "user-profile-btn"
  let likesBtnClass = "user-profile-btn"

  if(this.state.loadMyRecipes){
    recipesBtnClass = "user-profile-btn-pressed"
  }else{
    likesBtnClass = "user-profile-btn-pressed"
  }

  return(
    <div className="user-profile-main-container">

      <div className="user-profile-name">
        <div className="user-profile-plcaeholder">
        </div>
        <div className="user-profile-mid">

            <span>{userloaded ? (this.props.usersHash[this.props.userId].name) : (null) }</span>
            <span>{userloaded ? (this.props.usersHash[this.props.userId].username) : (null) }</span>

              <div className="user-profile-buttons-container">
                <button onClick={()=>this.switchRecipeContext("own")} className={recipesBtnClass} autoFocus={true}>{this.state.ownProfile ? ("My recipes") : ("User's recipes")}</button><button onClick={()=>this.switchRecipeContext("likes")} className={likesBtnClass}>Likes&nbsp;({this.props.favorites.length})</button>
              </div>

              <div className="user-profile-recipes-container">
                {this.state.loadMyRecipes && this.state.ownProfile  ? (<Link style={{textDecoration:"none"}}to={'/recipes/new'}><div  className="user-profile-recipes-addone">&#10010;


              </div></Link>) : (null)}
                {countedRecipesOnUser.map((recipe)=>(<RecipeIndexItem key={recipe.id} recipe={recipe} followers={this.props.followers[recipe.id]} likesArr={this.props.usersHash[this.props.currentUserId].favorite_recipes}/>))}

              </div>

              <div>
                {this.state.recipesOnPage >= selectedRecipes.length ? (null) : (<button className="main-load-more" onClick={()=>this.loadMoreRecipes()}>More</button>)}
              </div>
        </div>

        <div className="user-profile-plcaeholder">
        </div>
      </div>




    </div>)
}

}

export default UserInfo
