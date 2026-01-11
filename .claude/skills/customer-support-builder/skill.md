---
name: customer-support-builder
description: Guide users through building a custom customer support automation skill for their company. Walks through planning integrations, writing scripts for their support stack (Zendesk, HelpScout, Intercom, etc.), creating response templates, and setting up an automated triage workflow. Use when users want to create their own support automation.
---

# Customer Support Skill Builder

Help users create a custom Claude Code skill for automating their customer support workflow.

## Overview

This skill guides users through building a support automation system tailored to their company's tools (support platform, billing, database). The result is a working skill that can triage tickets, gather customer context, draft responses, and execute common support operations.

## Important: Always Start with Discovery

When this skill is invoked, **ALWAYS begin with discovery questions**. Never assume their tech stack.

## Step 1: Discovery - Understand Their Support Stack

Ask the user about their support infrastructure:

**Required Questions:**
1. **Support/Ticketing Platform**: "What platform do you use for customer support?" (Zendesk, Intercom, HelpScout, Freshdesk, Front, etc.)
2. **Billing/Payment System**: "What do you use for billing?" (Stripe, Chargebee, Paddle, etc.)
3. **Database Access**: "Do you have access to your production database for customer lookups?" (PostgreSQL, MySQL, MongoDB, etc.)
4. **API Access**: "Do you have API credentials for these platforms?"
5. **Other Tools**: "Any other tools you frequently use for support?" (Analytics, feature flags, email service, etc.)

**Present their answers back** in a summary and confirm before proceeding.

## Step 2: Set Up Project Structure

Create the skill directory structure in their repository:

```bash
mkdir -p support-automation/{scripts,references/common-responses}
touch support-automation/config.ts
touch support-automation/README.md
```

Create `.claude/skills/support/skill.md` if they want it as a Claude skill (recommended).

**Files to create:**
- `config.ts` - Environment variable loading and shared configuration
- `README.md` - Human-readable documentation
- `skill.md` - Claude skill definition (if using as skill)
- `scripts/` - All automation scripts
- `references/common-responses/` - Response templates

## Step 3: Plan Integration Scripts

Based on their stack, plan the scripts they'll need.

### For ANY Support Platform (Zendesk, Intercom, HelpScout, etc.)

**Core Scripts:**
1. `list-open-tickets.ts` - List all open/pending tickets with **automatic pagination**
2. `get-ticket.ts <ticket_id>` - Fetch complete ticket/conversation details
3. `reply-to-ticket.ts <ticket_id> "<message>"` - Send response to customer
4. `close-ticket.ts <ticket_id>` - Mark ticket as resolved
5. `get-customer-context.ts <customer_email>` - Unified view across all platforms

**Optional but useful:**
- `reopen-ticket.ts` - Reopen closed tickets
- `search-tickets.ts` - Search ticket history
- `list-saved-replies.ts` - Get canned responses from platform

### For Billing (Stripe, Chargebee, etc.)

**Core Scripts:**
1. `search-billing.ts <email>` - Look up customer by email
2. `issue-refund.ts <charge_id> <amount>` - Process refunds
3. `cancel-subscription.ts <subscription_id>` - Cancel subscriptions

**Optional:**
- `create-coupon.ts` - Generate discount codes
- `update-subscription.ts` - Modify subscription

### For Database Access

**Core Script:**
1. `query-db.ts [query]` - Run read-only SQL queries
   - Support `--tables` to list all tables
   - Support `--schema <table>` to show table structure
   - Only allow SELECT, WITH, SHOW, EXPLAIN (read-only)

### Setup Validation

**Always create:**
- `check-setup.ts` - Validates all required environment variables exist

## Step 4: Write the Configuration File

Create `config.ts` that loads environment variables:

```typescript
import dotenv from 'dotenv';
import path from 'path';

// Load .env.local from the repository root
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// Validate required environment variables
export function validateEnv(required: string[]) {
  const missing = required.filter(key => !process.env[key]);
  if (missing.length > 0) {
    console.error('Missing required environment variables:', missing);
    process.exit(1);
  }
}
```

## Step 5: Create Helper Libraries

Based on their stack, create helper libraries in `lib/` directory:

### Example: HelpScout Helper (`lib/helpscout.ts`)
- Authentication (OAuth or API key)
- List conversations with pagination
- Get conversation details
- Reply to conversations
- Update conversation status
- Search customers

### Example: Stripe Helper (`lib/stripe.ts`)
- Search customers
- Get subscription details
- Issue refunds
- Cancel subscriptions
- Create coupons

**Key principle:** Wrap the platform APIs with clean TypeScript functions that the scripts can use.

## Step 6: Build Core Scripts

For each planned script:

1. **Import configuration** - Load env vars at the top
2. **Parse arguments** - Use process.argv for CLI args
3. **Call helper functions** - Use the lib/ helpers
4. **Output JSON** - Always output structured JSON for Claude to parse
5. **Error handling** - Catch errors and output error JSON

**Example structure:**
```typescript
#!/usr/bin/env tsx
import '../config';
import { getTicket } from '../../lib/support-platform';

async function main() {
  const ticketId = process.argv[2];

  if (!ticketId) {
    console.error(JSON.stringify({ error: 'Ticket ID required' }));
    process.exit(1);
  }

  try {
    const ticket = await getTicket(parseInt(ticketId));
    console.log(JSON.stringify({ success: true, ticket }));
  } catch (error) {
    console.error(JSON.stringify({
      error: error.message,
      ticketId
    }));
    process.exit(1);
  }
}

main();
```

## Step 7: Create Response Templates

Ask the user about their common support scenarios. Create templates for each:

**Standard Templates to Always Include:**
- `refund-approved.md` - Confirming refund processed
- `refund-denied.md` - Declining refund with explanation
- `bug-report.md` - Acknowledging and tracking bugs
- `feature-request.md` - Responding to product suggestions
- `billing-explanation.md` - Clarifying billing questions

**Company-Specific Templates:**
Ask: "What are your most common support scenarios?" and create templates for each.

**Template Format:**
```markdown
# [Scenario Name]

Use this template when [describe situation].

## Template

Hi [Customer Name],

[Message with placeholders]

Best,
[Your Name]

## Variables to Replace
- `[Customer Name]` - Customer's first name or "there"
- `[SPECIFIC_DETAIL]` - Description of what to replace

## Notes
- [Guidance on tone, timing, or special considerations]
```

## Step 8: Write the Skill Definition (skill.md)

Create a comprehensive skill.md that defines the automated workflow. This is Claude's instruction manual.

### Required Sections:

#### 1. Overview
Brief description of what the skill does.

#### 2. First Time Setup
```markdown
## First Time Setup

Before using for the first time, verify environment:

\`\`\`bash
npx tsx support-automation/scripts/check-setup.ts
\`\`\`

Required environment variables in `.env.local`:
- SUPPORT_API_KEY
- BILLING_API_KEY
- DATABASE_URL (optional)
```

#### 3. Automatic Workflow
```markdown
## Workflow

**IMPORTANT**: When invoked, ALWAYS start by automatically listing and triaging all open tickets.

### 1. List and Triage Open Tickets

**Automatically run** `list-open-tickets.ts` to see ALL pending tickets (with automatic pagination):

[Document the triage process]

**Present to User:**
- Show total count of open tickets
- List CRITICAL and HIGH PRIORITY issues first
- Provide brief summary of each urgent issue
- **Suggest the single most important ticket to handle first**
- Ask "Should I start with this one?" so user can say "yes" to begin
```

#### 4. Step-by-Step Workflow
Document the complete flow:
1. List and triage → Suggest most important
2. Fetch full ticket → Summarize
3. Gather customer context → Billing + DB + history
4. Draft response → Use templates
5. Get user approval → **REQUIRED**
6. Send reply
7. Close ticket if resolved

#### 5. Triage Guidelines
Define urgency categories and keyword patterns:

```markdown
### 🚨 CRITICAL Indicators
- "double bill", "charged twice", "unauthorized"
- "still waiting", "did you see"
- Can't access account
- Same customer appearing multiple times

### ⚠️ HIGH PRIORITY Indicators
- "refund", "money back"
- "bug", "broken", "not working"
- Payment failed
- Subject starts with "Re:"

### 📋 MEDIUM PRIORITY
- Feature requests
- General questions
- Account changes

### 📧 LOW PRIORITY / NOISE
- Misdirected emails
- Spam
- Newsletter bounces
```

#### 6. Script Documentation
Document each script with usage examples.

#### 7. Best Practices
- Always gather full context before responding
- Use templates as starting points, personalize
- Require explicit approval before sending
- Close tickets only when fully resolved

## Step 9: Create check-setup.ts

Always create a setup validation script:

```typescript
#!/usr/bin/env tsx
import '../config';

const REQUIRED_VARS = [
  'SUPPORT_API_KEY',
  'BILLING_API_KEY',
  // ... list all required vars
];

function checkSetup() {
  const missing = REQUIRED_VARS.filter(key => !process.env[key]);

  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(key => console.error(`  - ${key}`));
    console.error('\nAdd these to .env.local');
    process.exit(1);
  }

  console.log('✅ All required environment variables are set');
  console.log('You\'re ready to use the support automation!');
}

checkSetup();
```

## Step 10: Test the Complete Workflow

Guide the user through testing:

1. **Test check-setup.ts** - Verify env vars
2. **Test list-open-tickets.ts** - Can you fetch tickets?
3. **Test get-ticket.ts** - Get full ticket details
4. **Test get-customer-context.ts** - Unified customer view
5. **Test draft response** - Using a template
6. **Test reply (optional)** - Only if they want to test sending

Ask: "Would you like me to walk through testing each script?"

## Step 11: Create Documentation

Create a comprehensive README.md:
- Overview of the system
- Installation instructions
- Environment variable setup
- Script usage examples
- Workflow explanation
- Common troubleshooting

## Step 12: Final Review and Next Steps

Present to the user:

1. **Summary of what was created:**
   - X scripts for [their platforms]
   - Y response templates
   - Complete skill.md workflow
   - Helper libraries for [platforms]

2. **What they need to do:**
   - Add API credentials to `.env.local`
   - Run `check-setup.ts` to verify
   - Test individual scripts
   - Install as skill (if applicable)

3. **How to use it:**
   ```bash
   # Invoke the skill
   /support

   # It will automatically:
   # 1. List and triage all open tickets
   # 2. Suggest the most important one
   # 3. Wait for "yes" to proceed
   ```

4. **Iteration tips:**
   - Track common scenarios that need templates
   - Add scripts for repetitive operations
   - Refine triage keywords based on actual tickets

## Best Practices for This Skill

### Safety and Approval
- **ALWAYS emphasize:** User approval required before sending anything
- Generate read-only database queries by default
- Validate all inputs before API calls
- Use .env.local (never commit credentials)

### Code Quality
- Use TypeScript for type safety
- Output structured JSON from all scripts
- Include error handling in every script
- Make scripts runnable with `npx tsx`

### Workflow Design
- Automatic triage on startup (proactive, not reactive)
- Single suggestion to start ("Should I start with this one?")
- Full context before drafting responses
- Templates as personalized starting points

### Documentation
- Clear skill.md with step-by-step workflow
- Examples for every script
- Troubleshooting section
- Platform-specific notes

## Platform-Specific Guidance

### HelpScout
- Use OAuth 2.0 for authentication
- Pagination is required (default page size is 25)
- Conversations API vs Messages API
- Remember to embed threads when fetching conversations

### Zendesk
- Use API token authentication
- Tickets vs Conversations model
- Support for side conversations
- Rate limiting considerations

### Intercom
- Use access token authentication
- Conversations API
- Note the difference between admins and bots
- Pagination with cursor-based approach

### Stripe
- Use secret key (sk_live_ or sk_test_)
- Search API for finding customers
- Idempotency keys for refunds
- Expand parameters for nested objects

### Intercom
- Token-based authentication
- Conversations can have multiple participants
- Admin vs bot replies
- Pagination with cursor

### Front
- OAuth or API token
- Conversations vs messages
- Channel-based routing
- Team inbox support

## Example Conversation Flow

When the skill is invoked:

**Claude:** "I'll help you build a custom customer support automation skill! First, let me understand your support stack:

1. What platform do you use for customer support tickets? (Zendesk, Intercom, HelpScout, etc.)
2. What do you use for billing and payments?
3. Do you have access to your production database?
4. Do you have API credentials for these platforms?
5. Any other tools you regularly use for support?"

**User answers questions**

**Claude:** "Perfect! Here's what I understand:
- Support: HelpScout
- Billing: Stripe
- Database: PostgreSQL (read-only access)

I'll create a support automation skill with:
- Scripts to list/fetch/reply to HelpScout conversations
- Scripts to search Stripe and issue refunds
- Database queries for customer lookups
- Response templates for common scenarios
- Automated triage workflow

Should I proceed?"

**User:** "Yes"

**Claude starts building...**

## Common Questions

**Q: Can this work with any support platform?**
A: Yes! As long as they have an API, we can build scripts for it. Common platforms (Zendesk, Intercom, HelpScout, Front) are well-documented.

**Q: Do they need to be technical?**
A: They need API access and the ability to run scripts. The skill does the coding for them.

**Q: How long does this take?**
A: 30-60 minutes for a basic setup with 5-10 scripts and templates. More complex integrations take longer.

**Q: Can they customize later?**
A: Absolutely! That's the point. They can add scripts, templates, and workflow steps as they identify repetitive tasks.

## Remember

The goal is to create a **working, practical tool** that saves them time every day. Focus on:
- Scripts that actually work with their platforms
- Clear documentation they can reference later
- Safety guardrails (approval required)
- Automated triage so they don't waste time scanning tickets
- Templates they'll actually use

Make it useful, not perfect.
