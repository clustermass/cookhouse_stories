import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';



class RecipeCreate extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      abc:false,
      def:false,
      author_id: this.props.session.id,
      main_picture_url: '',
      difficulty_id: 1,
      cooking_time: '',
      diet_id: 1,
      cuisine_id: 1,
      custom_cuisine_country: '',
      custom_cuisine_sort: '',

      main_ingredient_id: 1,
      custom_main_ingredient: '',

      category_id: 1,

      ingredients: [],
      temp_ingredient: '',


      }
this.openIMenu = this.openIMenu.bind(this);

  this.showMenu = this.showMenu.bind(this);
  this.closeIMenu = this.closeIMenu.bind(this);

  this.uploadMainPicture = this.uploadMainPicture.bind(this)
  this.update = this.update.bind(this)
  }


  compare(a, b) {
    if (a.name[0] < b.name[0]) {
      return -1;
    }
    if (a.name[0] > b.name[0]) {
      return 1;
    }
    return 0;
  }



closeIMenu() {

  this.setState({ abc: false,def:false }, () => {
    document.removeEventListener('click', this.closeIMenu);
  });
}


openIMenu(btn){
 event.preventDefault();
    this.setState({
    [btn.toLowerCase()]: true
  });
  document.addEventListener('click', this.closeIMenu);
}


  update(field) {
    // console.log(this.state)
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }
  //
  // handleSubmit(e) {
  //   e.preventDefault();
  //   const comment = Object.assign({}, this.state);
  //   this.props.clearErrors();
  //   this.props.postComment(comment);
  //   this.setState({body:''})
  // }
uploadMainPicture(){
  cloudinary.openUploadWidget({ cloud_name: 'clustermass', upload_preset: 'pykxpoqv'},
    (error, result)=>(this.setState({main_picture_url : result[0].secure_url, main_picture_id:result[0].public_id})))

}


  componentDidMount(){
    this.props.importAllRecipeFeatures()
  }

  componentWillUnmount(){
    this.props.clearAllRecipeFeatures()
  }


  render(){
    let recipeItemBgImgStyle
    if (this.state.main_picture_url != ''){
      recipeItemBgImgStyle = {
        backgroundImage: `url('${this.state.main_picture_url}')`,
        backgroundRepeat  : 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      };
    }


    let alpha_ingredients = []
     alpha_ingredients = this.props.ingredients.sort(this.compare)
    let abc = alpha_ingredients.filter((el)=>(el.name[0]<'d'))
    let def = alpha_ingredients.filter((el)=>(el.name[0]<'g'))
    let ghi = alpha_ingredients.filter((el)=>(el.name[0]<'j'))
    let jkl = alpha_ingredients.filter((el)=>(el.name[0]<'m'))
    let mno = alpha_ingredients.filter((el)=>(el.name[0]<'p'))
    let pqr = alpha_ingredients.filter((el)=>(el.name[0]<'s'))
    let stu = alpha_ingredients.filter((el)=>(el.name[0]<'v'))
    let vwx = alpha_ingredients.filter((el)=>(el.name[0]<'y'))
    let yz = alpha_ingredients.filter((el)=>(el.name[0]<='z'))

    return(
      <div>


        <div className="create-page-main-container">
          <div className="main-recipe-title">
              Create recipe
          </div>


            {this.state.main_picture_url === '' ? <div style={{fontSize:'20px',color:'#737373'}}>Please, upload recipe picture</div> : <div className="info-page-main-img" style={recipeItemBgImgStyle}></div>}


          <div>
            <button style={{cursor:'pointer'}}  className="create-page-main-img-upload" onClick={()=> this.uploadMainPicture() }>Upload picture</button>
          </div>

          <div>
          <span>  Title: </span><input onChange={this.update('title')} value={this.state.value} type="text"></input>
          </div>


          <div>
            <span>Difficulty level:</span>
            <select onChange={this.update('difficulty_id')} value={this.state.difficulty}>
              {this.props.difficulties.map(dif=> <option key={dif.id} value={dif.id}>{dif.level}</option>)}
            </select>
          </div>


          <div>
          <span>  Overall cooking time (in minutes)</span><input onChange={this.update('cooking_time')} value={this.state.value} type="text"></input>
          </div>

          <div>
              <span>Cuisine</span>
                <select onChange={this.update('cuisine_id')} value={this.state.difficulty}>
                  {this.props.cuisines.map(cus=> <option key={cus.id} value={cus.id}>{cus.sort} &nbsp;{cus.country}</option>)}
                </select>
                {this.state.cuisine_id === '1000' ? <div><span>Enter your cusine: </span><span>Country</span><input onChange={this.update('custom_cuisine_country')} type="text" value={this.state.custom_cuisine_country}></input>
              <span>Sort</span><input onChange={this.update('custom_cuisine_sort')} type="text" value={this.state.custom_cuisine_sort}></input>
                </div> : ''}
          </div>




          <button onClick={()=>this.openIMenu('abc')}>
                    ABC
                  </button>

                  {
                    this.state.abc
                      ? (
                        <div
                          className="ingredient-abc"
                          ref={(element) => {
                            this.dropdownMenu = element;
                          }}
                        >
                          {abc.map((i)=>(<button key={i.id}> {i.name} </button>))}

                        </div>
                      )
                      : (
                        null
                      )
                  }

                  <button onClick={this.showMenu}>
                            DEF
                          </button>

                          {
                            this.state.showB
                              ? (
                                <div
                                  className="ingredient-def"
                                  ref={(element) => {
                                    this.dropdownMenu = element;
                                  }}
                                >
                                  {def.map((i)=>(<button key={i.id}> {i.name} </button>))}

                                </div>
                              )
                              : (
                                null
                              )
                          }







          <div>
            <input type="text" onChange={this.update('temp_ingredient')} value={this.state.temp_ingredient}></input>
          </div>


        </div>
      </div>
    )

  }



}

export default RecipeCreate
