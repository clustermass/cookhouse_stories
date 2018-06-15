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
      ghi:false,
      jkl:false,
      mno:false,
      pqr:false,
      stu:false,
      vwx:false,
      yz:false,

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
      ingredient_ids: [],

      all_ingredients:{},
      custom_ingridient_name:'',
      custom_ingredient_count: 9000,
      custom_ingredient_field_available: false,

      measuring_ids: {},
      amounts: {},
      temp_ingredient: -1,
      temp_measuring: -1,
      temp_amount: '',

      }
  this.openIMenu = this.openIMenu.bind(this);
  this.closeIMenu = this.closeIMenu.bind(this);
  this.uploadMainPicture = this.uploadMainPicture.bind(this)
  this.update = this.update.bind(this)
  this.addIngredient = this.addIngredient.bind(this)
  this.addIngredientToState = this.addIngredientToState.bind(this)
  this.enableCustomIngredientField = this.enableCustomIngredientField.bind(this)
  this.disableCustomIngredientField =   this.disableCustomIngredientField.bind(this)
  }

//Alphabetical comparator
  compare(a, b) {
    if (a.name[0] < b.name[0]) {
      return -1;
    }
    if (a.name[0] > b.name[0]) {
      return 1;
    }
    return 0;
  }

addIngredient(id){
   return this.setState({temp_ingredient:id})
}

enableCustomIngredientField(){
this.setState({temp_ingredient:this.state.custom_ingredient_count,
custom_ingredient_field_available:true
})
}

disableCustomIngredientField(){
  this.setState({temp_ingredient: -1,
  custom_ingredient_field_available:false
  })
}

addIngredientToState(){
  let id = this.state.temp_ingredient
  let meas_hash = this.state.measuring_ids
  let amount_hash = this.state.amounts
  let ing_arr = this.state.ingredient_ids
  let all_ingredients = this.state.all_ingredients //we need this to properly render ingridients on the page when we have custom ingridient, that is not in props.
  let custom_ingridient_id = this.state.custom_ingredient_count
  //If all fields are filled for adding ingridient
  if(this.state.temp_ingredient != -1 &&
    this.state.temp_measuring != -1 &&
    this.state.temp_amount != ''){
      // If we don't have ingredient yet, let's add it
      if(!ing_arr.includes(id)){
        ing_arr.push(id)
        meas_hash = Object.assign(meas_hash, {[id]:this.state.temp_measuring})
        amount_hash = Object.assign(amount_hash, {[id]:this.state.temp_amount})

      if(id >= 9000){
        all_ingredients = Object.assign(all_ingredients,{[id]:{[id]:id,name:this.state.custom_ingridient_name}})
        custom_ingridient_id = custom_ingridient_id + 1 //if custom ingredient was added, we increase count on 1
      }
      else{
        all_ingredients = Object.assign(all_ingredients,{[id]:this.props.ingredients[id]})
      }
        //Updating state
        this.setState({ingredient_ids:ing_arr,
          measuring_ids:meas_hash,
          amounts:amount_hash,
          temp_ingredient: -1,
          temp_measuring: -1,
          temp_amount: '',
          custom_ingridient_name: '',
          custom_ingredient_count: custom_ingridient_id,
          custom_ingredient_field_available: false,
        })

      }else{
        this.props.addErrors(["This ingridient has already been added!"])
      }
    }
  console.log(this.state)
}


removeIngredientFromState(id){


}


closeIMenu() {

  this.setState({
        abc:false,
        def:false,
        ghi:false,
        jkl:false,
        mno:false,
        pqr:false,
        stu:false,
        vwx:false,
        yz:false, }, () => {
    document.removeEventListener('click', this.closeIMenu);
  });
}


openIMenu(event,btn){
 event.preventDefault();
 event.stopPropagation();
    this.setState({
    [btn.toLowerCase()]: true
  });
  document.addEventListener('click', this.closeIMenu);
}


  update(field) {
    console.log(this.state)
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


    let alpha_ingredients = Object.values(this.props.ingredients)
     alpha_ingredients = alpha_ingredients.sort(this.compare)
    let abc = alpha_ingredients.filter((el)=>(el.name[0]<'d'))
    let def = alpha_ingredients.filter((el)=>(el.name[0]<'g' && el.name[0] >'c'))
    let ghi = alpha_ingredients.filter((el)=>(el.name[0]<'j' && el.name[0] >'f'))
    let jkl = alpha_ingredients.filter((el)=>(el.name[0]<'m' && el.name[0] >'i'))
    let mno = alpha_ingredients.filter((el)=>(el.name[0]<'p' && el.name[0] >'l'))
    let pqr = alpha_ingredients.filter((el)=>(el.name[0]<'s' && el.name[0] >'o'))
    let stu = alpha_ingredients.filter((el)=>(el.name[0]<'v' && el.name[0] >'r'))
    let vwx = alpha_ingredients.filter((el)=>(el.name[0]<'y' && el.name[0] >'u'))
    let yz = alpha_ingredients.filter((el)=>(el.name[0]<='z' && el.name[0] >'x'))

    let curr_ing_name

    if (this.props.ingredients.length != 'undefined' && typeof this.props.ingredients[this.state.temp_ingredient] != 'undefined'){
      curr_ing_name = this.props.ingredients[this.state.temp_ingredient].name
    }
    else if(typeof this.state.all_ingredients[this.state.temp_ingredient] != 'undefined' ){
      curr_ing_name = this.state.all_ingredients[this.state.temp_ingredient].name
    }else{
      curr_ing_name = ""
    }

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


                          {this.state.ingredient_ids.map((id)=>(
                            <li key={id}> <span>{this.state.all_ingredients[id].name}</span>
                              <span>{this.state.amounts[id]}</span>
                              <span>{this.props.measurings[this.state.measuring_ids[id]].name}</span>


                            </li>))}
                            {this.state.custom_ingredient_field_available ? (null) :
                            (<div className="create-page-main-alphabet-btns">

                          <button className="ingredient-select-btn-letter" onClick={(event)=> this.openIMenu(event,'abc')}>
                            ABC
                          </button>{this.state.abc ? (
                            <div className="ingredient-select-menu">
                              {abc.map((i)=>(<button className="ingredient-select-btn" onClick={()=>this.addIngredient(i.id)} key={i.id}> {i.name} </button>))}
                          </div>): (null)}

                          <button className="ingredient-select-btn-letter" onClick={(event)=>this.openIMenu(event,'def')}>
                            DEF
                          </button>{this.state.def ? (
                            <div className="ingredient-select-menu">
                              {def.map((i)=>(<button className="ingredient-select-btn" onClick={()=>this.addIngredient(i.id)} key={i.id}> {i.name} </button>))}
                            </div>): (null)}

                          <button className="ingredient-select-btn-letter" onClick={(event)=>this.openIMenu(event,'ghi')}>
                            GHI
                          </button>{this.state.ghi ? (
                            <div className="ingredient-select-menu">
                              {ghi.map((i)=>(<button className="ingredient-select-btn" onClick={()=>this.addIngredient(i.id)} key={i.id}> {i.name} </button>))}
                            </div>): (null)}

                          <button className="ingredient-select-btn-letter" onClick={(event)=>this.openIMenu(event,'jkl')}>
                            JKL
                          </button>{this.state.jkl ? (
                            <div className="ingredient-select-menu">
                              {jkl.map((i)=>(<button className="ingredient-select-btn" onClick={()=>this.addIngredient(i.id)} key={i.id}> {i.name} </button>))}
                            </div>): (null)}

                          <button className="ingredient-select-btn-letter" onClick={(event)=>this.openIMenu(event,'mno')}>
                            MNO
                          </button>{this.state.mno ? (
                            <div className="ingredient-select-menu">
                              {mno.map((i)=>(<button className="ingredient-select-btn" onClick={()=>this.addIngredient(i.id)} key={i.id}> {i.name} </button>))}
                            </div>): (null)}

                          <button className="ingredient-select-btn-letter" onClick={(event)=>this.openIMenu(event,'pqr')}>
                            PQR
                          </button>{this.state.pqr ? (
                            <div className="ingredient-select-menu">
                              {pqr.map((i)=>(<button className="ingredient-select-btn" onClick={()=>this.addIngredient(i.id)} key={i.id}> {i.name} </button>))}
                            </div>): (null)}

                          <button className="ingredient-select-btn-letter" onClick={(event)=>this.openIMenu(event,'stu')}>
                            STU
                          </button>{this.state.stu ? (
                            <div className="ingredient-select-menu">
                              {stu.map((i)=>(<button className="ingredient-select-btn" onClick={()=>this.addIngredient(i.id)} key={i.id}> {i.name} </button>))}
                            </div>): (null)}

                          <button className="ingredient-select-btn-letter" onClick={(event)=>this.openIMenu(event,'vwx')}>
                            VWX
                          </button>{this.state.vwx ? (
                            <div className="ingredient-select-menu">
                              {vwx.map((i)=>(<button className="ingredient-select-btn" onClick={()=>this.addIngredient(i.id)} key={i.id}> {i.name} </button>))}
                            </div>): (null)}

                          <button className="ingredient-select-btn-letter" onClick={(event)=>this.openIMenu(event,'yz')}>
                            YZ
                          </button>{this.state.yz ? (
                            <div className="ingredient-select-menu">
                              {yz.map((i)=>(<button className="ingredient-select-btn" onClick={()=>this.addIngredient(i.id)} key={i.id}> {i.name} </button>))}
                            </div>): (null)}

                          </div>)}

                            <div>

                              Ingredient {this.state.custom_ingredient_field_available ? (<input type="text" onChange={this.update('custom_ingridient_name')} value={this.state.custom_ingridient_name}/>) : (<input type="text" readOnly value={curr_ing_name}/>)}

                            Amount <input type="text" value={this.state.temp_amount} onChange={this.update('temp_amount')}/>

                          <select onChange={this.update('temp_measuring')} value={this.state.temp_measuring}>
                              <option value="">Select measuring</option>
                                  {Object.values(this.props.measurings).map(meas=> <option key={meas.id} value={meas.id}>{meas.name}</option>)}
                                </select>
                                <button className="create-page-main-img-upload"  onClick={()=>this.addIngredientToState()}>Add</button>
                                {this.state.custom_ingredient_field_available ? (<button onClick={()=>this.disableCustomIngredientField()}>Get Ingredients list back.</button>) : (<button onClick={()=>this.enableCustomIngredientField()}>Can't find ingredient in the list.</button>)}

                            </div>









        </div>
      </div>
    )

  }



}

export default RecipeCreate
