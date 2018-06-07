import React from 'react';
import { Link } from 'react-router-dom';

class TopNavBar extends React.Component{

constructor(props){
  super(props)
}

componentDidMount(){

}


render(){

  if (this.props.loggedIn){
    let currUser = this.props.usersHash[this.props.session.id]

  return(
    <div>
      Welcome, {currUser == null ? 'loading...' : currUser.name}. <br/>
    <button onClick={()=> this.props.destroySession()}>Sign out</button>

    </div>)
  }
  else{

    return(
      <div className="topNav">
        <div className="nav-bar-logo">
          <Link to="/" className="header-link">
            <h1>Cookhouse stories</h1>
          </Link>
        </div>
        <div className="nav-bar-links">
        </div>
        <div className="nav-bar-auth">
          <Link to={'/login'}>Log in</Link>
          <Link to={'/signup'}>Sign Up</Link>
        </div>
      </div>)
  }

}

}

export default TopNavBar;
