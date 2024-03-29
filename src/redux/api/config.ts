import { API_VERSION } from '../actions/AppVarContants';

const BASE_URL = process.env.REACT_APP_BUILD_ENV === 'prod' ? 'https://api.dupr.gg/' : 'https://binarytouch.net/';

export const USER_LOGIN_URL = `${BASE_URL}auth/${API_VERSION}/login`;
export const USER_LOGOUT_URL = `${BASE_URL}panel/${API_VERSION}/logout`;

export const USER_SIGNUP_URL = `${BASE_URL}auth/${API_VERSION}/register`;

export const USER_PROFILE_URL = `${BASE_URL}user/${API_VERSION}/profile`;
export const USER_SECURITY_URL = `${BASE_URL}user/${API_VERSION}/password`;
