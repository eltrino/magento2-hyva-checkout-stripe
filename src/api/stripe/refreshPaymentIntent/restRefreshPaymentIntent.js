import RootElement from '../../../../../../utils/rootElement';
import sendRequest, { RESPONSE_TEXT } from '../../../../../../api/sendRequest';

import modifier from './modifier';

const { restUrlPrefix } = RootElement.getPaymentConfig();

export default async function restRefreshPaymentIntent(dispatch) {
  const refreshPaymentIntentUrl = `${restUrlPrefix}stripe/payments/refresh_payment_intent`;

  return modifier(
    await sendRequest(dispatch, {}, refreshPaymentIntentUrl, RESPONSE_TEXT)
  );
}
