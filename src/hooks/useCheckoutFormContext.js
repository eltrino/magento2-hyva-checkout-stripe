import { useContext } from 'react';

import CheckoutFormContext from '@hyva/react-checkout/context/Form/CheckoutFormContext';

export default function useCheckoutFormContext() {
  const { registerPaymentAction } = useContext(CheckoutFormContext);

  return {
    registerPaymentAction,
  };
}
