import React from 'react';
// sections
import Login from 'src/sections/auth/login/Login';
//
import Strings from 'src/shared/strings';

// ----------------------------------------------------------------------

export default function LoginPage() {
  React.useEffect(() => {
    document.title = `${Strings.Page.PAGE_TITLE_COMPANY_NAME}${Strings.Page.PAGE_TITLE_SEPARATOR}Login`;
  }, []);

  return (
    <Login />
  );
}
