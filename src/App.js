// src/App.js
// 1. Import `CommsProvider` and `ThemeProvider` from the UI kit.
import { CommsProvider, ThemeProvider } from "@dolbyio/comms-uikit-react";

import Landing from "./components/buttons/pages/Landing";

// 2. Define the `CommsProvider` configuration. We need two properties, a `token` and an async function that refreshes it.
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkb2xieS5pbyIsImlhdCI6MTY3NjgxNTk1OSwic3ViIjoiUVVPRmRWZjJreURFN2d4Si1TSm0xQT09Iiwib2lkIjoiNzU5ZmM0MmYtMTQwMS00NGJlLTg4MjgtYzIyZTYxODI0ZTA3IiwiYmlkIjoiOGEzNjgwZGU4NjM2MjQwNDAxODY1MjMxY2Y1ODYzZTAiLCJhaWQiOiIyZjY3NmJiZi1iYTg5LTQ4Y2MtODEyZS01YjMyOGJhZGI0NGMiLCJhdXRob3JpdGllcyI6WyJST0xFX0NVU1RPTUVSIl0sInRhcmdldCI6InNlc3Npb24iLCJleHAiOjE2NzY4NTkxNTl9.JtXtqbBVQeOjKT0r8WvZXtRUQOaZ1_NLNxl7gWqTvCH6h_CjDhl4Hlo61t3Ju9SU6jwqDwd5gjFGadoLMZFTSg";
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
