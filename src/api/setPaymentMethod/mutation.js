import { CART_DATA_FRAGMENT } from '../../../../../api/cart/utility/query/cartQueryInfo';

// @TODO pass checkout agreements
export const SET_PAYMENT_METHOD_MUTATION = `
mutation setPaymentMethodMutation(
  $cartId: String!,
  $paymentMethodId: String!
) {
  setPaymentMethodOnCart(
    input: {
      cart_id: $cartId
      payment_method: {
        code: "stripe_payments"
        stripe_payments: {
          payment_element: true
          payment_method: $paymentMethodId
          save_payment_method: true
        }
      }
    }
  ) {
  cart {
    ${CART_DATA_FRAGMENT}
    }
  }
}
`;
