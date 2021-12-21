import { useContext } from 'react';

import AppContext from '../../../../context/App/AppContext';

export default function useStripeAppContext() {
  const [
    { isLoggedIn, checkoutAgreements },
    { setPageLoader, setErrorMessage, dispatch: appDispatch },
  ] = useContext(AppContext);

  return {
    setPageLoader,
    setErrorMessage,
    appDispatch,
    checkoutAgreements,
    isLoggedIn,
  };
}
