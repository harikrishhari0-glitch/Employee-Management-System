import { useNavigate } from "react-router-dom";

import AuthLayout from "../components/AuthLayout";
import SessionTimeout from "../components/SessionTimeout";

function SessionExpired() {

  const navigate = useNavigate();

  return (

    <AuthLayout>

      <SessionTimeout
        onLoginAgain={() => navigate("/login")}
      />

    </AuthLayout>

  );

}

export default SessionExpired;