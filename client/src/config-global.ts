// routes
import { PATH_DASHBOARD } from './routes/paths';

// API
export const SERVER_HOST_API = process.env.REACT_APP_SERVER_HOST_API || '';
export const SERVER_HOST_API_ROOT = process.env.REACT_APP_SERVER_HOST_API_ROOT || '';
export const SERVER_HOST_PORT = process.env.REACT_APP_SERVER_HOST_PORT || '';

// ----------------------------------------------------------------------

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = PATH_DASHBOARD.home; // as '/home'