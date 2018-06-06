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
      <div>
        <Link to={'/login'}>Log in</Link><br/>
        <Link to={'/signup'}>Sign Up</Link>
      </div>)
  }



}

}

export default TopNavBar;
