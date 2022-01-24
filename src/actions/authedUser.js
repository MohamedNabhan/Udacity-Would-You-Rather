export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const CLEAR_USER_SESSION = 'CLEAR_USER_SESSION';

export const setAuthedUser = (id) => {
  return {
    type: SET_AUTHED_USER,
    id,
  };
}

export const clearAuthedUser = () => {
  return {
    type: CLEAR_USER_SESSION,
  };
}