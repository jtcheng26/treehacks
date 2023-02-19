// src/App.js
// 1. Import `CommsProvider` and `ThemeProvider` from the UI kit.
import { CommsProvider, ThemeProvider } from "@dolbyio/comms-uikit-react";

import Landing from "./components/buttons/pages/Landing";

// 2. Define the `CommsProvider` configuration. We need two properties, a `token` and an async function that refreshes it.
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkb2xieS5pbyIsImlhdCI6MTY3Njc3MzQxOCwic3ViIjoiUVVPRmRWZjJreURFN2d4Si1TSm0xQT09Iiwib2lkIjoiNzU5ZmM0MmYtMTQwMS00NGJlLTg4MjgtYzIyZTYxODI0ZTA3IiwiYmlkIjoiOGEzNjgwZGU4NjM2MjQwNDAxODY1MjMxY2Y1ODYzZTAiLCJhaWQiOiIyZjY3NmJiZi1iYTg5LTQ4Y2MtODEyZS01YjMyOGJhZGI0NGMiLCJhdXRob3JpdGllcyI6WyJST0xFX0NVU1RPTUVSIl0sInRhcmdldCI6InNlc3Npb24iLCJleHAiOjE2NzY4MTY2MTh9.OlitMf_ZMuZH_kGvcq7dOaUIGAumJgl7C8k_nI3dMzRubRH9deRclGeVe0lNb_PdaglXen-PR3rqtwCRMWXCtg";
const refreshToken = async () => token;

const theme = {
  // colors: {
  //   grey: {
  //     600: 'cyan', // This will change background color of certain UI elements to cyan
  //   },
  // },
};

const AppBase = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CommsProvider token={token} refreshToken={refreshToken}>
        {children}
      </CommsProvider>
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
