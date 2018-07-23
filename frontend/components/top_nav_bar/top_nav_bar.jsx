import React from 'react';
import { Link } from 'react-router-dom';
import Errors from '../errors/errors_container'

class TopNavBar extends React.Component{

constructor(props){
  super(props)


  this.demoLogin = this.demoLogin.bind(this)
}

componentDidMount(){

}

demoLogin(e){

    setTimeout(this.props.createSession({username:'demo',password:'password'}), 3000);

}

render(){

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

  <Link to={'/'}>Recipes</Link>
  <Link to={'/'}>Stories</Link>
  <Link to={'/'}>Categories</Link>
  <Link to={'/'}>How-Tos</Link>
  <Link to={'/'}>Videos</Link>
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

          <Link to={'/'}>Recipes</Link>
      <Link to={'/'}>Stories</Link>
      <Link to={'/'}>Categories</Link>
      <Link to={'/'}>How-Tos</Link>
      <Link to={'/'}>Videos</Link>
        </div>
        <div className="nav-bar-auth">
        <Link to={'/'}><img className="search-icon" src={window.searchicon} /></Link>
         <p>|</p><Link to={{pathname:'/login', state:{fromPath:path}}} >Login</Link> <p>|</p>
          <Link to={{pathname:'/signup', state:{fromPath:path}}}>Sign-up</Link><p>|</p>
          <a href="#" onClick={()=>this.demoLogin()}>Demo</a> <div>&nbsp;</div>
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
