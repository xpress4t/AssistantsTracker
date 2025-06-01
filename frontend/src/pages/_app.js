import "../styles/reset.css";
import "../styles/global.css";
import GlobalStateContext from "../context";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useAuth } from "@/hooks/useAuth";

const AppWithContext = ({ children }) => {
  useAuth();

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
