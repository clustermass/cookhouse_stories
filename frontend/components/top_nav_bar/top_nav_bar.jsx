import React from 'react';
import { Link } from 'react-router-dom';
import Errors from '../errors/errors_container'

class TopNavBar extends React.Component{

constructor(props){
  super(props)



}

componentDidMount(){

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
else if(currLocation === '/categories'){
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
  <Link style={categoriesActive} to={'/'}>Categories</Link>
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
      <Link style={categoriesActive} to={'/'}>Categories</Link>
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
    <Errors />
  </div>
    )
  }

}

}

export default TopNavBar;
