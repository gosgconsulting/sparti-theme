import Medusa from "@medusajs/medusa-js";

// Ensure this environment variable is set in your .env file
const BACKEND_URL = import.meta.env.VITE_MEDUSA_BACKEND_URL || "http://localhost:9000";

const PUBLISHABLE_API_KEY = import.meta.env.VITE_MEDUSA_PUBLISHABLE_API_KEY || "";

export const medusaClient = new Medusa({
    baseUrl: BACKEND_URL,
    maxRetries: 3,
    publishableApiKey: PUBLISHABLE_API_KEY,
});
