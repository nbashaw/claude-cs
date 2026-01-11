/**
 * Shared configuration for support automation scripts
 *
 * This file loads environment variables from .env.local
 * and provides helper functions for all scripts.
 */

import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
// This file should be in the repository root and NOT committed to git
const envPath = path.resolve(__dirname, '../.env.local');
dotenv.config({ path: envPath });

/**
 * Validate that required environment variables are present
 *
 * Usage:
 *   validateEnv(['SUPPORT_API_KEY', 'BILLING_API_KEY']);
 */
export function validateEnv(required: string[]) {
  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    console.error(JSON.stringify({
      error: 'Missing required environment variables',
      missing,
      hint: 'Add these to .env.local in your repository root'
    }));
    process.exit(1);
  }
}

/**
 * Helper to output success JSON
 */
export function outputSuccess(data: any) {
  console.log(JSON.stringify({
    success: true,
    ...data
  }, null, 2));
}

/**
 * Helper to output error JSON
 */
export function outputError(message: string, details?: any) {
  console.error(JSON.stringify({
    error: message,
    ...details
  }, null, 2));
}

/**
 * Example: Access environment variables
 *
 * const apiKey = process.env.SUPPORT_API_KEY;
 */
