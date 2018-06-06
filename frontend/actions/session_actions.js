import * as SessionUtils from '../util/session_utils'

export const CREATE_SESSION = 'CREATE_SESSION';
export const DESTROY_SESSION = 'DESTROY_SESSION';

export const createSession = (cred) => dispatch =>(
  SessionUtils.createSession(cred).then((user)=> dispatch({type:CREATE_SESSION, user: user}))
)

export const destroySession = () => dispatch =>(
  SessionUtils.destroySession().then((message)=>dispatch({type:DESTROY_SESSION, message:message}))
)
