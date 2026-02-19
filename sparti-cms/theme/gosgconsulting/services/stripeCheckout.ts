/**
 * Stripe Checkout Service Stub
 * Replaces the deleted src/services/stripeCheckout.ts
 */

export const getStripePublishableKey = async (tenantId: string): Promise<string> => {
    console.log('[stub] getStripePublishableKey called for', tenantId);
    return 'pk_test_placeholder_key';
};

export const createOrderWithPayment = async (orderData: any, tenantId: string): Promise<{ order: any; clientSecret: string }> => {
    console.log('[stub] createOrderWithPayment called', orderData);
    return {
        order: { id: 12345, ...orderData },
        clientSecret: 'pi_test_secret_placeholder',
    };
};
