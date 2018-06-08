export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const ADD_ERRORS = 'ADD_ERRORS';

export const clearErrors = () =>({type: CLEAR_ERRORS})

export const addErrors = (err) => ({type: ADD_ERRORS, error: err })
