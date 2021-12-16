import { useContext } from 'react';
import _get from 'lodash.get';

import CartContext from '@hyva/react-checkout/context/Cart/CartContext';

export default function useStripeCartContext() {
  const [cartData, { setRestPaymentMethod, setOrderInfo }] =
    useContext(CartContext);
  const cartId = _get(cartData, 'cart.id');

  return {
    cartId,
    setOrderInfo,
    setRestPaymentMethod,
  };
}
