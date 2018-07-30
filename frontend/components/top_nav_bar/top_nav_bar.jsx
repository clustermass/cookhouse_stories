import React from 'react';
import { Link } from 'react-router-dom';
import Errors from '../errors/errors_container'

class TopNavBar extends React.Component{

constructor(props){
  super(props)


this.showCats = this.showCats.bind(this)
this.hideCats = this.hideCats.bind(this)

let closeCats

}

componentDidMount(){

}

showCats(){
  let cats = document.getElementById("cats");
  cats.classList.add('nav-bar-cats-on');
}

hideCats(){
  let cats = document.getElementById("cats");
  cats.classList.remove('nav-bar-cats-on');
}



render(){
let currLocation = this.props.location.pathname
let style ={  textDecoration: "underline",
  color: "#464646"}

let recipesActive = {}
let categoriesActive = {}
let videosActive = {}


if(currLocation === '/'){
  recipesActive = style
}
else if(currLocation.includes('/category/')){
  categoriesActive = style
}
else if(currLocation === '/videos'){
  videosActive = style
}



let breakfastCatId = 0
let chickenCatId = 0
let dessertCatId = 0
let drinkCatId = 0
let europeanCatId = 0
let familyCatId = 0
let lowcarbCatId = 0
let mainCatId = 0
let snackCatId = 0
let starterCatId = 0
let underfourhundredCatId = 0
let weeknightdinnersCatId = 0


if(Object.values(this.props.cats).length > 0){
let allCats = Object.values(this.props.cats)
breakfastCatId = allCats.filter((cat) => cat.name === 'Breakfast')[0].id
chickenCatId = allCats.filter((cat) => cat.name === 'Chicken')[0].id
dessertCatId = allCats.filter((cat) => cat.name === 'Dessert')[0].id
drinkCatId = allCats.filter((cat) => cat.name === 'Drink')[0].id
europeanCatId = allCats.filter((cat) => cat.name === 'European')[0].id
familyCatId = allCats.filter((cat) => cat.name === 'Family favorites')[0].id
lowcarbCatId = allCats.filter((cat) => cat.name === 'Low carb')[0].id
mainCatId = allCats.filter((cat) => cat.name === 'Main')[0].id
snackCatId = allCats.filter((cat) => cat.name === 'Snack')[0].id
starterCatId = allCats.filter((cat) => cat.name === 'Starter')[0].id
underfourhundredCatId = allCats.filter((cat) => cat.name === 'Under 400 calories')[0].id
weeknightdinnersCatId = allCats.filter((cat) => cat.name === 'Weeknight dinners')[0].id

}

  if (this.props.loggedIn){
    let currUser = this.props.usersHash[this.props.session.id]

  return(
  <div>
  <div className="topNav">
    <div className="nav-bar-logo">
      <Link to="/">
        Cookhouse Stories
      </Link>
    </div>
    <div className="nav-bar-links">

  <Link style={recipesActive} to={'/'}>Recipes</Link>
  <a href="" onClick={(e)=>{e.preventDefault()
                            this.props.history.push('/category/0')}} onMouseOver={()=>this.showCats()} onMouseOut={()=>(this.closeCats = setTimeout(this.hideCats,350))} style={categoriesActive} to={'/'}>Categories</a>
  <Link style={videosActive} to={'/videos'}>Videos</Link>
    </div>
    <div className="nav-bar-auth">
      <Link to={'/'}><img className="search-icon" src={window.searchicon} /></Link>
        <div className="nav-bar-user-info">
         {currUser == null ? 'loading...' : (<Link className="nav-bar-user-info-link" to={`/users/${currUser.id}`}> {currUser.name}</Link>)}<br/>
      <button className="nav-bar-sign-out-btn" onClick={()=>{this.props.destroySession()
                                                            this.props.deleteFavoriteRecipes()}}>Sign out</button>
        </div>
    </div>

  </div>

  <div id="cats" className="nav-bar-cats" onMouseEnter={()=>clearTimeout(this.closeCats)} onMouseLeave={()=>this.hideCats()}>
    <div className="nav-bar-cats-menu">
      <div className="nav-cats-links" >
        <div style={{width:"40px",height:"30px"}}></div>
        <Link to={`/category/${breakfastCatId}`}>Breakfast</Link>
        <Link to={`/category/${chickenCatId}`}>Chicken</Link>
        <Link to={`/category/${dessertCatId}`}>Dessert</Link>
        <Link to={`/category/${drinkCatId}`}>Drink</Link>
      </div>
      <div className="nav-cats-links" >
        <div style={{width:"40px",height:"30px"}}></div>
        <Link to={`/category/${europeanCatId}`}>European</Link>
        <Link to={`/category/${familyCatId}`}>Family favorites</Link>
        <Link to={`/category/${lowcarbCatId}`}>Low carb</Link>
        <Link to={`/category/${mainCatId}`}>Main</Link>
      </div>
      <div className="nav-cats-links" >
        <div style={{width:"40px",height:"30px"}}></div>
        <Link to={`/category/${snackCatId}`}>Snack</Link>
        <Link to={`/category/${starterCatId}`}>Starter</Link>
        <Link to={`/category/${underfourhundredCatId}`}>Under 400 Kcal</Link>
        <Link to={`/category/${weeknightdinnersCatId}`}>Weeknight dinners</Link>
      </div>

    </div>
    <div className="hr2"></div>
  </div>
  <Errors />
</div>
)
  }
  else{
    let path = this.props.location.pathname;
    return(
  <div>
    <div>
      <div className="topNav">
        <div className="nav-bar-logo">
          <Link to="/">
            Cookhouse Stories
          </Link>
        </div>
        <div className="nav-bar-links">

          <Link style={recipesActive} to={'/'}>Recipes</Link>
            <a href="" onClick={(e)=>{e.preventDefault()
                                      this.props.history.push('/category/0')}} onMouseOver={()=>this.showCats()} onMouseOut={()=>(this.closeCats = setTimeout(this.hideCats,350))} style={categoriesActive} to={'/'}>Categories</a>
      <Link style={videosActive} to={'/videos'}>Videos</Link>
        </div>
        <div className="nav-bar-auth">
        <Link to={'/'}><img className="search-icon" src={window.searchicon} /></Link>
         <p>|</p><Link to={{pathname:'/login', state:{fromPath:path}}} >Login</Link> <p>|</p>
          <Link to={{pathname:'/signup', state:{fromPath:path}}}>Sign-up</Link><p>|</p>
          <Link to={{pathname:'/login', state:{fromPath:path}}} >Demo</Link> <div>&nbsp;</div>
        </div>
      </div>
    </div>


    <div id="cats" className="nav-bar-cats" onMouseEnter={()=>clearTimeout(this.closeCats)} onMouseLeave={()=>this.hideCats()}>
      <div className="nav-bar-cats-menu">
        <div className="nav-cats-links" >
          <div style={{width:"40px",height:"30px"}}></div>
          <Link to={`/category/${breakfastCatId}`}>Breakfast</Link>
          <Link to={`/category/${chickenCatId}`}>Chicken</Link>
          <Link to={`/category/${dessertCatId}`}>Dessert</Link>
          <Link to={`/category/${drinkCatId}`}>Drink</Link>
        </div>
        <div className="nav-cats-links" >
          <div style={{width:"40px",height:"30px"}}></div>
          <Link to={`/category/${europeanCatId}`}>European</Link>
          <Link to={`/category/${familyCatId}`}>Family favorites</Link>
          <Link to={`/category/${lowcarbCatId}`}>Low carb</Link>
          <Link to={`/category/${mainCatId}`}>Main</Link>
        </div>
        <div className="nav-cats-links" >
          <div style={{width:"40px",height:"30px"}}></div>
          <Link to={`/category/${snackCatId}`}>Snack</Link>
          <Link to={`/category/${starterCatId}`}>Starter</Link>
          <Link to={`/category/${underfourhundredCatId}`}>Under 400 Kcal</Link>
          <Link to={`/category/${weeknightdinnersCatId}`}>Weeknight dinners</Link>
        </div>

      </div>
      <div className="hr2"></div>
    </div>
    <Errors />
  </div>
    )
  }

}

}

export default TopNavBar;
