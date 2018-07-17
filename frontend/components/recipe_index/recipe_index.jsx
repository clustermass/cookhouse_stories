import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import RecipeIndexItem from './recipe_index_item'


class RecipeIndex extends React.Component {
constructor(props){
  super(props)

    this.state = {
      recipesOnPage : props.recipesOnPage,
      searchquery   : "",
      searched : "",

    }


  this.loadMoreRecipes = this.loadMoreRecipes.bind(this)
  this.updateField = this.updateField.bind(this)
  this.queryRecipes = this.queryRecipes.bind(this)
}

loadMoreRecipes(){
  let tempQuantity = this.state.recipesOnPage
  tempQuantity++
  this.setState({recipesOnPage:tempQuantity})
}
componentDidMount(){
  this.props.importAllRecipes()
}

updateField(fieldname, e){
  this.setState({[fieldname]:e.currentTarget.value})
}

queryRecipes(e){
  e.preventDefault()
  if (this.state.searchquery.length > 0){
  this.setState({searched:this.state.searchquery})
  this.props.importQueriedRecipes(this.state.searchquery)
  }
}

componentWillReceiveProps(nextProps){
  // debugger
  // this.setState(nextProps)
}

render(){
  console.log(this.state)
  let recipesOnMain =[]
  for (let i = 0; i < this.state.recipesOnPage; i++) {
    if (this.props.recipes[i] !== undefined){
      recipesOnMain.push(this.props.recipes[i])
    }
  }

  return(
<div className="main-recipe-container">
  <div className="main-recipe-search-container">
    <form onSubmit={(e) => this.queryRecipes(e)} ><input value={this.state.searchquery} placeholder={`Search for ...`} onChange={(e) => this.updateField("searchquery", e)} type="text" className="search-field-main"></input><button type="submit" className="searchbtn">Search</button></form>
    <div>select menu</div>


    {this.state.searched.length > 0 ? (<span>Showing results matching	&#34;{this.state.searched}&#34;</span>) : (<span>Recipes</span>) }
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
