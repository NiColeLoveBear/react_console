import {SET_LOGIN} from '../action';


export  default function (state={login: false} , action) {
  switch (action.type) {
  case SET_LOGIN:
    return  {
      ...state,
      login:  action.value
    };
  default:
    return state;
  }
}