import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";

export default function Protected({ authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    // user not logged in but route requires auth
    if (authentication && !authStatus) {
      navigate("/login");
    }
    // user logged in but route is guest-only
    else if (!authentication && authStatus) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <Outlet />
    </>
  );
}
