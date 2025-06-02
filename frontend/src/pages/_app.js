import "../styles/reset.css";
import "../styles/global.css";
import GlobalStateContext from "../context";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useAuth } from "@/hooks/useAuth";
import LoadingScreen from "@/components/LoadingScreen";
import { useEffect, useState } from "react";

let tmout;

const AppWithContext = ({ children }) => {
  const [delayed, setDelayed] = useState("idle");
  const { status } = useAuth();

  useEffect(() => {
    clearTimeout(tmout);
    tmout = setTimeout(() => {
      setDelayed(status);
    }, 250);
  }, [status]);

  if (delayed !== "success" && delayed !== "error") {
    return <LoadingScreen />;
  }

  return <>{children}</>;
};

export default function App({ Component, pageProps }) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <GlobalStateContext>
        <AppWithContext>
          <Component {...pageProps} />
        </AppWithContext>
      </GlobalStateContext>
    </LocalizationProvider>
  );
}
