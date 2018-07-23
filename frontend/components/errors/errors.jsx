import React from 'react';
import { Link } from 'react-router-dom';



class Errors extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
  if (this.props.errors.length === 0){
    return null
  }else{
    return (<div className="errors">{this.props.errors[0].responseJSON.map(err => (<div key={this.props.errors[0].responseJSON.indexOf(err)}>{err}</div>))}
      <div className="errors-cross" onClick={()=> this.props.clearErrors()}>&#10807;</div></div>)
  }
}

}



export default Errors;
