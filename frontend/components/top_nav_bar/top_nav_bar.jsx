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
        <Link to={'/category/asian'}>Asian</Link>
        <Link to={'/category/weekend_dinners'}>Weeknight Dinners</Link>
        <Link to={'/category/under_400_kcal'}>Under 400 Kcal</Link>
        <Link to={'/category/low_carb'}>Low Carb</Link>
      </div>
      <div className="nav-cats-links" >
        <div style={{width:"40px",height:"30px"}}></div>
        <Link to={'/category/asian'}>Asian</Link>
        <Link to={'/category/weekend_dinners'}>Weeknight Dinners</Link>
        <Link to={'/category/under_400_kcal'}>Under 400 Kcal</Link>
        <Link to={'/category/low_carb'}>Low Carb</Link>
      </div>
      <div className="nav-cats-links" >
        <div style={{width:"40px",height:"30px"}}></div>
        <Link to={'/category/asian'}>Asian</Link>
        <Link to={'/category/weekend_dinners'}>Weeknight Dinners</Link>
        <Link to={'/category/under_400_kcal'}>Under 400 Kcal</Link>
        <Link to={'/category/low_carb'}>Low Carb</Link>
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
          <Link to={'/category/asian'}>Asian</Link>
          <Link to={'/category/weekend_dinners'}>Weeknight Dinners</Link>
          <Link to={'/category/under_400_kcal'}>Under 400 Kcal</Link>
          <Link to={'/category/low_carb'}>Low Carb</Link>
        </div>
        <div className="nav-cats-links" >
          <div style={{width:"40px",height:"30px"}}></div>
          <Link to={'/category/asian'}>Asian</Link>
          <Link to={'/category/weekend_dinners'}>Weeknight Dinners</Link>
          <Link to={'/category/under_400_kcal'}>Under 400 Kcal</Link>
          <Link to={'/category/low_carb'}>Low Carb</Link>
        </div>
        <div className="nav-cats-links" >
          <div style={{width:"40px",height:"30px"}}></div>
          <Link to={'/category/asian'}>Asian</Link>
          <Link to={'/category/weekend_dinners'}>Weeknight Dinners</Link>
          <Link to={'/category/under_400_kcal'}>Under 400 Kcal</Link>
          <Link to={'/category/low_carb'}>Low Carb</Link>
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
