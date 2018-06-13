import { IMPORT_SINGLE_RECIPE } from '../actions/recipes_actions'
import { IMPORT_COMMENT } from '../actions/comments_actions'

const commentsReducer = (state = {},action)=>{
  Object.freeze(state)
  switch (action.type) {
    case IMPORT_SINGLE_RECIPE:
      return Object.assign({}, action.object.comments)
    case IMPORT_COMMENT:
      return Object.assign({},state, {[action.comment.id]:action.comment})
    default:
      return state
  }
}

export default commentsReducer
