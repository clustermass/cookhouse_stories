import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import RecipeIndexItem from '../recipe_index/recipe_index_item'

class CategoryIndex extends React.Component {
constructor(props){
  super(props)
  this.state ={
    category: props.category,
    recipesOnPage:props.recipesOnPage,
  }
  this.loadMoreRecipes = this.loadMoreRecipes.bind(this)
}

loadMoreRecipes(){
  let tempQuantity = this.state.recipesOnPage
  tempQuantity += 24
  this.setState({recipesOnPage:tempQuantity})
}
componentDidMount(){
    this.props.importAllRecipes()

}


componentWillReceiveProps(nextProps){

}

componentWillUnmount(){

}
render(){
  console.log(this.state)


  let countedRecipesOnMain = []
  for (let i = 0; i < this.state.recipesOnPage; i++) {
    if (this.props.recipes[i] !== undefined){
      countedRecipesOnMain.push(this.props.recipes[i])
    }
  }

  return(<div>
<div className="main-recipe-container">
<div className="recipes-title"><span>Recipes</span></div>
  <div className="main-recipe-image">
  {countedRecipesOnMain.map(recipe => <RecipeIndexItem key={recipe.id} recipe={recipe} followers={this.props.followers[recipe.id]} likesArr={this.props.favorites}/> )}
  </div>
<div>
  {this.state.recipesOnPage >= countedRecipesOnMain.length ? (null) : (<button className="main-load-more" onClick={()=>this.loadMoreRecipes()}>More</button>)}
</div>
</div>
</div>)
}


}

export default CategoryIndex
