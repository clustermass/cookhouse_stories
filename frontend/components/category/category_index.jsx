import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import RecipeIndexItem from '../recipe_index/recipe_index_item'
import CatIndexItem from './category_index_item'

class CategoryIndex extends React.Component {
constructor(props){
  super(props)
  
  this.state ={
    category: props.category,
    recipesOnPage:props.recipesOnPage,
  }
  this.loadMoreRecipes = this.loadMoreRecipes.bind(this)
  this.pickRandomCatRecipe = this.pickRandomCatRecipe.bind(this)
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
  if(nextProps.category !== this.state.category){
    this.setState({category:nextProps.category})
  }
}

componentWillUnmount(){

}

pickRandomCatRecipe(cat){

  let catRecipes = this.props.recipes.filter((recipe)=>recipe.category_id === cat.id)
  let randomCatRecipe = catRecipes[Math.floor(Math.random() * catRecipes.length)]
  return randomCatRecipe
}

render(){
  console.log(this.state)
  let sortedByCat = []
  if(this.state.category != 0){
    sortedByCat =  this.props.recipes.filter(recipe=>(
      recipe.category_id === this.state.category
    ))
  }


  let countedRecipesOnMain = []
  for (let i = 0; i < this.state.recipesOnPage; i++) {
    if (sortedByCat[i] !== undefined){
      countedRecipesOnMain.push(sortedByCat[i])
    }
  }

  return(
<div>
    {this.props.categories.length === 0 ? (<div>Loading...</div>) : (<div>

      {this.state.category === 0 ? (
        <div>
          <div className="main-recipe-container">
          <div className="recipes-title"><span>Select category:</span></div>
          <div className="main-recipe-image">
            {this.props.categories.map((cat)=>{


              return(
                <CatIndexItem key={cat.id} cat={cat} recipe={this.pickRandomCatRecipe(cat)}/>
              )
            })}
          </div>
        </div>

        </div>
      ) : (
      <div>
      <div className="main-recipe-container">
      <div className="recipes-title"><span>
      {this.props.categoriesHash[this.state.category].name}
      </span></div>
        <div className="main-recipe-image">
        {countedRecipesOnMain.map(recipe => <RecipeIndexItem key={recipe.id} recipe={recipe} followers={this.props.followers[recipe.id]} likesArr={this.props.favorites}/> )}
        </div>
      <div>
        {this.state.recipesOnPage >= countedRecipesOnMain.length ? (null) : (<button className="main-load-more" onClick={()=>this.loadMoreRecipes()}>More</button>)}
      </div>
      </div>
      </div>)}

  </div>)}
  </div>)
}


}

export default CategoryIndex
