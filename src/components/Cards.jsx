import React from 'react';
import { func, shape } from 'prop-types';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import RadioInput from '@hyva/react-checkout/components/common/Form/RadioInput';
import Form from './Cards/Form';
import { paymentMethodShape } from '../utility';
import config from './config';

const stripePromise = loadStripe(config.apiKey, { locale: config.locale });

function Cards({ method, selected, actions }) {
  const isSelected = method.code === selected.code;

  const radioInputTag = (
    <RadioInput
      value={method.code}
      label={method.title}
      name="paymentMethod"
      checked={isSelected}
      onChange={actions.change}
    />
  );

  if (isSelected) {
    const options = {
      mode: 'payment',
      amount: null,
      currency: 'usd',
      paymentMethodCreation: 'manual',
    };
    const elementsTag = (
      <Elements stripe={stripePromise} options={options}>
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
