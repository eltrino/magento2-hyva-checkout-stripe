import _get from 'lodash.get';
import useCartContext from '@hyva/react-checkout/hook/useCartContext';

export default function useStripeCartContext() {
  const { cart, setOrderInfo } = useCartContext();
  return {
    cartId: _get(cart, 'id'),
    customerFullName: _get(cart, 'billing_address.fullName'),
    customerEmail: _get(cart, 'email'),
    cartAmount: _get(cart, 'prices.grandTotalAmount'),
    setOrderInfo,
  };
}
