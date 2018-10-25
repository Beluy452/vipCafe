import {baseHandlerAction} from './utils';
import {loginActionTypes} from '../models/auth';
import {httpService, storageService} from 'services';

export const loginSuccess = (payload) => {
  storageService.setLocal("user", JSON.stringify(payload));
  return baseHandlerAction(loginActionTypes.LOGIN_SUCCESS_ACTION, payload);
};

export function loginAction(cred) {
  // const body = JSON.stringify({
  //   email: email,
  //   password: pass,
  // });
  return dispatch => {
    dispatch(baseHandlerAction(loginActionTypes.LOGIN_INIT_ACTION, {cred}));
    const FAIL_ACTION = (res) => dispatch(baseHandlerAction(loginActionTypes.LOGIN_FAIL_ACTION, {res}));
    return httpService.handleStatusCodes({
      200: (res) => dispatch(loginSuccess(res.user)),
      400: FAIL_ACTION,
      500: FAIL_ACTION,
    }).getRequest(httpService.URLS.login + `?mail=${cred.email}&pass=${cred.pass}`);
  };
}
