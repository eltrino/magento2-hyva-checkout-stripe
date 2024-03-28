import React, { useCallback, useEffect } from 'react';

import { PaymentElement } from '@stripe/react-stripe-js';

import useStripeCheckoutFormContext from '../../hooks/useStripeCheckoutFormContext';
import useStripePayments from '../../hooks/useStripePayments';

function Form() {
  const { registerPaymentAction } = useStripeCheckoutFormContext();
  const { placeOrder } = useStripePayments();

  const paymentSubmitHandler = useCallback(
    async () => placeOrder(),
    [placeOrder]
  );

  useEffect(() => {
    registerPaymentAction('stripe_payments', paymentSubmitHandler);
  }, [registerPaymentAction, paymentSubmitHandler]);

  return <PaymentElement />;
}

export default Form;
