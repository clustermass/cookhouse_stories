import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import RecipeIndexItem from './recipe_index_item'


class RecipeIndex extends React.Component {
constructor(props){
  super(props)
  // debugger
    if (Object.keys(props.state).length === 0) {
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
        catLowCarb: "checkbox-off",}
      }else{
        this.state = props.state
      }




  this.loadMoreRecipes = this.loadMoreRecipes.bind(this)
  this.updateField = this.updateField.bind(this)
  this.queryRecipes = this.queryRecipes.bind(this)
  this.switchCheckBox = this.switchCheckBox.bind(this)
  this.resetAllFilters = this.resetAllFilters.bind(this)
}




loadMoreRecipes(){
  let tempQuantity = this.state.recipesOnPage
  tempQuantity += 24
  this.setState({recipesOnPage:tempQuantity})
}
componentDidMount(){
  if(Object.keys(this.props.state).length === 0){
    //No previous search/filters were set, let's load all recipes
    this.props.importAllRecipes()
  }else if (this.state.searchquery === "") {
    //Previous filters are applied, but no search needed. Loading all recipes
    this.props.importAllRecipes()
  }else if (this.state.searchquery != ""){
    //Previous filters are applied, search was applied, loading only recipes that satisfy search criteria
    this.props.importQueriedRecipes(this.state.searchquery)
  }

}

updateField(fieldname, e){
  this.setState({[fieldname]:e.currentTarget.value},()=>{
    //This can only be called if user erased previously entered query string.
    // If user doesn't want to search for something specific, let's load all recipes.
    if(this.state.searchquery === ""){
      this.props.importAllRecipes()
      this.setState({searched : ""})
    }
  })
}

switchCheckBox(field){
  if (this.state[field] == "checkbox-off"){
    //Handling time selection where we force single selection.
    if (field === "twenty"){
      this.setState({[field]:"checkbox-on",
      thirty:"checkbox-off",
      sixty:"checkbox-off"})
    }else if(field === "thirty"){
      this.setState({[field]:"checkbox-on",
      twenty:"checkbox-off",
      sixty:"checkbox-off"})
    }else if(field === "sixty"){
      this.setState({[field]:"checkbox-on",
      twenty:"checkbox-off",
      thirty:"checkbox-off"})
    }else{
      this.setState({[field]:"checkbox-on"})
    }
  }
  //^^ Handling time selection where we force single selection.
  else{
    this.setState({[field]:"checkbox-off"})
  }


}

resetAllFilters(){
  this.setState({
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
  european: "checkbox-off"})
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

componentWillUnmount(){
  this.props.saveSearchFilters(this.state)
}
render(){
  console.log(this.state)

  let filterIds = {}
  this.props.categories.forEach((el)=>{
    if(el.name.toLowerCase() === "starter"){
      filterIds["starter"] = el.id
    }else if (el.name.toLowerCase() === "main") {
      filterIds["main"] = el.id

    } else if (el.name.toLowerCase() === "dessert") {
      filterIds["dessert"] = el.id

    }else if (el.name.toLowerCase() === "snack") {
      filterIds["snack"] = el.id

    }else if (el.name.toLowerCase() === "breakfast") {
      filterIds["breakfast"] = el.id

    }else if (el.name.toLowerCase() === "drink") {
      filterIds["drink"] = el.id
    }
  })

    filterIds["chinese"] = []
    filterIds["italian"] = []
    filterIds["indian"] = []
    filterIds["spanish"] = []
    filterIds["american"] = []
    filterIds["eastern"] = []
    filterIds["asian"] = []
    filterIds["french"] = []
    filterIds["european"] = []



  this.props.cuisines.forEach((el)=>{
    if(el.country.toLowerCase() === "china"){
      if(!filterIds["chinese"].includes(el.id)){
        filterIds["chinese"].push(el.id)
      }

    }else if (el.country.toLowerCase() === "italy") {
      if(!filterIds["italian"].includes(el.id)){
        filterIds["italian"].push(el.id)
      }
    } else if (el.country.toLowerCase() === "india") {
      if(!filterIds["indian"].includes(el.id)){
        filterIds["indian"].push(el.id)
      }
    }else if (el.country.toLowerCase() === "spain") {
      if(!filterIds["spanish"].includes(el.id)){
        filterIds["spanish"].push(el.id)
      }

    }else if (el.country.toLowerCase() === "america") {
      if(!filterIds["american"].includes(el.id)){
        filterIds["american"].push(el.id)
      }

    }else if (el.country.toLowerCase() === "east") {
      if(!filterIds["eastern"].includes(el.id)){
        filterIds["eastern"].push(el.id)
      }

    }else if (el.country.toLowerCase() === "asia") {
      if(!filterIds["asian"].includes(el.id)){
        filterIds["asian"].push(el.id)
      }

    }else if (el.country.toLowerCase() === "france") {
      if(!filterIds["french"].includes(el.id)){
        filterIds["french"].push(el.id)
      }

    }else if (el.country.toLowerCase() === "europe") {
      if(!filterIds["european"].includes(el.id)){
        filterIds["european"].push(el.id)
      }
    }
  })

  this.props.diets.forEach((el)=>{
    if(el.name.toLowerCase() === "vegetarian"){
      filterIds["vegetarian"] = el.id
    }else if (el.name.toLowerCase() === "vegan") {
      filterIds["vegan"] = el.id

    } else if (el.name.toLowerCase() === "sugar-free") {
      filterIds["sugarfree"] = el.id

    }else if (el.name.toLowerCase() === "lactose-free") {
      filterIds["lactosefree"] = el.id

    }else if (el.name.toLowerCase() === "gluten-free") {
      filterIds["glutenfree"] = el.id

    }else if (el.name.toLowerCase() === "alcohol-free") {
      filterIds["alcoholfree"] = el.id
    }
  })

  this.props.difficulties.forEach((el)=>{
    if(el.level.toLowerCase() === "easy"){
      filterIds["easy"] = el.id
    }else if (el.level.toLowerCase() === "medium") {
      filterIds["medium"] = el.id
    } else if (el.level.toLowerCase() === "hard") {
      filterIds["hard"] = el.id
    }
  })

  this.props.main_ingredients.forEach((el)=>{
    if(el.name.toLowerCase() === "beef"){
      filterIds["beef"] = el.id
    }else if (el.name.toLowerCase() === "pasta") {
      filterIds["pasta"] = el.id
    } else if (el.name.toLowerCase() === "poultry") {
      filterIds["poultry"] = el.id
    } else if (el.name.toLowerCase() === "pork") {
      filterIds["pork"] = el.id
    }
  })


  console.log(filterIds)

  let recipesOnMain = this.props.recipes
  console.log(recipesOnMain)

  let clearAllBtns = {}

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

    recipesOnMain = recipesOnMain.filter((recipe)=>{
      if (this.state.starter === "checkbox-on" && recipe.category_id === filterIds["starter"]){
        return true
      }
      if (this.state.main === "checkbox-on" && recipe.category_id === filterIds["main"]){
        return true
      }
      if (this.state.dessert === "checkbox-on"  && recipe.category_id === filterIds["dessert"]){
        return true
      }
      if (this.state.snack === "checkbox-on"  && recipe.category_id === filterIds["snack"]){
        return true
      }
      if (this.state.breakfast === "checkbox-on"  && recipe.category_id === filterIds["breakfast"]){
        return true
      }
      if (this.state.drink === "checkbox-on"  && recipe.category_id === filterIds["drink"]){
        return true
      }else{
        return false
      }
    })

  }
  let difficultyClass = "main-recipe-search-dropbtn"
  if(this.state.easy === "checkbox-on" ||
  this.state.medium === "checkbox-on" ||
  this.state.hard === "checkbox-on"
  ){
    difficultyClass = "main-recipe-search-dropbtn-on"
    resetBtns = "main-recipe-search-reset-btns"
    recipesOnMain = recipesOnMain.filter((recipe)=>{
      if (this.state.easy === "checkbox-on" && recipe.difficulty_id === filterIds["easy"]){
        return true
      }
      if (this.state.medium === "checkbox-on" && recipe.difficulty_id === filterIds["medium"]){
        return true
      }
      if (this.state.hard === "checkbox-on"  && recipe.difficulty_id === filterIds["hard"]){
        return true
      }else{
        return false
      }
    })

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
    recipesOnMain = recipesOnMain.filter((recipe)=>{
      if (this.state.vegetarian === "checkbox-on" && recipe.diet_id === filterIds["vegetarian"]){
        return true
      }
      if (this.state.vegan === "checkbox-on" && recipe.diet_id === filterIds["vegan"]){
        return true
      }
      if (this.state.sugarfree === "checkbox-on"  && recipe.diet_id === filterIds["sugarfree"]){
        return true
      }
      if (this.state.lactosefree === "checkbox-on" && recipe.diet_id === filterIds["lactosefree"]){
        return true
      }
      if (this.state.glutenfree === "checkbox-on" && recipe.diet_id === filterIds["glutenfree"]){
        return true
      }
      if (this.state.alcoholfree === "checkbox-on"  && recipe.diet_id === filterIds["alcoholfree"]){
        return true
      }
      else{
        return false
      }
    })

  }
  let preparationClass = "main-recipe-search-dropbtn"
  if(this.state.twenty === "checkbox-on" ||
  this.state.thirty === "checkbox-on" ||
  this.state.sixty === "checkbox-on"
  ){
    preparationClass = "main-recipe-search-dropbtn-on"
    resetBtns = "main-recipe-search-reset-btns"
    recipesOnMain = recipesOnMain.filter(recipe=>{
      if (this.state.twenty === "checkbox-on" && recipe.cooking_time <= 20){
        return true
      }
      if (this.state.thirty === "checkbox-on" && recipe.cooking_time <= 30){
        return true
      }
      if (this.state.sixty === "checkbox-on"  && recipe.cooking_time <= 60){
        return true
      }
      else{
        return false
      }
    })
  }
  let ingredientsClass = "main-recipe-search-dropbtn"
  if(this.state.beef === "checkbox-on" ||
  this.state.pasta === "checkbox-on" ||
  this.state.poultry === "checkbox-on" ||
  this.state.pork === "checkbox-on"
  ){
    ingredientsClass = "main-recipe-search-dropbtn-on"
    resetBtns = "main-recipe-search-reset-btns"
    recipesOnMain = recipesOnMain.filter((recipe)=>{
      if (this.state.beef === "checkbox-on" && recipe.main_ingredient_id === filterIds["beef"]){
        return true
      }
      if (this.state.pasta === "checkbox-on" && recipe.main_ingredient_id === filterIds["pasta"]){
        return true
      }
      if (this.state.poultry === "checkbox-on"  && recipe.main_ingredient_id === filterIds["poultry"]){
        return true
      }
      if (this.state.pork === "checkbox-on"  && recipe.main_ingredient_id === filterIds["pork"]){
        return true
      }else{
        return false
      }
    })

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
    recipesOnMain = recipesOnMain.filter((recipe)=>{
      if (this.state.chinese === "checkbox-on" && filterIds["chinese"].includes(recipe.cuisine_id)){
        return true
      }
      if (this.state.italian === "checkbox-on" && filterIds["italian"].includes(recipe.cuisine_id)){
        return true
      }
      if (this.state.indian === "checkbox-on"  && filterIds["indian"].includes(recipe.cuisine_id)){
        return true
      }
      if (this.state.spanish === "checkbox-on"  && filterIds["spanish"].includes(recipe.cuisine_id)){
        return true
      }
      if (this.state.american === "checkbox-on"  && filterIds["american"].includes(recipe.cuisine_id)){
        return true
      }
      if (this.state.eastern === "checkbox-on"  && filterIds["eastern"].includes(recipe.cuisine_id)){
        return true
      }
      if (this.state.asian === "checkbox-on"  && filterIds["asian"].includes(recipe.cuisine_id)){
        return true
      }
      if (this.state.french === "checkbox-on"  && filterIds["french"].includes(recipe.cuisine_id)){
        return true
      }
      if (this.state.european === "checkbox-on"  && filterIds["european"].includes(recipe.cuisine_id)){
        return true
      }
      else{
        return false
      }
    })

  }

  let countedRecipesOnMain =[]

  for (let i = 0; i < this.state.recipesOnPage; i++) {
    if (recipesOnMain[i] !== undefined){
      countedRecipesOnMain.push(recipesOnMain[i])
    }
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
            {this.state.main === "checkbox-on" ? (
                clearAllBtns["main"] = "Main",
                (<div className={this.state.main}>&#10004;</div>)) : (<div className={this.state.main}></div>)}
            <span>Main</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("dessert")}>
          {this.state.dessert === "checkbox-on" ? (
                clearAllBtns["dessert"] = "Dessert",
                (<div className={this.state.dessert}>&#10004;</div>)) : (<div className={this.state.dessert}></div>)}
            <span>Dessert</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("snack")}>
              {this.state.snack === "checkbox-on" ? (
                clearAllBtns["snack"] = "Snack",
                (<div className={this.state.snack}>&#10004;</div>)) : (<div className={this.state.snack}></div>)}
            <span>Snack</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("breakfast")}>
            {this.state.breakfast === "checkbox-on" ? (
                clearAllBtns["breakfast"] = "Breakfast",
                (<div className={this.state.breakfast}>&#10004;</div>)) : (<div className={this.state.breakfast}></div>)}
            <span>Breakfast</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("drink")}>
          {this.state.drink === "checkbox-on" ? (
                clearAllBtns["drink"] = "Drink",
                (<div className={this.state.drink}>&#10004;</div>)) : (<div className={this.state.drink}></div>)}
            <span>Drink</span>
          </div>

        </div>
        </div>

        <div className="dropdown">
          <button className={difficultyClass}>Difficulty &#9662;</button>
        <div className="dropdown-content">
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("easy")}>
              {this.state.easy === "checkbox-on" ? (
                clearAllBtns["easy"] = "Easy",
                (<div className={this.state.easy}>&#10004;</div>)) : (<div className={this.state.easy}></div>)}
            <span>Easy</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("medium")}>
            {this.state.medium === "checkbox-on" ? (
                clearAllBtns["medium"] = "Medium",
                (<div className={this.state.medium}>&#10004;</div>)) : (<div className={this.state.medium}></div>)}
            <span>Medium</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("hard")}>
          {this.state.hard === "checkbox-on" ? (
                clearAllBtns["hard"] = "Hard",
                (<div className={this.state.hard}>&#10004;</div>)) : (<div className={this.state.hard}></div>)}
            <span>Hard</span>
          </div>
        </div>
        </div>

        <div className="dropdown">
          <button className={dietClass}>Diet &#9662;</button>
        <div className="dropdown-content">
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("vegetarian")}>
              {this.state.vegetarian === "checkbox-on" ? (
                clearAllBtns["vegetarian"] = "Vegetarian",
                (<div className={this.state.vegetarian}>&#10004;</div>)) : (<div className={this.state.vegetarian}></div>)}
            <span>Vegetarian</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("vegan")}>
            {this.state.vegan === "checkbox-on" ? (
                clearAllBtns["vegan"] = "Vegan",
                (<div className={this.state.vegan}>&#10004;</div>)) : (<div className={this.state.vegan}></div>)}
            <span>Vegan</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("sugarfree")}>
          {this.state.sugarfree === "checkbox-on" ? (
                clearAllBtns["sugarfree"] = "Sugar-Free",
                (<div className={this.state.sugarfree}>&#10004;</div>)) : (<div className={this.state.sugarfree}></div>)}
            <span>Sugar-Free</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("lactosefree")}>
              {this.state.lactosefree === "checkbox-on" ? (
                clearAllBtns["lactosefree"] = "Lactose-Free",
                (<div className={this.state.lactosefree}>&#10004;</div>)) : (<div className={this.state.lactosefree}></div>)}
            <span>Lactose-Free</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("glutenfree")}>
            {this.state.glutenfree === "checkbox-on" ? (
                clearAllBtns["glutenfree"] = "Gluten-Free",
                (<div className={this.state.glutenfree}>&#10004;</div>)) : (<div className={this.state.glutenfree}></div>)}
            <span>Gluten-Free</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("alcoholfree")}>
          {this.state.alcoholfree === "checkbox-on" ? (
                clearAllBtns["alcoholfree"] = "Alcohol-Free",
                (<div className={this.state.alcoholfree}>&#10004;</div>)) : (<div className={this.state.alcoholfree}></div>)}
            <span>Alcohol-Free</span>
          </div>
        </div>
        </div>


        <div className="dropdown">
          <button className={preparationClass}>Preparation &#9662;</button>
        <div className="dropdown-content">
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("twenty")}>
              {this.state.twenty === "checkbox-on" ? (
                clearAllBtns["twenty"] = "under 20 min.",
                (<div className={this.state.twenty}>&#10004;</div>)) : (<div className={this.state.twenty}></div>)}
            <span>under 20 min.</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("thirty")}>
            {this.state.thirty === "checkbox-on" ? (
                clearAllBtns["thirty"] = "under 30 min.",
                (<div className={this.state.thirty}>&#10004;</div>)) : (<div className={this.state.thirty}></div>)}
            <span>under 30 min.</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("sixty")}>
          {this.state.sixty === "checkbox-on" ? (
                clearAllBtns["sixty"] = "under 60 min.",
                (<div className={this.state.sixty}>&#10004;</div>)) : (<div className={this.state.sixty}></div>)}
            <span>under 60 min.</span>
          </div>
        </div>
        </div>


        <div className="dropdown">
          <button className={ingredientsClass}>Main ingredients &#9662;</button>
        <div className="dropdown-content">
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("beef")}>
              {this.state.beef === "checkbox-on" ? (
                clearAllBtns["beef"] = "Beef",
                (<div className={this.state.beef}>&#10004;</div>)) : (<div className={this.state.beef}></div>)}
            <span>Beef</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("pasta")}>
            {this.state.pasta === "checkbox-on" ? (
                clearAllBtns["pasta"] = "Pasta",
                (<div className={this.state.pasta}>&#10004;</div>)) : (<div className={this.state.pasta}></div>)}
            <span>Pasta</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("poultry")}>
          {this.state.poultry === "checkbox-on" ? (
                clearAllBtns["poultry"] = "Poultry",
                (<div className={this.state.poultry}>&#10004;</div>)) : (<div className={this.state.poultry}></div>)}
            <span>Poultry</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("pork")}>
          {this.state.pork === "checkbox-on" ? (
                clearAllBtns["pork"] = "Pork",
                (<div className={this.state.pork}>&#10004;</div>)) : (<div className={this.state.pork}></div>)}
            <span>Pork</span>
          </div>
        </div>
        </div>

        <div className="dropdown">
          <button className={cuisineClass}>Cuisine &#9662;</button>
        <div className="dropdown-content">
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("chinese")}>
              {this.state.chinese === "checkbox-on" ? (
                clearAllBtns["chinese"] = "Chinese",
                (<div className={this.state.chinese}>&#10004;</div>)) : (<div className={this.state.chinese}></div>)}
            <span>Chinese</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("italian")}>
            {this.state.italian === "checkbox-on" ? (
                clearAllBtns["italian"] = "Italian",
                (<div className={this.state.italian}>&#10004;</div>)) : (<div className={this.state.italian}></div>)}
            <span>Italian</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("indian")}>
          {this.state.indian === "checkbox-on" ? (
                clearAllBtns["indian"] = "Indian",
                (<div className={this.state.indian}>&#10004;</div>)) : (<div className={this.state.indian}></div>)}
            <span>Indian</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("spanish")}>
          {this.state.spanish === "checkbox-on" ? (
                clearAllBtns["spanish"] = "Spanish",
                (<div className={this.state.spanish}>&#10004;</div>)) : (<div className={this.state.spanish}></div>)}
            <span>Spanish</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("american")}>
              {this.state.american === "checkbox-on" ? (
                clearAllBtns["american"] = "American",
                (<div className={this.state.american}>&#10004;</div>)) : (<div className={this.state.american}></div>)}
            <span>American</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("eastern")}>
            {this.state.eastern === "checkbox-on" ? (
                clearAllBtns["eastern"] = "Middle Eastern",
                (<div className={this.state.eastern}>&#10004;</div>)) : (<div className={this.state.eastern}></div>)}
            <span>Middle Eastern</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("asian")}>
          {this.state.asian === "checkbox-on" ? (
                clearAllBtns["asian"] = "Asian",
                (<div className={this.state.asian}>&#10004;</div>)) : (<div className={this.state.asian}></div>)}
            <span>Asian</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("french")}>
          {this.state.french === "checkbox-on" ? (
                clearAllBtns["french"] = "French",
                (<div className={this.state.french}>&#10004;</div>)) : (<div className={this.state.french}></div>)}
            <span>French</span>
          </div>
          <div className="main-recipe-search-menuitem" onClick={()=>this.switchCheckBox("european")}>
          {this.state.european === "checkbox-on" ? (
                clearAllBtns["european"] = "European",
                (<div className={this.state.european}>&#10004;</div>)) : (<div className={this.state.european}></div>)}
            <span>European</span>
          </div>
        </div>
        </div>



      </div>

      <div className={resetBtns}><span>Active filters:</span>

      {Object.keys(clearAllBtns).map((key,idx)=>(<button  onClick={()=>this.switchCheckBox(key)} key={idx} className="main-recipe-search-clear-one">{clearAllBtns[key]}&nbsp;x</button>))}
      <button onClick={()=>this.resetAllFilters()}className="main-recipe-search-clear-all">Clear all</button>

    </div>
    </div>
    {resetBtns === "main-recipe-search-reset-btns" ? (<div className="hr"></div>) : (null)}
<div className="main-recipe-container">
{this.state.searched.length > 0 ? (<div className="recipes-title"><span>Showing results matching	&#34;{this.state.searched}&#34;</span></div>) : (<div className="recipes-title"><span>Recipes</span></div>) }
  <div className="main-recipe-image">
  {countedRecipesOnMain.map(recipe => <RecipeIndexItem key={recipe.id} recipe={recipe} followers={this.props.followers[recipe.id]} likesArr={this.props.favorites}/> )}
  </div>
<div>
  {this.state.recipesOnPage >= recipesOnMain.length ? (null) : (<button className="main-load-more" onClick={()=>this.loadMoreRecipes()}>More</button>)}
</div>
</div>
</div>)
}


}

export default RecipeIndex
