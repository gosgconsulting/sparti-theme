import React from 'react';

interface StripeCheckoutProps {
    clientSecret: string;
    publishableKey: string;
    onSuccess: (paymentIntent: any) => void;
    onError: (error: any) => void;
}

export const StripeCheckout: React.FC<StripeCheckoutProps> = ({ onSuccess }) => {
    return (
        <div className="p-4 border rounded bg-gray-50">
            <h3 className="text-lg font-medium mb-2">Stripe Checkout</h3>
            <p className="text-sm text-gray-500 mb-4">
                This is a placeholder for the Stripe Checkout component.
                Real payment processing is disabled in this cleanup version.
            </p>
            <button
                onClick={() => onSuccess({ id: 'pi_test_123' })}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Simulate Successful Payment
            </button>
        </div>
    );
};
