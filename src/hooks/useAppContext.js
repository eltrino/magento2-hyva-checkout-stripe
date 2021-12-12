import { useContext } from 'react';

import AppContext from '@hyva/react-checkout/context/App/AppContext';

export default function useAppContext() {
  const [
    { isLoggedIn, checkoutAgreements },
    { setPageLoader, setErrorMessage, dispatch },
  ] = useContext(AppContext);

  return {
    setPageLoader,
    setErrorMessage,
    dispatch,
    checkoutAgreements,
    isLoggedIn,
  };
}
