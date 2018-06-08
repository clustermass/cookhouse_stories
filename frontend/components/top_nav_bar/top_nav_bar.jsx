import React from 'react';
import { Link } from 'react-router-dom';


class TopNavBar extends React.Component{

constructor(props){
  super(props)


  this.demoLogin = this.demoLogin.bind(this)
}

componentDidMount(){

}

demoLogin(){
    this.props.createSession({username:'demo',password:'password'})
}

render(){

  if (this.props.loggedIn){
    let currUser = this.props.usersHash[this.props.session.id]

  return(
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
        {currUser == null ? 'loading...' : currUser.name}<br/>
        <button className="nav-bar-sign-out-btn" onClick={()=> this.props.destroySession()}>Sign out</button>
        </div>
    </div>

  </div>
)
  }
  else{
    let path = this.props.location.pathname;
    return(
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
          <a href="#" onClick={this.demoLogin}>Demo</a> <div>&nbsp;</div>
        </div>
      </div>)
  }

}

}

export default TopNavBar;
