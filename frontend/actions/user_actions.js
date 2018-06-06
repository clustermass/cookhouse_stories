import * as UserUtils from '../util/user_utils'
import { CREATE_SESSION } from './session_actions'
export const IMPORT_USER = 'IMPORT_USER'

export const createUser = (user) => dispatch =>(
  UserUtils.createUser(user)
  .then( user => {
                  dispatch({type: CREATE_SESSION, user: user})
                  dispatch(importUser(user))
                  })
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
