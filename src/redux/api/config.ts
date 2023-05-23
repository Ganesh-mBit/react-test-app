import { API_VERSION } from '../actions/AppVarContants';

const BASE_URL = process.env.REACT_APP_BUILD_ENV === 'prod' ? 'https://api.dupr.gg/' : 'https://api.gamestoppedout.com/';

export const USER_LOGIN_URL = `${BASE_URL}auth/panel/${API_VERSION}/login`;
export const USER_LOGOUT_URL = `${BASE_URL}panel/${API_VERSION}/logout`;
