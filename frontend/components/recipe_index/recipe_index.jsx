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
      starter : "checkbox-off",
      main: "checkbox-off",
      dessert: "checkbox-off",
      snack: "checkbox-off",
      breakfast: "checkbox-off",
      drink: "checkbox-off",
      easy: "checkbox-off",
      medium: "checkbox-off",
      hard: "checkbox-off",
      vegetarian: "checkbox-off",
      vegan: "checkbox-off",
      sugarfree: "checkbox-off",
      lactosefree: "checkbox-off",
      glutenfree: "checkbox-off",
      alcoholfree: "checkbox-off",
      twenty: "checkbox-off",
      thirty: "checkbox-off",
      sixty: "checkbox-off",
      beef: "checkbox-off",
      pasta: "checkbox-off",
      poultry: "checkbox-off",
      pork: "checkbox-off",
      chinese: "checkbox-off",
      italian: "checkbox-off",
      indian: "checkbox-off",
      spanish: "checkbox-off",
      american: "checkbox-off",
      eastern: "checkbox-off",
      asian: "checkbox-off",
      french: "checkbox-off",
      european: "checkbox-off",
      catAsian: "checkbox-off",
      catWeekend: "checkbox-off",
      catUnder: "checkbox-off",
      catLowCarb: "checkbox-off",
    }


  this.loadMoreRecipes = this.loadMoreRecipes.bind(this)
  this.updateField = this.updateField.bind(this)
  this.queryRecipes = this.queryRecipes.bind(this)
  this.switchCheckBox = this.switchCheckBox.bind(this)
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

switchCheckBox(field){
  if (this.state[field] == "checkbox-off"){
    this.setState({[field]:"checkbox-on"})
  }
  else{
    this.setState({[field]:"checkbox-off"})
  }


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

  let clearAllBtns = {}
  // clearAllBtns.push(this.state.starter)
  // clearAllBtns.push(this.state.main)
  // clearAllBtns.push(this.state.dessert)
  // clearAllBtns.push(this.state.snack)
  // clearAllBtns.push(this.state.breakfast)
  // clearAllBtns.push(this.state.drink)
  // clearAllBtns.push(this.state.easy)
  // clearAllBtns.push(this.state.medium)
  // clearAllBtns.push(this.state.hard)
  // clearAllBtns.push(this.state.starter)
  // clearAllBtns.push(this.state.vegetarian)
  // clearAllBtns.push(this.state.vegan)
  // clearAllBtns.push(this.state.sugarfree)
  // clearAllBtns.push(this.state.lactosefree)
  // clearAllBtns.push(this.state.glutenfree)
  // clearAllBtns.push(this.state.alcoholfree)
  // clearAllBtns.push(this.state.twenty)
  // clearAllBtns.push(this.state.thirty)
  // clearAllBtns.push(this.state.sixty)
  // clearAllBtns.push(this.state.beef)
  // clearAllBtns.push(this.state.pasta)
  // clearAllBtns.push(this.state.poultry)
  // clearAllBtns.push(this.state.pork)
  // clearAllBtns.push(this.state.chinese)
  // clearAllBtns.push(this.state.italian)
  // clearAllBtns.push(this.state.indian)
  // clearAllBtns.push(this.state.spanish)
  // clearAllBtns.push(this.state.american)
  // clearAllBtns.push(this.state.eastern)
  // clearAllBtns.push(this.state.asian)
  // clearAllBtns.push(this.state.french)
  // clearAllBtns.push(this.state.european)
  // clearAllBtns = clearAllBtns.map((el)=>{if (el === "checkbox-on"){return el}})

  let resetBtns = "main-recipe-search-reset-btns-off"
  let categoryClass = "main-recipe-search-dropbtn"
  if(this.state.starter === "checkbox-on" ||
  this.state.main === "checkbox-on" ||
  this.state.dessert === "checkbox-on" ||
  this.state.snack === "checkbox-on" ||
  this.state.breakfast === "checkbox-on" ||
  this.state.drink === "checkbox-on"){
    categoryClass = "main-recipe-search-dropbtn-on"
    resetBtns = "main-recipe-search-reset-btns"
  }
  let difficultyClass = "main-recipe-search-dropbtn"
  if(this.state.easy === "checkbox-on" ||
  this.state.medium === "checkbox-on" ||
  this.state.hard === "checkbox-on"
  ){
    difficultyClass = "main-recipe-search-dropbtn-on"
    resetBtns = "main-recipe-search-reset-btns"
  }

  let dietClass = "main-recipe-search-dropbtn"
  if(this.state.vegetarian === "checkbox-on" ||
  this.state.vegan === "checkbox-on" ||
  this.state.sugarfree === "checkbox-on" ||
  this.state.lactosefree === "checkbox-on" ||
  this.state.glutenfree === "checkbox-on" ||
  this.state.alcoholfree === "checkbox-on"
  ){
    dietClass = "main-recipe-search-dropbtn-on"
    resetBtns = "main-recipe-search-reset-btns"
  }
  let preparationClass = "main-recipe-search-dropbtn"
  if(this.state.twenty === "checkbox-on" ||
  this.state.thirty === "checkbox-on" ||
  this.state.sixty === "checkbox-on"
  ){
    preparationClass = "main-recipe-search-dropbtn-on"
    resetBtns = "main-recipe-search-reset-btns"
  }
  let ingredientsClass = "main-recipe-search-dropbtn"
  if(this.state.beef === "checkbox-on" ||
  this.state.pasta === "checkbox-on" ||
  this.state.poultry === "checkbox-on" ||
  this.state.pork === "checkbox-on"
  ){
    ingredientsClass = "main-recipe-search-dropbtn-on"
    resetBtns = "main-recipe-search-reset-btns"
  }
  let cuisineClass = "main-recipe-search-dropbtn"
  if(this.state.chinese === "checkbox-on" ||
  this.state.italian === "checkbox-on" ||
  this.state.indian === "checkbox-on" ||
  this.state.spanish === "checkbox-on" ||
  this.state.american === "checkbox-on" ||
  this.state.eastern === "checkbox-on" ||
  this.state.asian === "checkbox-on" ||
  this.state.french === "checkbox-on" ||
  this.state.european === "checkbox-on"
  ){
    cuisineClass = "main-recipe-search-dropbtn-on"
    resetBtns = "main-recipe-search-reset-btns"
  }

  return(<div>
    <div className="main-recipe-search-container">
      <div className="main-recipe-search-box">
        <form onSubmit={(e) => this.queryRecipes(e)} ><input value={this.state.searchquery} placeholder={`Search for ...`} onChange={(e) => this.updateField("searchquery", e)} type="text" className="search-field-main"></input><button type="submit" className="searchbtn">Search</button></form>
      </div>
      <div className="main-recipe-search-buttons">

        <div className="dropdown">
          <button className={categoryClass}>Category &#9662;</button>
        <div className="dropdown-content">

          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("starter")}>
              {this.state.starter === "checkbox-on" ? (
                clearAllBtns["starter"] = "Starter",
                (<div className={this.state.starter}>&#10004;</div>)) : (<div className={this.state.starter}></div>)}
            <span>Starter</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("main")}>
            {this.state.main === "checkbox-on" ? (<div className={this.state.main}>&#10004;</div>) : (<div className={this.state.main}></div>)}
            <span>Main</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("dessert")}>
          {this.state.dessert === "checkbox-on" ? (<div className={this.state.dessert}>&#10004;</div>) : (<div className={this.state.dessert}></div>)}
            <span>Dessert</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("snack")}>
              {this.state.snack === "checkbox-on" ? (<div className={this.state.snack}>&#10004;</div>) : (<div className={this.state.snack}></div>)}
            <span>Starter</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("breakfast")}>
            {this.state.breakfast === "checkbox-on" ? (<div className={this.state.breakfast}>&#10004;</div>) : (<div className={this.state.breakfast}></div>)}
            <span>Main</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("drink")}>
          {this.state.drink === "checkbox-on" ? (<div className={this.state.drink}>&#10004;</div>) : (<div className={this.state.drink}></div>)}
            <span>Dessert</span>
          </div>

        </div>
        </div>

        <div className="dropdown">
          <button className={difficultyClass}>Difficulty &#9662;</button>
        <div className="dropdown-content">
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("easy")}>
              {this.state.easy === "checkbox-on" ? (<div className={this.state.easy}>&#10004;</div>) : (<div className={this.state.easy}></div>)}
            <span>Easy</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("medium")}>
            {this.state.medium === "checkbox-on" ? (<div className={this.state.medium}>&#10004;</div>) : (<div className={this.state.medium}></div>)}
            <span>Medium</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("hard")}>
          {this.state.hard === "checkbox-on" ? (<div className={this.state.hard}>&#10004;</div>) : (<div className={this.state.hard}></div>)}
            <span>Hard</span>
          </div>
        </div>
        </div>

        <div className="dropdown">
          <button className={dietClass}>Diet &#9662;</button>
        <div className="dropdown-content">
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("vegetarian")}>
              {this.state.vegetarian === "checkbox-on" ? (<div className={this.state.vegetarian}>&#10004;</div>) : (<div className={this.state.vegetarian}></div>)}
            <span>Vegetarian</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("vegan")}>
            {this.state.vegan === "checkbox-on" ? (<div className={this.state.vegan}>&#10004;</div>) : (<div className={this.state.vegan}></div>)}
            <span>Vegan</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("sugarfree")}>
          {this.state.sugarfree === "checkbox-on" ? (<div className={this.state.sugarfree}>&#10004;</div>) : (<div className={this.state.sugarfree}></div>)}
            <span>Sugar-Free</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("lactosefree")}>
              {this.state.lactosefree === "checkbox-on" ? (<div className={this.state.lactosefree}>&#10004;</div>) : (<div className={this.state.lactosefree}></div>)}
            <span>Lactose-Free</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("glutenfree")}>
            {this.state.glutenfree === "checkbox-on" ? (<div className={this.state.glutenfree}>&#10004;</div>) : (<div className={this.state.glutenfree}></div>)}
            <span>Gluten-Free</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("alcoholfree")}>
          {this.state.alcoholfree === "checkbox-on" ? (<div className={this.state.alcoholfree}>&#10004;</div>) : (<div className={this.state.alcoholfree}></div>)}
            <span>Alcohol-Free</span>
          </div>
        </div>
        </div>


        <div className="dropdown">
          <button className={preparationClass}>Preparation &#9662;</button>
        <div className="dropdown-content">
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("twenty")}>
              {this.state.twenty === "checkbox-on" ? (<div className={this.state.twenty}>&#10004;</div>) : (<div className={this.state.twenty}></div>)}
            <span>under 20 min.</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("thirty")}>
            {this.state.thirty === "checkbox-on" ? (<div className={this.state.thirty}>&#10004;</div>) : (<div className={this.state.thirty}></div>)}
            <span>under 30 min.</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("sixty")}>
          {this.state.sixty === "checkbox-on" ? (<div className={this.state.sixty}>&#10004;</div>) : (<div className={this.state.sixty}></div>)}
            <span>under 60 min.</span>
          </div>
        </div>
        </div>


        <div className="dropdown">
          <button className={ingredientsClass}>Main ingredients &#9662;</button>
        <div className="dropdown-content">
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("beef")}>
              {this.state.beef === "checkbox-on" ? (<div className={this.state.beef}>&#10004;</div>) : (<div className={this.state.beef}></div>)}
            <span>Beef</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("pasta")}>
            {this.state.pasta === "checkbox-on" ? (<div className={this.state.pasta}>&#10004;</div>) : (<div className={this.state.pasta}></div>)}
            <span>Pasta</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("poultry")}>
          {this.state.poultry === "checkbox-on" ? (<div className={this.state.poultry}>&#10004;</div>) : (<div className={this.state.poultry}></div>)}
            <span>Poultry</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("pork")}>
          {this.state.pork === "checkbox-on" ? (<div className={this.state.pork}>&#10004;</div>) : (<div className={this.state.pork}></div>)}
            <span>Pork</span>
          </div>
        </div>
        </div>

        <div className="dropdown">
          <button className={cuisineClass}>Cuisine &#9662;</button>
        <div className="dropdown-content">
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("chinese")}>
              {this.state.chinese === "checkbox-on" ? (<div className={this.state.chinese}>&#10004;</div>) : (<div className={this.state.chinese}></div>)}
            <span>Chinese</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("italian")}>
            {this.state.italian === "checkbox-on" ? (<div className={this.state.italian}>&#10004;</div>) : (<div className={this.state.italian}></div>)}
            <span>Italian</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("indian")}>
          {this.state.indian === "checkbox-on" ? (<div className={this.state.indian}>&#10004;</div>) : (<div className={this.state.indian}></div>)}
            <span>Indian</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("spanish")}>
          {this.state.spanish === "checkbox-on" ? (<div className={this.state.spanish}>&#10004;</div>) : (<div className={this.state.spanish}></div>)}
            <span>Spanish</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("american")}>
              {this.state.american === "checkbox-on" ? (<div className={this.state.american}>&#10004;</div>) : (<div className={this.state.american}></div>)}
            <span>American</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("eastern")}>
            {this.state.eastern === "checkbox-on" ? (<div className={this.state.eastern}>&#10004;</div>) : (<div className={this.state.eastern}></div>)}
            <span>Middle Eastern</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("asian")}>
          {this.state.asian === "checkbox-on" ? (<div className={this.state.asian}>&#10004;</div>) : (<div className={this.state.asian}></div>)}
            <span>Asian</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("french")}>
          {this.state.french === "checkbox-on" ? (<div className={this.state.french}>&#10004;</div>) : (<div className={this.state.french}></div>)}
            <span>French</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("european")}>
          {this.state.european === "checkbox-on" ? (<div className={this.state.european}>&#10004;</div>) : (<div className={this.state.european}></div>)}
            <span>European</span>
          </div>
        </div>
        </div>



      </div>

      <div className={resetBtns}><span>Active filters:</span>

      {Object.keys(clearAllBtns).map((key,idx)=>(<button key={idx} className="main-recipe-search-clear-all">{clearAllBtns[key]}</button>))}
      <button className="main-recipe-search-clear-all">Clear all</button>

    </div>
    </div>
    {resetBtns === "main-recipe-search-reset-btns" ? (<div className="hr"></div>) : (null)}
<div className="main-recipe-container">
{this.state.searched.length > 0 ? (<div className="recipes-title"><span>Showing results matching	&#34;{this.state.searched}&#34;</span></div>) : (<div className="recipes-title"><span>Recipes</span></div>) }
  <div className="main-recipe-image">
  {recipesOnMain.map(recipe => <RecipeIndexItem key={recipe.id} recipe={recipe} followers={this.props.followers[recipe.id]}/> )}
  </div>
<div>
  <button className="main-load-more" onClick={()=>this.loadMoreRecipes()}>More</button>
</div>
</div>
</div>)
}


}

export default RecipeIndex
