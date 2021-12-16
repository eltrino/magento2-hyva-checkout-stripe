import React, { useEffect, useState } from 'react';
import { func, shape } from 'prop-types';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import RadioInput from '@hyva/react-checkout/components/common/Form/RadioInput';
import useStripeAppContext from '../hooks/useStripeAppContext';
import Form from './Cards/Form';
import { paymentMethodShape } from '../utility';
import restGetClientSecret from '../api/stripe/getClientSecret';
import config from './config';

const stripePromise = loadStripe(config.apiKey, { locale: config.locale });

function Cards({ method, selected, actions }) {
  const [secret, setSecret] = useState(null);
  const { appDispatch } = useStripeAppContext();

  const isSelected = method.code === selected.code;

  const getSecret = async () => {
    const result = await restGetClientSecret(appDispatch, {});
    setSecret(JSON.parse(result));
  };

  useEffect(() => {
    getSecret();
  }, [getSecret]);

  const options = {
    clientSecret: secret,
  };

  const elementsTag = (
    <Elements stripe={stripePromise} options={options}>
      <Form />
    </Elements>
  );

  return (
    secret && (
      <>
        <RadioInput
          value={method.code}
          label={method.title}
          name="paymentMethod"
          checked={isSelected}
          onChange={actions.change}
        />
        {isSelected && elementsTag}
      </>
    )
  );
}

Cards.propTypes = {
  method: paymentMethodShape.isRequired,
  selected: paymentMethodShape.isRequired,
  actions: shape({ change: func }).isRequired,
};

export default Cards;
