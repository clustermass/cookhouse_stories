import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';



class RecipeInfo extends React.Component {
constructor(props){
  super(props)

}


componentDidMount(){
  this.props.getAllUsers()

}

componentWillReceiveProps(newprops){

}

render(){
  return(<div> "hello"</div>)
}


}

export default RecipeInfo
