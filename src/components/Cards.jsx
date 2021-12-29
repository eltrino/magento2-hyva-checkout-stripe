import React, { useEffect, useState } from 'react';
import { func, shape } from 'prop-types';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import RadioInput from '../../../../components/common/Form/RadioInput';
import useAppContext from '../hooks/useStripeAppContext';
import Form from './Cards/Form';
import { paymentMethodShape } from '../utility';
import restGetClientSecret from '../api/stripe/getClientSecret';
import config from './config';

const stripePromise = loadStripe(config.apiKey, { locale: config.locale });

function Cards({ method, selected, actions }) {
  const [secret, setSecret] = useState(null);
  const isSelected = method.code === selected.code;
  const { appDispatch } = useStripeAppContext();

  const radioInputTag = (
    <RadioInput
      value={method.code}
      label={method.title}
      name="paymentMethod"
      checked={isSelected}
      onChange={actions.change}
    />
  );

  useEffect(() => {
    restGetClientSecret(appDispatch, {}).then((res) => {
      setSecret(res);
    });
  }, []);

  if (isSelected && secret) {
    const options = { clientSecret: secret };

    const elementsTag = (
      <Elements stripe={stripePromise} options={options} key={secret}>
        <Form />
      </Elements>
    );

    return [radioInputTag, elementsTag];
  }
  return radioInputTag;
}

Cards.propTypes = {
  method: paymentMethodShape.isRequired,
  selected: paymentMethodShape.isRequired,
  actions: shape({ change: func }).isRequired,
};

export default Cards;
