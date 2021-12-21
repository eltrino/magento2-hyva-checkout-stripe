import RootElement from '@hyva/react-checkout/utils/rootElement';
import _get from 'lodash.get';

const paymentConfig = RootElement.getPaymentConfig();

export default {
  apiKey: _get(paymentConfig, 'stripe_payments.initParams.apiKey'),
  locale: _get(paymentConfig, 'stripe_payments.initParams.locale'),
};
