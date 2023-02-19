import '@/styles/globals.css'
import { ReduxWrapper } from "../../redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default ReduxWrapper.withRedux(function App({ Component, pageProps }) {
  return (
    <>
      <ToastContainer
        autoClose={2000}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        hideProgressBar={true}
      />
      <Component {...pageProps} />
    </>
  );
});
