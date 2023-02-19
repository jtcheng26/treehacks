// src/App.js
// 1. Import `CommsProvider` and `ThemeProvider` from the UI kit.
import { CommsProvider, ThemeProvider } from "@dolbyio/comms-uikit-react";

import Landing from "./components/buttons/pages/Landing";

// 2. Define the `CommsProvider` configuration. We need two properties, a `token` and an async function that refreshes it.
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkb2xieS5pbyIsImlhdCI6MTY3Njc3Njc1OSwic3ViIjoiTWdLNVg3X1psOVhLZVdVYnRtZlNqUT09Iiwib2lkIjoiZGM5MjM4NzctMmNlOS00NjM5LWE2MjYtMDE0MzY2YzE2MTFmIiwiYmlkIjoiOGEzNjgwZGU4NjU0NDNlNDAxODY1Yzc2YjVmYzRjMjAiLCJhaWQiOiI4MTY4OGRhNy0yZmZmLTQ1ODctYmI0ZC1iOTkwMDFlOTVjMzQiLCJhdXRob3JpdGllcyI6WyJST0xFX0NVU1RPTUVSIl0sInRhcmdldCI6InNlc3Npb24iLCJleHAiOjE2NzY4MTk5NTl9.gSsoMIxJKjUDh6lL_nlAfP3EySIdNgl9jlH74WveIPmqF4ovbXcQg-RGYUs9IOxwOikpXAiF9TGvPmfvnR5V1A";
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
