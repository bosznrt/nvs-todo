import Loadable from "react-loadable";
import LoadingPage from "./LoadingPage";

export default (opts) =>
  Loadable({
    loading: LoadingPage,
    delay: 250,
    ...opts,
  });
