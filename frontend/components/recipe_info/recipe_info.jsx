import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Scrollchor from 'react-scrollchor'; //Thanks to https://github.com/bySabi/react-scrollchor


class RecipeInfo extends React.Component {
constructor(props){
  super(props)
  this.navbar = React.createRef();
  // this.state = { currRecipeId: this.props.currRecipeId }
  this.getNavbar = this.getNavbar.bind(this)
}

getNavbar(){
    return  this.refs.navbar
 }


componentDidMount(){
  this.props.getAllUsers()
  this.props.importRecipe(this.props.match.params.recipeId)



  window.onscroll = () =>{
      //height of Y offset to navbar
      //TODO: automate offset calculation
      let navBarHeight = 579;

      if (window.pageYOffset > navBarHeight) {
        this.getNavbar().classList.add("sticky")
      }
      else if (window.pageYOffset <= navBarHeight){
        this.getNavbar().classList.remove("sticky")
      }
  }


}

componentWillReceiveProps(nextProps){
  if (nextProps.match.params.recipeId !== this.props.match.params.recipeId){
    this.props.importRecipe(nextProps.match.params.recipeId)
  }
 // if (nextProps.currRecipeId !== this.state.currRecipeId){
 //   this.setState({ currRecipeId: nextProps.currRecipeId })
 //   this.props.importRecipe(nextProps.currRecipeId)
 // }

}


render(){

  let recipe = this.props.entities.recipes[this.props.match.params.recipeId]
  if (typeof recipe === "undefined"){
    return <div>Loading...</div>
  }
  else{
    recipe = this.props.entities.recipes[this.props.match.params.recipeId]

    let recipeItemBgImgStyle = {
      backgroundImage: "url(" + recipe.main_picture_url  + ")",
      backgroundRepeat  : 'no-repeat',
       backgroundPosition: 'center',
       backgroundSize: 'cover',
    };

    return(<div className="info-page-main-container" >
                    <div className="info-page-main-container-spacer">
                    </div>
                  <div className="info-page-main-img" style={recipeItemBgImgStyle}>

                  </div>
                  <div className="info-page-main-mini-nav" ref="navbar" >
                      <div className="info-page-main-mini-nav-links">

                        <Scrollchor to="#sample-code"  >  <button  className="btn" autoFocus={true} >  Overview</button></Scrollchor>
                        <Scrollchor to="#sample-code" >
                          <button className="btn">Steps</button></Scrollchor>
                          <Scrollchor to="#sample-code" >
                            <button className="btn">Comments ({Object.keys(this.props.entities.comments).length})</button></Scrollchor>

                       </div>
                       <div className="info-page-main-mini-nav-pin">
                       </div>
                  </div>

                  <div className="info-page-main-info">

                    <div className="info-page-main-info-name">
                    <span>  {recipe.title} </span>
                    </div>
                    <div className="info-page-main-info-likes">
                    likes
                    </div>


                  </div>





                  <div id="sample-code">
                   sample
                 </div>

          </div>)

  }
}


}

export default RecipeInfo
