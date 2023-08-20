
import React from "react";
import { useNavigate } from "react-router-dom";

import BackDrop from "../../ui/components/BackDrop";
import { useAuth } from "../auth/context";
import * as Routes from "../../globals/routes";

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
      navigate(Routes.SCREEN_LOGIN, { replace: true });
  }, [loggedUser, checkSession, feedback.isQueryingAPI]);

  return (
    <React.Fragment>
      {typeof (loggedUser) === "undefined" ? <BackDrop open={true} /> : children}
    </React.Fragment>
  );
};

export default React.memo(CheckSession);