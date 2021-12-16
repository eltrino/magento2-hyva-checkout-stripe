import { useContext } from 'react';

import CheckoutFormContext from '../../../../context/Form/CheckoutFormContext';

export default function useCheckoutFormContext() {
  const { registerPaymentAction } = useContext(CheckoutFormContext);

  return {
    registerPaymentAction,
  };
}
