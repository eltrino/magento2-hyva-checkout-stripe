import RootElement from '@hyva/react-checkout/utils/rootElement';
import sendRequest, {
  RESPONSE_TEXT,
} from '@hyva/react-checkout/api/sendRequest';

import modifier from './modifier';

const { restUrlPrefix } = RootElement.getPaymentConfig();

export default async function restGetClientSecret(dispatch) {
  const getClientSecretUrl = `${restUrlPrefix}stripe/payments/get_client_secret`;

  return modifier(
    await sendRequest(dispatch, {}, getClientSecretUrl, RESPONSE_TEXT)
  );
}
