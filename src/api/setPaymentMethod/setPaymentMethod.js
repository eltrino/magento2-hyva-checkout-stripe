import sendRequest from '../../../../../api/sendRequest';
import LocalStorage from '../../../../../utils/localStorage';
import modifier from '../../../../../api/cart/setPaymentMethod/modifier';
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
