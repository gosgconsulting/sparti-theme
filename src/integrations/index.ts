/**
 * Integration Services Index
 * Centralized exports for all API integrations
 */

// Google API Integration (Maps, Reviews, Translator)
export {
  GoogleAPIClient,
  googleAPIClient,
  type GooglePlace,
  type GoogleReview,
  type TranslationResult
} from './google/client';


/**
 * Integration Status Check
 * Utility function to check which integrations are properly configured
 */
export const checkIntegrationStatus = () => {
  const status = {
    google: !!import.meta.env.VITE_GOOGLE_API_KEY,
  };

  console.log('[testing] Integration Status:', status);
  return status;
};
