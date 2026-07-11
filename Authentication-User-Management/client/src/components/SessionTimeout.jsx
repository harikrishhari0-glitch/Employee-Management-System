import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "./Button";
import { useAuth } from "../context/AuthContext";

function SessionTimeout({ onLoginAgain }) {

  const navigate = useNavigate();

  const { logout } = useAuth();

  useEffect(() => {

    // 15 minutes
    const SESSION_TIME = 15 * 60 * 1000;

    let timer;

    const resetTimer = () => {

      clearTimeout(timer);

      timer = setTimeout(() => {

        logout();

        navigate("/session-expired");

      }, SESSION_TIME);

    };

    resetTimer();

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);
    window.addEventListener("scroll", resetTimer);

    return () => {

      clearTimeout(timer);

      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("scroll", resetTimer);

    };

  }, [logout, navigate]);

  return (

    <div className="session-container">

      <div className="session-icon">

        🔒

      </div>

      <h1 className="page-title">

        Session Expired

      </h1>

      <p className="page-subtitle">

        Your session has expired due to inactivity.

        <br />

        Please sign in again to continue.

      </p>

      <Button onClick={onLoginAgain}>

        Login Again

      </Button>

    </div>

  );

}

export default SessionTimeout;