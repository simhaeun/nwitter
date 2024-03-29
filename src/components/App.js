import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user)
      } else {
      }
      setInit(true)
    })
  }, [])

  return (
    <>
      {init ?  <AppRouter isLoggedIn={userObj} userObj={userObj} /> : "initializing..." }
      <footer>{new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
