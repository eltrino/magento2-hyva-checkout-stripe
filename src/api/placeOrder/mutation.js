const PLACE_ORDER_MUTATION = `
mutation placeOrderMutation($cartId: String!) {
  placeOrder(input: { cart_id: $cartId}){
    order {
      order_number
      client_secret
    }
  }
}
`;

export default PLACE_ORDER_MUTATION;
