import { SessionProvider } from "next-auth/react";

import { Provider } from "react-redux";

import store from "../redux/store";

import "../styles/globals.css";

// -----------------------------------------
// - Componente de entrada a la aplicación -
// -----------------------------------------
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
}

// -----------------------
// - Componente original -
// -----------------------

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default MyApp
