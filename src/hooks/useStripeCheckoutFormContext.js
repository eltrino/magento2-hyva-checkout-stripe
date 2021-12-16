import { useContext } from 'react';

import CheckoutFormContext from '@hyva/react-checkout/context/Form/CheckoutFormContext';

export default function useStripeCheckoutFormContext() {
  const { registerPaymentAction } = useContext(CheckoutFormContext);

  return {
    registerPaymentAction,
  };
}
