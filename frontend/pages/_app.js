import "../styles/globals.css";
import Nav from "../components/Nav";
import { Provider, createClient } from "urql";
import { StateContext } from "../lib/context";
import { UserProvider } from "@auth0/nextjs-auth0";
const client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API });
import { Toaster } from "react-hot-toast";
function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <StateContext>
        <Provider value={client}>
          <Toaster />
          <Nav />
          <Component {...pageProps} />
        </Provider>
      </StateContext>
    </UserProvider>
  );
}

export default MyApp;
