import { CLEAR_ERRORS, ADD_ERRORS } from '../actions/errors_actions'

const errorsReducer = (state={}, action) =>{
  Object.freeze(state)
  switch (action.type) {
    case CLEAR_ERRORS:
      return {}
    case ADD_ERRORS:
      let key = action.error.responseText;
      key = stripBrackets(key)
      return Object.assign({},state, {[key]:action.error})
    default:
      return state
  }
};

const stripBrackets = (error) => {
  let return_err = "";
  if (error[0] === '[' && error[error.length -1] === ']'){
    return error.slice(1,error.length-1);
  }else{
    return error;
  }

}


export default errorsReducer
