import "../styles/reset.css";
import GlobalStateContext from "../context";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

export default function App({ Component, pageProps }) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <GlobalStateContext>
        <Component {...pageProps} />
      </GlobalStateContext>
    </LocalizationProvider>
  );
}
