import { useCallback } from 'react';
import _get from 'lodash.get';
import _set from 'lodash.set';
import { _isObjEmpty, _keys } from '../../../../utils';
import { __ } from '../../../../i18n';
import { LOGIN_FORM, PAYMENT_METHOD_FORM } from '../../../../config';
import restRefreshPaymentIntent from '../api/stripe/refreshPaymentIntent';
import useCartContext from './useCartContext';
import useAppContext from './useAppContext';

export default function useStripePayments() {
  const { cartId, setOrderInfo, setRestPaymentMethod } = useCartContext();

  const { dispatch, isLoggedIn, setErrorMessage, checkoutAgreements } =
    useAppContext();

  const placeOrder = useCallback(
    async (values, additionalData) => {
      const extensionAttributes = {};

      const paymentMethodCode = _get(values, `${PAYMENT_METHOD_FORM}.code`);
      const email = _get(values, `${LOGIN_FORM}.email`);
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
    [cartId, setOrderInfo, isLoggedIn, setErrorMessage, setRestPaymentMethod]
  );

  const confirmPayment = useCallback(
    async (stripe, elements) => {
      try {
        await restRefreshPaymentIntent(dispatch);
        const result = await stripe.confirmPayment({
          elements,
          redirect: 'if_required',
        });

        if (result.error) {
          setErrorMessage(result.error.message);
        } else {
          const pm = _get(result, 'paymentIntent.payment_method');
          return {
            cc_stripejs_token: `${pm}:cart:xxxx`,
          };
        }
      } catch (e) {
        console.error(e);
        setErrorMessage(
          __(
            'This transaction could not be confirmed. Please select another payment method.'
          )
        );
      }
      return {};
    },
    [setErrorMessage, restRefreshPaymentIntent, dispatch]
  );

  return {
    confirmPayment,
    placeOrder,
  };
}
