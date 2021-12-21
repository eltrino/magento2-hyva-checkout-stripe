import React, { useCallback, useEffect } from 'react';

import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';

import useStripeCheckoutFormContext from '../../hooks/useStripeCheckoutFormContext';
import useStripePayments from '../../hooks/useStripePayments';

function Form() {
  const { registerPaymentAction } = useStripeCheckoutFormContext();
  const { placeOrder, confirmPayment } = useStripePayments();

  const stripe = useStripe();
  const elements = useElements();

  // custom "place order" submit action
  const paymentSubmitHandler = useCallback(
    async (values) => {
      const additionalData = await confirmPayment(stripe, elements);
      const order = await placeOrder(values, additionalData);
      return order;
    },
    [stripe, elements, placeOrder, confirmPayment]
  );

  // registering custom "place order" action for the payment method
  useEffect(() => {
    registerPaymentAction('stripe_payments', paymentSubmitHandler);
  }, [registerPaymentAction, paymentSubmitHandler]);

  return <PaymentElement />;
}

export default Form;
