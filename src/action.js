export const SET_LOGIN =  'set_login';

export  function setLogin(status) {
  return{
    type: SET_LOGIN ,
    value: status
  };
}