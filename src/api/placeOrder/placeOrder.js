import sendRequest from '../../../../../api/sendRequest';
import LocalStorage from '../../../../../utils/localStorage';
import modifier from '../../../../../api/cart/placeOrder/modifier';
import PLACE_ORDER_MUTATION from './mutation';

export default async function placeOrder(dispatch) {
  const variables = { cartId: LocalStorage.getCartId() };

  return modifier(
    await sendRequest(dispatch, { query: PLACE_ORDER_MUTATION, variables })
  );
}
