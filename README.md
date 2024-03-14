# Stripe Payment method for Hyvä Checkout

## Prerequisites

1. A working Magento site with [Stripe](https://stripe.com/docs/plugins/magento-2/install) module installed and configured.
2. [Hyvä React Checkout](https://github.com/hyva-themes/magento2-react-checkout) is installed and configured.

## How to use it with Hyvä Checkout?

1. Add payment method repository to package.json inside react application folder. Follow only one of the following steps (a or b). 
 
   a. if you've used [Hyvä CheckoutExample Module Template](https://github.com/hyva-themes/magento2-checkout-example) for customizations

       ```
       "config": {
           "paymentMethodsRepo": {
               "stripe_payments": "git@github.com:eltrino/magento2-hyva-checkout-stripe.git -b hyva-checkout-example-template"
           }
       },
       ```

   b. if you've installed Hyvä Checkout in the app/code folder 

       ```
       "config": {
           "paymentMethodsRepo": {
               "stripe_payments": "git@github.com:eltrino/magento2-hyva-checkout-stripe.git"
           }
       },
       ```

2. Install additional dependencies `npm i @stripe/react-stripe-js@^2.6.0 @stripe/stripe-js@^3.0.8` to react application.
3. Run `npm install` inside react application.
4. Run `NODE_ENV=production npm run build` inside react application.

## More Info
1. https://hyva-themes.github.io/magento2-react-checkout/customize/
2. https://hyva-themes.github.io/magento2-react-checkout/payment-integration/
