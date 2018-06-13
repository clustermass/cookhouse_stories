import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Scrollchor from 'react-scrollchor'; //Thanks to https://github.com/bySabi/react-scrollchor


class RecipeInfo extends React.Component {
constructor(props){
  super(props)
  this.navbar = React.createRef();
  // this.state = { currRecipeId: this.props.currRecipeId }
  // this.getNavbar = this.getNavbar.bind(this)
  this.preserveRoute = this.preserveRoute.bind(this)
  this.currPath = `#${this.props.history.location.pathname}`
}


preserveRoute(){
  if (this.currPath !== window.location.hash){
    window.location.hash = this.currPath
  }
// console.log(this.currPath === window.location.hash)

}

 stickNavBar(){
     //height of Y offset to navbar
     //TODO: automate offset calculation
     let navBarHeight = 579;

     if (window.pageYOffset > navBarHeight) {
       this.refs.navbar.classList.add("sticky")
     }
     else if (window.pageYOffset <= navBarHeight){
       this.refs.navbar.classList.remove("sticky")
     }

 }

componentDidMount(){
  this.props.getAllUsers()
  this.props.importRecipe(this.props.match.params.recipeId)
  window.onscroll = ()=> this.stickNavBar()
  // window.onscroll = ()=> this.preserveRoute()

}

componentWillReceiveProps(nextProps){
  if (nextProps.match.params.recipeId !== this.props.match.params.recipeId){
    this.props.importRecipe(nextProps.match.params.recipeId)
  }
  console.log("worked")
 // if (nextProps.currRecipeId !== this.state.currRecipeId){
 //   this.setState({ currRecipeId: nextProps.currRecipeId })
 //   this.props.importRecipe(nextProps.currRecipeId)
 // }

}

componentWillUnmount(){
  window.onscroll = null
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

                        <Scrollchor to="#sample-code"  >  <button  className="btn" autoFocus={true} onClick={()=>setTimeout(this.preserveRoute,1000)} >  Overview</button></Scrollchor>
                        <Scrollchor to="#sample-code" >
                          <button onClick={()=>setTimeout(this.preserveRoute,1000)} className="btn">Steps</button></Scrollchor>
                          <Scrollchor to="#sample-code" >
                            <button onClick={()=>setTimeout(this.preserveRoute,1000)} className="btn">Comments ({Object.keys(this.props.entities.comments).length})</button></Scrollchor>

                       </div>
                       <div className="info-page-main-mini-nav-pin">
                       </div>
                  </div>

                  <div className="info-page-main-info">

                    <div className="info-page-main-info-name">
                    <span>  {recipe.title} </span>
                    </div>
                    <div className="info-page-main-info-likes">
                    <img src={typeof this.props.entities.followers[this.props.session.id] === "undefined" ? window.heartgrey : window.heartyellow}/>
                    <div>{Object.values(this.props.entities.followers).length}</div>
                  </div>
                    <div className="info-page-main-info-difficulty">
                    Difficulty<span>{this.props.entities.difficulties[recipe.difficulty_id].level}</span>
                    </div>
                    <div className="info-page-main-info-difficulty">
                    Preparation<span>{recipe.cooking_time} &nbsp; min.</span>
                    </div>
                    <div className="info-page-main-info-difficulty">
                    Ingredients
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
