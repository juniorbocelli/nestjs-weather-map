
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { BackDrop } from 'src/components/back-drop';

import * as Paths from 'src/routes/paths';
//
import { useAuth } from "./context";

interface ICheckSessionProps {
  children: React.ReactElement;
}

const CheckSession: React.FC<ICheckSessionProps> = ({ children }) => {
  const navigate = useNavigate();
  const { checkSession, loggedUser, feedback } = useAuth();

  React.useEffect(() => {
    if (typeof loggedUser === "undefined" && !feedback.isQueryingAPI)
      checkSession();
    else if (loggedUser === null)
      navigate(Paths.PATH_AUTH.login, { replace: true });
  }, [loggedUser, checkSession, feedback.isQueryingAPI, navigate]);

  return (
    <>
      {typeof (loggedUser) === "undefined" ? <BackDrop open /> : children}
    </>
  );
};

export default React.memo(CheckSession);