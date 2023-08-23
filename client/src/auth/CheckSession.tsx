
import React from 'react';
import { useNavigate } from 'react-router-dom';

// components
import { BackDrop } from 'src/components/back-drop';
// contexts
import { useAuthContext } from "src/auth/context";
// hooks
import { useUrlTest } from 'src/hooks/useUrlTest';
//
import * as Paths from 'src/routes/paths';

// ----------------------------------------------------------------------

interface ICheckSessionProps {
  children: React.ReactElement;
};

const CheckSession: React.FC<ICheckSessionProps> = ({ children }) => {
  const navigate = useNavigate();
  const { usePathMatch } = useUrlTest();
  const { checkSession, loggedUser, feedback } = useAuthContext();
  const isRegister = usePathMatch(Paths.PATH_AUTH.register)

  React.useEffect(() => {
    if (typeof loggedUser === "undefined" && !feedback.isQueryingAPI)
      checkSession();
    else if (loggedUser === null)
      navigate(isRegister ? Paths.PATH_AUTH.register : Paths.PATH_AUTH.login, { replace: true });
  }, [isRegister, loggedUser, checkSession, feedback.isQueryingAPI, navigate]);

  return (
    <>
      {typeof (loggedUser) === "undefined" ? <BackDrop open /> : children}
    </>
  );
};

export default React.memo(CheckSession);