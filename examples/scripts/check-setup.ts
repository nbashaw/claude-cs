#!/usr/bin/env tsx

/**
 * Example setup validation script
 *
 * Checks that all required environment variables are present
 * before running support automation scripts.
 *
 * Usage: npx tsx scripts/check-setup.ts
 */

import '../config';

// List all required environment variables for your stack
const REQUIRED_VARS = [
  'SUPPORT_API_KEY',          // Your support platform API key
  'BILLING_API_KEY',          // Stripe/billing API key
  // 'DATABASE_URL',          // Uncomment if you use database access
  // 'ANTHROPIC_API_KEY',     // Uncomment if you use AI features
];

// Optional variables (warn but don't fail)
const OPTIONAL_VARS = [
  'SUPPORT_WEBHOOK_SECRET',
  'ANALYTICS_API_KEY',
];

function checkSetup() {
  console.log('🔍 Checking environment setup...\n');

  let hasErrors = false;

  // Check required variables
  const missing = REQUIRED_VARS.filter(key => !process.env[key]);

  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(key => console.error(`   - ${key}`));
    console.error('\nAdd these to .env.local in your repository root.');
    hasErrors = true;
  } else {
    console.log('✅ All required environment variables are set');
  }

  // Check optional variables
  const missingOptional = OPTIONAL_VARS.filter(key => !process.env[key]);

  if (missingOptional.length > 0) {
    console.log('\n⚠️  Optional environment variables not set:');
    missingOptional.forEach(key => console.log(`   - ${key}`));
    console.log('\nThese are optional but may be needed for some features.');
  }

  // Final message
  if (hasErrors) {
    console.error('\n❌ Setup incomplete. Please add missing variables to .env.local\n');
    process.exit(1);
  } else {
    console.log('\n✅ Setup complete! You\'re ready to use the support automation.\n');
    console.log('Next steps:');
    console.log('  1. Run: npx tsx scripts/list-open-tickets.ts');
    console.log('  2. Test getting a ticket: npx tsx scripts/get-ticket.ts <ticket_id>');
    console.log('  3. Invoke your skill: /support\n');
  }
}

checkSetup();
