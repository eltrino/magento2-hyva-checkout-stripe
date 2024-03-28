import { useCallback } from 'react';
import { __ } from '../../../../i18n';
import _get from 'lodash.get';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import useStripeCartContext from './useStripeCartContext';
import useStripeAppContext from './useStripeAppContext';
import { setPaymentMethodRequest, placeOrderRequest } from '../api';

export default function useStripePayments() {
  const { customerEmail, customerFullName, setOrderInfo } =
    useStripeCartContext();

  const { setErrorMessage, appDispatch, setPageLoader } = useStripeAppContext();

  const stripe = useStripe();
  const elements = useElements();

  const placeOrder = useCallback(async () => {
    try {
      setPageLoader(true);

      const { error: submitError } = await elements.submit();
      if (submitError) {
        setErrorMessage(submitError);
        return false;
      }

      const paymentMethodResult = await stripe.createPaymentMethod({
        elements,
        params: {
          billing_details: {
            name: customerFullName,
            email: customerEmail,
          },
        },
      });

      if (paymentMethodResult.error) {
        setErrorMessage(paymentMethodResult.error.message);
      }
      const pmId = _get(paymentMethodResult, 'paymentMethod.id', false);

      if (pmId === false) {
        return false;
      }

      await setPaymentMethodRequest(appDispatch, pmId);
      const order = await placeOrderRequest(appDispatch);

      const { paymentIntent } = await stripe.retrievePaymentIntent(
        order.client_secret
      );
      if (paymentIntent.next_action) {
        const nextActionResult = await stripe.handleNextAction({
          clientSecret: order.client_secret,
        });
        if (nextActionResult.error) {
          console.error(nextActionResult.error);
          setErrorMessage(
            __(
              'This transaction could not be finalized. Please select another payment method.'
            )
          );
        }
      }

      if (order) {
        setOrderInfo(order);
      }
      return order;
    } catch (e) {
      console.error(e);
      setErrorMessage(
        __(
          'This transaction could not be performed. Please select another payment method.'
        )
      );
    } finally {
      setPageLoader(false);
    }
    return false;
  }, [
    setPageLoader,
    elements,
    stripe,
    customerFullName,
    customerEmail,
    appDispatch,
    setErrorMessage,
    setOrderInfo,
  ]);

  return {
    placeOrder,
  };
}
