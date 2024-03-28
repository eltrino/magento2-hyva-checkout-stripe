import React from 'react';
import { func, shape } from 'prop-types';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import RadioInput from '../../../../components/common/Form/RadioInput';
import Form from './Cards/Form';
import { paymentMethodShape } from '../utility';
import config from './config';
import useStripeCartContext from '../hooks/useStripeCartContext';

const stripePromise = loadStripe(config.apiKey, { locale: config.locale });

function Cards({ method, selected, actions }) {
  const isSelected = method.code === selected.code;
  const { cartAmount } = useStripeCartContext();

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
    // does not matter what currency used here, it will be overwritten eventually by the backend
    const options = {
      mode: 'payment',
      amount: Math.floor(cartAmount * 100),
      currency: 'eur',
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
