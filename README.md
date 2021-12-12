# Stripe Payment method for Hyvä Checkout

## Prerequisites

1. A working Magento site with [Stripe](https://stripe.com/docs/plugins/magento-2/install) module installed and configured.
2. [Hyvä Checkout](https://github.com/hyva-themes/magento2-hyva-checkout) is installed and configured.
3. Make sure that you are using [Hyvä CheckoutExample Module Template](https://github.com/hyva-themes/magento2-checkout-example) for customizations.

## How to use it with Hyvä Checkout?

1. Install [additional module](https://github.com/eltrino/magento2-stripe-payments) which adds extra API resources to the Magento.
2. Add payment method repository to package.json inside react application folder

    ```
    "config": {
        "paymentMethodsRepo": {
            "stripe_payments": "git@github.com:eltrino/magento2-hyva-checkout-stripe.git"
        }
    },
    ```
3. Install additional dependencies `npm i @stripe/react-stripe-js@^1.6 @stripe/stripe-js@^1.21` to react application.
4. Run `npm install` inside react application.
5. Run `NODE_ENV=production npm run build` inside react application.

## More Info
1. https://hyva-themes.github.io/magento2-hyva-checkout/customize/
2. https://hyva-themes.github.io/magento2-hyva-checkout/payment-integration/
