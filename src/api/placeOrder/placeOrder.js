import sendRequest from '@hyva/react-checkout/api/sendRequest';
import LocalStorage from '@hyva/react-checkout/utils/localStorage';
import modifier from '@hyva/react-checkout/api/cart/placeOrder/modifier';
import PLACE_ORDER_MUTATION from './mutation';

export default async function placeOrder(dispatch) {
  const variables = { cartId: LocalStorage.getCartId() };

  return modifier(
    await sendRequest(dispatch, { query: PLACE_ORDER_MUTATION, variables })
  );
}
