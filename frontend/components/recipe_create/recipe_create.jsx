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
      recipe_id: -1,
      main_picture_url: '',
      difficulty_id: -1,
      cooking_time: '',
      diet_id: -1,
      cuisine_id: -1,
      custom_cuisine_country: '',
      custom_cuisine_sort: '',

      main_ingredient_id: -1,
      custom_main_ingredient: '',

      category_id: -1,
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

      all_steps: {900000:{id:900000, num: 1,  image: null, body:''}},
      custom_step_count: 900001,
      step_counter: 2,

      temp_step_body:'',
      temp_step_image:null,
      }
  this.openIMenu = this.openIMenu.bind(this);
  this.closeIMenu = this.closeIMenu.bind(this);
  this.uploadMainPicture = this.uploadMainPicture.bind(this)
  this.update = this.update.bind(this)
  this.addIngredient = this.addIngredient.bind(this)
  this.addIngredientToState = this.addIngredientToState.bind(this)
  this.enableCustomIngredientField = this.enableCustomIngredientField.bind(this)
  this.disableCustomIngredientField =   this.disableCustomIngredientField.bind(this)
  this.removeIngredientFromState = this.removeIngredientFromState.bind(this)
  this.updateStepData = this.updateStepData.bind(this)
  this.uploadStepPicture = this.uploadStepPicture.bind(this)
  this.addNewStep = this.addNewStep.bind(this)
  this.removeStep = this.removeStep.bind(this)
  this.submitRecipe = this.submitRecipe.bind(this)
  }

//Alphabetical comparator for ingredients buttons
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
setIngredientAsMain(id){
    return this.setState({main_ingredient_id:id})
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

        //if everything is OK, let's set this ingridient as main if it is the first ingredient added.
        let main_ingredient_id = this.state.main_ingredient_id;
        if(this.state.ingredient_ids.length === 1){
          main_ingredient_id = id;
        }


        //Updating state
        this.setState({ingredient_ids:ing_arr,
          measuring_ids:meas_hash,
          amounts:amount_hash,
          all_ingredients:all_ingredients,
          temp_ingredient: -1,
          temp_measuring: -1,
          temp_amount: '',
          custom_ingridient_name: '',
          custom_ingredient_count: custom_ingridient_id,
          custom_ingredient_field_available: false,
          main_ingredient_id: main_ingredient_id,
        })

      }else{
        this.props.addErrors({responseText:'This ingredient has already been added'})
        setTimeout(()=>this.props.clearErrors(), 1500)
      }
    }
  console.log(this.state)
}


removeIngredientFromState(id){
  let main_ingredient_id = this.state.main_ingredient_id;
  let meas_hash = this.state.measuring_ids
  let amount_hash = this.state.amounts
  let ing_arr = this.state.ingredient_ids
  let all_ingredients = this.state.all_ingredients
  let index = ing_arr.indexOf(id)
  ing_arr.splice(index,1)
  delete all_ingredients[id]
  delete meas_hash[id]
  delete amount_hash[id]

  if(main_ingredient_id === id){
    if(ing_arr.length > 0){
      main_ingredient_id = ing_arr[0]
    }else{
      main_ingredient_id = -1
    }
  }

  this.setState({ingredient_ids:ing_arr,
    measuring_ids:meas_hash,
    amounts:amount_hash,
    all_ingredients:all_ingredients,
    main_ingredient_id: main_ingredient_id,
  })
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

  updateStepData(event,id,field){
    let data = event.currentTarget.value
    this.setState(state => {
      state.all_steps[id][field] = data
    return state})
  }

addNewStep(){
let all_steps = this.state.all_steps
let id = this.state.custom_step_count
let custom_step_count = this.state.custom_step_count + 1 //increment id for next new step, that doesn't have id yet.
let step_nums = []
for (let i = 0; i < Object.values(this.state.all_steps).length ; i++) {
  step_nums.push(Object.values(this.state.all_steps)[i].num)
}
let sorted_steps = step_nums.sort((a,b)=>(a-b))
let num = sorted_steps[sorted_steps.length - 1] + 1;
all_steps = Object.assign(all_steps,{[id]:{id:id,num:num,image:null,body:''}})
this.setState({all_steps,custom_step_count:custom_step_count})
}

removeStep(id){
  let all_steps = this.state.all_steps
  delete all_steps[id]
  let steps_arr = Object.values(all_steps)
  //reassigning steps sequence after element was deleted.
  steps_arr = steps_arr.sort((a,b)=> a.num - b.num)
  for (let i = 1; i < steps_arr.length + 1; i++) {
    steps_arr[i-1].num = i
  }
  all_steps = {}

  for (let i = 0; i < steps_arr.length; i++) {
    all_steps[steps_arr[i].id] = steps_arr[i]
  }
  this.setState({all_steps})


}

  submitRecipe(e) {
    e.preventDefault();
    const recipe = Object.assign({}, this.state);
    this.props.clearErrors();
    this.props.submitRecipe(recipe);
  }
uploadMainPicture(){
  cloudinary.openUploadWidget({ cloud_name: 'clustermass', upload_preset: 'pykxpoqv', theme: 'white', multiple:false},
    (error, result)=>(this.setState({main_picture_url : result[0].secure_url, main_picture_id:result[0].public_id})))

}
uploadStepPicture(id){
  cloudinary.openUploadWidget({ cloud_name: 'clustermass', upload_preset: 'pykxpoqv', theme: 'white', multiple:false},
    (error, result)=>(this.updateStepData({currentTarget:{value:result[0].secure_url}},id,'image')))
}


  componentDidMount(){
    this.props.importAllRecipeFeatures()
    //TODO: uncomment when backend is ready.
    // window.onbeforeunload = function(event)
    // {
    //     return confirm("Confirm refresh");
    // };
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

          <div style={{height:'25px'}} className="errors">{this.props.errors.length === 0 ? (null) : this.props.errors[0]}</div>

          <div>
          <span>  Title: </span><input onChange={this.update('title')} value={this.state.value} type="text"></input>
          </div>


          <div>
            <span>Difficulty level:</span>
            <select onChange={this.update('difficulty_id')}>
              <option hidden value="">Select Difficulty</option>
              {this.props.difficulties.map(dif=> <option key={dif.id} value={dif.id}>{dif.level}</option>)}
            </select>
          </div>


          <div>
          <span>  Overall cooking time (in minutes)</span><input onChange={this.update('cooking_time')} value={this.state.value} type="text"></input>
          </div>

          <div>
              <span>Cuisine</span>
                <select onChange={this.update('cuisine_id')}>
                  <option hidden value="">Select Cuisine</option>
                  {this.props.cuisines.map(cus=> <option key={cus.id} value={cus.id}>{cus.sort} &nbsp;{cus.country}</option>)}
                </select>
                {this.state.cuisine_id === '1000' ? <div><span>Enter your cusine: </span><span>Country</span><input onChange={this.update('custom_cuisine_country')} type="text" value={this.state.custom_cuisine_country}></input>
              <span>Sort</span><input onChange={this.update('custom_cuisine_sort')} type="text" value={this.state.custom_cuisine_sort}></input>
                </div> : ''}
          </div>

          <div>
              <span>Diet</span>
                <select onChange={this.update('diet_id')} >
                  <option hidden value="">Select Diet</option>
                  {this.props.diets.map(diet=> <option key={diet.id} value={diet.id}>{diet.name}</option>)}
                </select>

          </div>

          <div>
              <span>Category</span>
                <select onChange={this.update('category_id')} >
                  <option hidden value="">Select Category</option>
                  {this.props.categories.map(cat=> <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>

          </div>


                          {this.state.ingredient_ids.map((id)=>(
                            <li key={id}> <span>{this.state.all_ingredients[id].name}</span>
                              <span>{this.state.amounts[id]}</span>
                              <span>{this.props.measurings[this.state.measuring_ids[id]].name}</span>
                              <button style={{cursor:'pointer'}}  className="create-page-main-universal-btn-delete" onClick={()=> this.removeIngredientFromState(id)}>Delete</button>
                              {this.state.main_ingredient_id === id ? (<span>Main Ingredient</span>) : (<button style={{cursor:'pointer'}}  className="create-page-main-ingr-btn" onClick={()=> this.setIngredientAsMain(id)}>make this main</button>)}

                            </li>))}
                            {this.state.custom_ingredient_field_available ? (<div> Please, enter your ingredient: </div>) :
                            (<div className="create-page-main-alphabet-btns">

                          <button style={{cursor:'pointer'}} className="ingredient-select-btn-letter" onClick={(event)=> this.openIMenu(event,'abc')}>
                            ABC
                          </button>{this.state.abc ? (
                            <div className="ingredient-select-menu">
                              {abc.map((i)=>(<button style={{cursor:'pointer'}} className="ingredient-select-btn" onClick={()=>this.addIngredient(i.id)} key={i.id}> {i.name} </button>))}
                          </div>): (null)}

                          <button style={{cursor:'pointer'}} className="ingredient-select-btn-letter" onClick={(event)=>this.openIMenu(event,'def')}>
                            DEF
                          </button>{this.state.def ? (
                            <div className="ingredient-select-menu">
                              {def.map((i)=>(<button style={{cursor:'pointer'}} className="ingredient-select-btn" onClick={()=>this.addIngredient(i.id)} key={i.id}> {i.name} </button>))}
                            </div>): (null)}

                          <button style={{cursor:'pointer'}} className="ingredient-select-btn-letter" onClick={(event)=>this.openIMenu(event,'ghi')}>
                            GHI
                          </button>{this.state.ghi ? (
                            <div className="ingredient-select-menu">
                              {ghi.map((i)=>(<button style={{cursor:'pointer'}} className="ingredient-select-btn" onClick={()=>this.addIngredient(i.id)} key={i.id}> {i.name} </button>))}
                            </div>): (null)}

                          <button style={{cursor:'pointer'}} className="ingredient-select-btn-letter" onClick={(event)=>this.openIMenu(event,'jkl')}>
                            JKL
                          </button>{this.state.jkl ? (
                            <div className="ingredient-select-menu">
                              {jkl.map((i)=>(<button style={{cursor:'pointer'}} className="ingredient-select-btn" onClick={()=>this.addIngredient(i.id)} key={i.id}> {i.name} </button>))}
                            </div>): (null)}

                          <button style={{cursor:'pointer'}} className="ingredient-select-btn-letter" onClick={(event)=>this.openIMenu(event,'mno')}>
                            MNO
                          </button>{this.state.mno ? (
                            <div className="ingredient-select-menu">
                              {mno.map((i)=>(<button style={{cursor:'pointer'}} className="ingredient-select-btn" onClick={()=>this.addIngredient(i.id)} key={i.id}> {i.name} </button>))}
                            </div>): (null)}

                          <button style={{cursor:'pointer'}} className="ingredient-select-btn-letter" onClick={(event)=>this.openIMenu(event,'pqr')}>
                            PQR
                          </button>{this.state.pqr ? (
                            <div className="ingredient-select-menu">
                              {pqr.map((i)=>(<button style={{cursor:'pointer'}} className="ingredient-select-btn" onClick={()=>this.addIngredient(i.id)} key={i.id}> {i.name} </button>))}
                            </div>): (null)}

                          <button style={{cursor:'pointer'}} className="ingredient-select-btn-letter" onClick={(event)=>this.openIMenu(event,'stu')}>
                            STU
                          </button>{this.state.stu ? (
                            <div className="ingredient-select-menu">
                              {stu.map((i)=>(<button style={{cursor:'pointer'}} className="ingredient-select-btn" onClick={()=>this.addIngredient(i.id)} key={i.id}> {i.name} </button>))}
                            </div>): (null)}

                          <button style={{cursor:'pointer'}} className="ingredient-select-btn-letter" onClick={(event)=>this.openIMenu(event,'vwx')}>
                            VWX
                          </button>{this.state.vwx ? (
                            <div className="ingredient-select-menu">
                              {vwx.map((i)=>(<button style={{cursor:'pointer'}} className="ingredient-select-btn" onClick={()=>this.addIngredient(i.id)} key={i.id}> {i.name} </button>))}
                            </div>): (null)}

                          <button style={{cursor:'pointer'}} className="ingredient-select-btn-letter" onClick={(event)=>this.openIMenu(event,'yz')}>
                            YZ
                          </button>{this.state.yz ? (
                            <div className="ingredient-select-menu">
                              {yz.map((i)=>(<button style={{cursor:'pointer'}} className="ingredient-select-btn" onClick={()=>this.addIngredient(i.id)} key={i.id}> {i.name} </button>))}
                            </div>): (null)}

                          </div>)}

                            <div>

                              Ingredient {this.state.custom_ingredient_field_available ? (<input type="text" onChange={this.update('custom_ingridient_name')} value={this.state.custom_ingridient_name}/>) : (<input type="text" readOnly value={curr_ing_name}/>)}

                            Amount <input type="text" value={this.state.temp_amount} onChange={this.update('temp_amount')}/>

                          <select onChange={this.update('temp_measuring')} value={this.state.temp_measuring}>
                              <option hidden value="">Select measuring</option>
                                  {Object.values(this.props.measurings).map(meas=> <option key={meas.id} value={meas.id}>{meas.name}</option>)}
                                </select>
                                <button style={{cursor:'pointer'}} className="create-page-main-universal-btn"  onClick={()=>this.addIngredientToState()}>Add</button>
                                <div>{this.state.custom_ingredient_field_available ?
                                    (<button className="create-page-main-universal-btn" style={{cursor:'pointer'}} onClick={()=>this.disableCustomIngredientField()}>Get Ingredients list back</button>) :
                                    (<button className="create-page-main-universal-btn" style={{cursor:'pointer'}} onClick={()=>this.enableCustomIngredientField()}>No ingredient in the list?</button>)}
                                </div>

                            </div>


                            <div>
                              Steps
                            </div>

                            {Object.values(this.state.all_steps).map((step)=>(
                              <div key={step.id} className="create-page-main-step-container">
                                <div><span>Step</span>{step.num}/{Object.values(this.state.all_steps).length}</div>

                                {(step.image === null) ?
                                (null):(<div  className="create-page-main-step-image" style = {{
                                    backgroundImage: `url('${step.image}')`,
                                    backgroundRepeat  : 'no-repeat',
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover'}}> </div>)}
                                    <div>
                                      <button style={{cursor:'pointer'}}  className="create-page-main-universal-btn" onClick={()=> this.uploadStepPicture(step.id) }>Upload picture</button>
                                      {step.num === 1 ? (null): (<button className={"create-page-main-universal-btn-delete"}onClick={()=>this.removeStep(step.id)}>Delete step</button>)}
                                    </div>
                                    <textarea onChange={(event)=>this.updateStepData(event,step.id,'body')} value={this.state.all_steps[step.id].body}></textarea>

                              </div>
                            ))}
                              <div><button className="create-page-main-universal-btn" onClick={()=>this.addNewStep()}>Add new step</button></div>




                                <div>
                                  <button style={{cursor:'pointer'}}  className="create-page-main-img-upload" onClick={(e)=> this.submitRecipe(e) }>Submit</button>
                                </div>





        </div>
      </div>
    )

  }



}

export default RecipeCreate
