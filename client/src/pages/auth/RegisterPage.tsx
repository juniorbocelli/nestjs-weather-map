import React from 'react';
import { useNavigate } from 'react-router-dom';
// sections
import Register from 'src/sections/user/register/Register';
// contexts
import { useAuthContext } from 'src/auth';
//
import Strings from 'src/shared/strings';
import { PATH_AFTER_LOGIN } from 'src/config-global';

// ----------------------------------------------------------------------

export default function RegisterPage() {
  const navigate = useNavigate();
  const { loggedUser } = useAuthContext();

  React.useEffect(() => {
    document.title = `${Strings.Page.PAGE_TITLE_COMPANY_NAME}${Strings.Page.PAGE_TITLE_SEPARATOR}Cadastro`;
  }, []);

  React.useEffect(() => {
    if (loggedUser !== null)
      navigate(PATH_AFTER_LOGIN);
  }, [loggedUser, navigate]);

  return (
    <Register />
  );
}
