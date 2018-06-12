import * as UserUtils from '../util/user_utils'
import { CREATE_SESSION } from './session_actions'
import { ADD_ERRORS } from './errors_actions'
import { addErrors } from './errors_actions'

export const IMPORT_USER = 'IMPORT_USER'
export const IMPORT_ALL_USERS = 'IMPORT_ALL_USERS'

export const createUser = (user) => dispatch =>(
  UserUtils.createUser(user)
  .then( (user) => {
                  dispatch({type: CREATE_SESSION, user: user})
                  dispatch(importUser(user))
                }, (errors)=>(dispatch(addErrors(errors))))
)

export const getAllUsers = () => dispatch =>(
  UserUtils.getUsers()
  .then( (users) => {
                  dispatch({type: IMPORT_ALL_USERS, users: users})
                }, (errors)=>(dispatch(addErrors(errors))))
)



// export const fetchUser = (id) => dispatch =>(
//   //If we need to fetch user from backend
// )

export const importUser = (user) =>(
  {
    type: IMPORT_USER,
    user: user
  }
)
