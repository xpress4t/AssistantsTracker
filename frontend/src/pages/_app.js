import "../styles/reset.css";
import GlobalStateContext from "../context";

export default function App({ Component, pageProps }) {
  return (
    <GlobalStateContext>
      <Component {...pageProps} />
    </GlobalStateContext>
  );
}
