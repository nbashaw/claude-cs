# Examples

This directory contains example files to demonstrate what the Customer Support Builder skill will create for you.

## What's included

### Templates (`templates/`)
Example response templates for common support scenarios:
- `refund-approved.md` - Confirming a refund
- `bug-report.md` - Acknowledging bugs

These show the format and structure of good templates. The skill will help you create templates tailored to your specific scenarios.

### Scripts (`scripts/`)
Example TypeScript scripts:
- `check-setup.ts` - Validates environment variables

The skill will generate scripts specific to your support stack (HelpScout, Zendesk, Stripe, etc.).

### Configuration
- `config.ts` - Example configuration file with env loading
- `.env.local.example` - Template for environment variables

## How to use these examples

### 1. As references
Look at these files to understand the structure and format before using the skill.

### 2. As starting points
Copy these to your own repository and modify them:

```bash
# Copy a template
cp examples/templates/refund-approved.md your-repo/references/common-responses/

# Copy config structure
cp examples/config.ts your-repo/support-automation/
```

### 3. As testing material
Use these to test the skill before building your own:

```bash
# Test with example structure
cd examples
npx tsx scripts/check-setup.ts
```

## What the skill generates

When you use `/customer-support-builder`, you'll get:

1. **Scripts customized for YOUR platforms**
   - Not just HelpScout - works with Zendesk, Intercom, etc.
   - Specific to your API authentication method
   - Includes all the operations you need

2. **Templates for YOUR scenarios**
   - Based on your most common support issues
   - Using your company's tone and style
   - With placeholders that make sense for your data

3. **Configuration for YOUR setup**
   - Environment variables for your APIs
   - Database connection if needed
   - Validation specific to your requirements

4. **Documentation for YOUR workflow**
   - Step-by-step process for your team
   - Triage rules for your customer patterns
   - Examples using your platform's terminology

## Note

These are **simplified examples**. The skill generates more comprehensive, production-ready code tailored to your specific needs.

## Questions?

- Read the main [README](../README.md)
- Check [GETTING_STARTED](../.claude/skills/customer-support-builder/GETTING_STARTED.md)
- Invoke `/customer-support-builder` to build your own!
