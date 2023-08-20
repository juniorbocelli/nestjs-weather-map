// ----------------------------------------------------------------------

function path(root: string, sublink: string): string {
  return `${root}${sublink}`;
}

const ROOTS_APP = '';
const ROOTS_DASHBOARD = '';
// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_APP,
  login: path(ROOTS_APP, '/login'),
  register: path(ROOTS_APP, '/register'),
};

export const PATH_DASHBOARD = {
  root: ROOTS_APP,

  home: path(ROOTS_DASHBOARD, '/home'),
};