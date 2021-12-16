import _get from 'lodash.get';
import RootElement from '../../../../utils/rootElement';

const paymentConfig = RootElement.getPaymentConfig();

export default {
  apiKey: _get(paymentConfig, 'stripe_payments.initParams.apiKey'),
  locale: _get(paymentConfig, 'stripe_payments.initParams.locale'),
};
