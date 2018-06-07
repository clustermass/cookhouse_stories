import React from 'react';
import { Link } from 'react-router-dom';


// import Logo from '../../../app/assets/images/icon_quick_action_search.svg';

// import ImageSearchIcon from 'react-svg-loader!../../../app/assets/images/icon_quick_action_search.svg';
// let searchIcon = require('../../../app/assets/images/searchicon.png');
// import searchIcon from '../../../app/assets/images/searchicon.png';
import searchIcon from './searchicon.png';


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
        <Link to="/" className="header-link">
          <h1>Cookhouse stories</h1>
        </Link>
      </div>
      <div className="nav-bar-links">
      </div>
    <div>
      Welcome, {currUser == null ? 'loading...' : currUser.name}. <br/>
    <button onClick={()=> this.props.destroySession()}>Sign out</button>
    </div>
  </div>)
  }
  else{
    let path = this.props.location.pathname;
    return(
      <div className="topNav">
        <div className="nav-bar-logo">
          <Link to="/" className="header-link">
            <h1>Cookhouse stories!</h1>
          </Link>
        </div>
        <div className="nav-bar-links">
          test text
        </div>
        <div className="nav-bar-auth">
          <Link to={'/'}><img  src={'/assets/' + searchIcon} className="search-icon" alt="search"/></Link>
          |<Link to={{pathname:'/login', state:{fromPath:path}}} >Login</Link> |
          <Link to={{pathname:'/signup', state:{fromPath:path}}}>Sign-up</Link>| <a href="#" onClick={this.demoLogin}>Demo</a> <div>&nbsp;</div>
        </div>
      </div>)
  }

}

}

export default TopNavBar;
