import sendRequest from '@hyva/react-checkout/api/sendRequest';
import LocalStorage from '@hyva/react-checkout/utils/localStorage';
import modifier from '@hyva/react-checkout/api/cart/setPaymentMethod/modifier';
import { SET_PAYMENT_METHOD_MUTATION } from './mutation';

export default async function setPaymentMethod(dispatch, paymentMethodId) {
  const variables = {
    cartId: LocalStorage.getCartId(),
    paymentMethodId,
  };

  return modifier(
    await sendRequest(dispatch, {
      query: SET_PAYMENT_METHOD_MUTATION,
      variables,
    })
  );
}
