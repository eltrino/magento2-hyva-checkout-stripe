import { useCallback } from 'react';
import _get from 'lodash.get';
import _set from 'lodash.set';
import { _isObjEmpty, _keys } from '../../../../utils';
import { __ } from '../../../../i18n';
import { LOGIN_FORM, PAYMENT_METHOD_FORM } from '../../../../config';
import useStripeCartContext from './useStripeCartContext';
import useStripeAppContext from './useStripeAppContext';

export default function useStripePayments() {
  const {
    cartId,
    customerEmail,
    customerFullName,
    setOrderInfo,
    setRestPaymentMethod,
  } = useStripeCartContext();

  const { isLoggedIn, setErrorMessage, checkoutAgreements } =
    useStripeAppContext();

  const placeOrder = useCallback(
    async (values, additionalData) => {
      const extensionAttributes = {};

      const paymentMethodCode = _get(values, `${PAYMENT_METHOD_FORM}.code`);
      const email = _get(values, `${LOGIN_FORM}.email`, customerEmail);
      const paymentMethodData = {
        cartId,
        email,
        paymentMethod: {
          method: paymentMethodCode,
          additional_data: additionalData,
        },
      };

      if (
        !_isObjEmpty(extensionAttributes) ||
        !_isObjEmpty(checkoutAgreements)
      ) {
        _set(paymentMethodData, 'paymentMethod.extension_attributes', {
          ...extensionAttributes,
          agreement_ids: _keys(checkoutAgreements),
        });
      }
      try {
        const order = await setRestPaymentMethod(paymentMethodData, isLoggedIn);

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
      }
      return false;
    },
    [
      customerEmail,
      cartId,
      checkoutAgreements,
      setRestPaymentMethod,
      isLoggedIn,
      setOrderInfo,
      setErrorMessage,
    ]
  );

  const createPayment = useCallback(
    async (stripe, elements) => {
      try {
        // Trigger form validation and wallet collection
        const { error: submitError } = await elements.submit();
        if (submitError) {
          setErrorMessage(submitError);
          return false;
        }

        const result = await stripe.createPaymentMethod({
          elements,
          params: {
            billing_details: {
              name: customerFullName,
              email: customerEmail,
            },
          },
        });

        if (result.error) {
          setErrorMessage(result.error.message);
        } else {
          const pm = _get(result, 'paymentMethod.id');
          return {
            payment_element: true,
            payment_method: pm,
          };
        }
      } catch (e) {
        console.error(e);
        setErrorMessage(
          __(
            'This transaction could not be initiated. Please select another payment method.'
          )
        );
      }
      return false;
    },
    [setErrorMessage, customerEmail, customerFullName]
  );

  return {
    createPayment,
    placeOrder,
  };
}
