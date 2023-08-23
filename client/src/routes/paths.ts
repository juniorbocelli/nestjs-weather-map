// ----------------------------------------------------------------------

function path(root: string, sublink: string): string {
  return `${root}${sublink}`;
}

const ROOTS_APP = '';
// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_APP,
  login: path(ROOTS_APP, '/login'),
  register: path(ROOTS_APP, '/cadastro'),
};

export const PATH_DASHBOARD = {
  root: ROOTS_APP,

  home: path(ROOTS_APP, '/home'),
};