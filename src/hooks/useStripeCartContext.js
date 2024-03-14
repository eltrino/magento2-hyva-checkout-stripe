import { useContext } from 'react';
import _get from 'lodash.get';

import CartContext from '@hyva/react-checkout/context/Cart/CartContext';

export default function useStripeCartContext() {
  const [cartData, { setRestPaymentMethod, setOrderInfo }] =
    useContext(CartContext);
  return {
    cartId: _get(cartData, 'cart.id'),
    customerFullName: _get(cartData, 'cart.billing_address.fullName'),
    customerEmail: _get(cartData, 'cart.email'),
    setOrderInfo,
    setRestPaymentMethod,
  };
}
