import * as SessionUtils from '../util/session_utils'
import { IMPORT_USER } from './user_actions'

export const CREATE_SESSION = 'CREATE_SESSION';
export const DESTROY_SESSION = 'DESTROY_SESSION';

export const createSession = (cred) => dispatch =>(
  SessionUtils.createSession(cred).then((user)=>{
                                                  dispatch({type:CREATE_SESSION, user: user})
                                                  dispatch({type:IMPORT_USER, user: user}) }
))

export const destroySession = () => dispatch =>(
  SessionUtils.destroySession().then((message)=>dispatch({type:DESTROY_SESSION, message:message}))
)
