import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import RecipeIndexItem from './recipe_index_item'


class RecipeIndex extends React.Component {
constructor(props){
  super(props)
  this.state = props
  this.loadMoreRecipes = this.loadMoreRecipes.bind(this)
}

loadMoreRecipes(){
  let tempQuantity = this.state.recipesOnPage
  tempQuantity++
  this.setState({recipesOnPage:tempQuantity})
}
componentDidMount(){
  this.props.importAllRecipes()

}

componentWillReceiveProps(nextProps){
  // debugger
  // this.setState(nextProps)
}

render(){
  let recipesOnMain =[]
  for (let i = 0; i < this.state.recipesOnPage; i++) {
    if (this.props.recipes[i] !== undefined){
      recipesOnMain.push(this.props.recipes[i])
    }
  }
debugger
  return(
<div className="main-recipe-container">
  <div className="main-recipe-title">
      Recipes
  </div>
  <div className="main-recipe-image">

  {recipesOnMain.map(recipe => <RecipeIndexItem key={recipe.id} recipe={recipe} followers={this.props.followers[recipe.id]}/> )}
  </div>
<div>
  <button className="main-load-more" onClick={()=>this.loadMoreRecipes()}>More</button>
</div>
</div>
  )
}


}

export default RecipeIndex
