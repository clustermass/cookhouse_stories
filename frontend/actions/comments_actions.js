import { submitComment } from '../util/comments_utils'
import { addErrors } from './errors_actions'

export const SUBMIT_COMMENT = "SUBMIT_COMMENT"
export const IMPORT_COMMENT = "IMPORT_COMMENT"



export const postComment = (comment) => dispatch =>(
  submitComment(comment).then(comment => dispatch({type:IMPORT_COMMENT, comment:comment}),(errors)=>(dispatch(addErrors(errors))) )
)
