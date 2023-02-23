// src/App.js
// 1. Import `CommsProvider` and `ThemeProvider` from the UI kit.
import { CommsProvider, ThemeProvider } from "@dolbyio/comms-uikit-react";
import { useEffect, useState } from "react";
import getApiToken from "./api/getApiToken";

import Landing from "./components/buttons/pages/Landing";

// 2. Define the `CommsProvider` configuration. We need two properties, a `token` and an async function that refreshes it.
// const token =
const refreshToken = getApiToken;

const theme = {
  // colors: {
  //   grey: {
  //     600: 'cyan', // This will change background color of certain UI elements to cyan
  //   },
  // },
};

const AppBase = ({ children }) => {
  const [token, setToken] = useState();
  useEffect(() => {
    (async () => {
      setToken(await getApiToken());
    })();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      {token && (
        <CommsProvider token={token} refreshToken={refreshToken}>
          {children}
        </CommsProvider>
      )}
    </ThemeProvider>
  );
};

// 6. Connect `BaseApp` with `Content` component.

const App = () => {
  return (
    <AppBase>
      <Landing />
      {/* <Content /> */}
    </AppBase>
  );
};

export default App;
