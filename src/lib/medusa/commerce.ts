import type Medusa from '@medusajs/js-sdk';

/**
 * Storefront helpers over {@link Medusa} — maps to Medusa v2 Store API via `@medusajs/js-sdk`.
 * Checkout: create cart → addresses/email → line items → shipping method → payment session → `cart.complete`.
 */
export function createMedusaCommerce(sdk: Medusa) {
  const s = sdk.store;

  return {
    sdk,
    products: {
      list: s.product.list.bind(s.product),
      retrieve: s.product.retrieve.bind(s.product),
    },
    categories: {
      list: s.category.list.bind(s.category),
      retrieve: s.category.retrieve.bind(s.category),
    },
    collections: {
      list: s.collection.list.bind(s.collection),
      retrieve: s.collection.retrieve.bind(s.collection),
    },
    regions: {
      list: s.region.list.bind(s.region),
      retrieve: s.region.retrieve.bind(s.region),
    },
    cart: {
      create: s.cart.create.bind(s.cart),
      update: s.cart.update.bind(s.cart),
      retrieve: s.cart.retrieve.bind(s.cart),
      addLineItem: s.cart.createLineItem.bind(s.cart),
      updateLineItem: s.cart.updateLineItem.bind(s.cart),
      removeLineItem: s.cart.deleteLineItem.bind(s.cart),
      addShippingMethod: s.cart.addShippingMethod.bind(s.cart),
      complete: s.cart.complete.bind(s.cart),
    },
    /** Shipping + payment steps before `cart.complete` */
    checkout: {
      listShippingOptions: s.fulfillment.listCartOptions.bind(s.fulfillment),
      calculateShippingOption: s.fulfillment.calculate.bind(s.fulfillment),
      listPaymentProviders: s.payment.listPaymentProviders.bind(s.payment),
      initiatePaymentSession: s.payment.initiatePaymentSession.bind(s.payment),
    },
  };
}

export type MedusaCommerce = ReturnType<typeof createMedusaCommerce>;

/** After `cart.complete`, `type === "order"` means the order was placed; otherwise inspect `error` and `cart`. */
export function isMedusaOrderPlaced(result: { type: string }): result is { type: 'order' } {
  return result.type === 'order';
}
