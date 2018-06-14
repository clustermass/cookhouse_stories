import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';




class RecipeCreate extends React.Component {
  constructor(props){
    super(props)

  }


  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const comment = Object.assign({}, this.state);
    this.props.clearErrors();
    this.props.postComment(comment);
    this.setState({body:''})
  }



  componentDidMount(){
    this.props.getAllUsers()
    this.props.importRecipe(this.props.match.params.recipeId)


  }



  render(){


  }



}

export default RecipeCreate
