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

    this.state = {user_id: this.props.session.id,
                  recipe_id: this.props.match.params.recipeId,
                  body:''
    }

    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  preserveRoute(){
    if (this.currPath !== window.location.hash){
      window.location.hash = this.currPath
    }


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
    window.onscroll = ()=> this.stickNavBar()
    // window.onscroll = ()=> this.preserveRoute()

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

  componentWillUnmount(){
    window.onscroll = null
  }

  render(){
    let recipe
    if (typeof this.props.entities.recipes[this.props.match.params.recipeId] === "undefined" ||
        typeof this.props.entities.recipes[this.props.match.params.recipeId].ingredients_list === "undefined"){
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
        <div  className="info-page-main-mini-nav-links">

          <Scrollchor to="#overview"  >  <button  className="btn" autoFocus={true} onClick={()=>setTimeout(this.preserveRoute,1000)} >  Overview</button></Scrollchor>
          <Scrollchor to="#steps" >
            <button onClick={()=>setTimeout(this.preserveRoute,1000)} className="btn">Steps</button></Scrollchor>
            <Scrollchor to="#comments" >
              <button onClick={()=>setTimeout(this.preserveRoute,1000)} className="btn">Comments ({Object.keys(this.props.entities.comments).length})</button></Scrollchor>

            </div>
            <div className="info-page-main-mini-nav-pin">
            </div>
          </div>
          <div id="overview"></div>
          <div className="info-page-main-info">

            <div  className="info-page-main-info-name" >
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

        <div className="info-page-main-info-inglist">
          {recipe.ingredients_list.map(ing_id=>{
            let name = this.props.entities.ingredients[ing_id].name
            let amount = recipe.ingredients_amounts[ing_id][ing_id]
            let measuring = this.props.entities.measurings[recipe.ingredients_measurings[ing_id][ing_id]].name
            return (<div key={ing_id} ><div className="info-page-main-info-ingname" key={ing_id} >  {amount}  {measuring}</div> <div> {name} </div></div>)
          })}
        </div>

        <div className="info-page-main-info-difficulty">
          Videos
        </div>
            <div id="steps"></div>
        {recipe.steps.map(step=>{
          let num = step.num
          let totalSteps = recipe.steps.length
          //570x425 image size
          let stepImage = {
            backgroundImage: "url(" + step.image  + ")",
            backgroundRepeat  : 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          };
          return(
            <div key={num} className="info-page-main-stepcontainer" >
              <div className="info-page-main-info-difficulty">Step {num}/{totalSteps}</div>
              {step.image === null ? <div></div> : <div className="info-page-main-stepimage" style={stepImage}></div>}

              <div className="info-page-main-info-stepbody" >{step.body}</div>
          </div>
          )
        })}
        <div id="comments"></div>
        <div className="info-page-main-info-difficulty">
          Comments ({Object.keys(this.props.entities.comments).length})
        </div>
        <div className="errors">{this.props.errors.length === 0 ? '' : this.props.errors[0].responseJSON.map(err=>{
             return(<div key={this.props.errors[0].responseJSON.indexOf(err)}>Error:&nbsp; {err}</div>)
           })}</div>

          {this.props.loggedIn === false ? <div className="info-page-main-info-stepbody" >Please, Log in to post comments.</div> :
          <div  className="info-page-main-postcomment">
            <form onSubmit={this.handleSubmit} >
            <textarea type="text" value={this.state.body} onChange={this.update('body')} >
            </textarea>
            <button style={{cursor:'pointer'}} className="info-page-main-postcomment-btn">Send</button>
          </form>
          </div>}





      </div>


    </div>)

  }
}


}

export default RecipeInfo
