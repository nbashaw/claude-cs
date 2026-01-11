# Customer Support Skill Builder

A Claude Code skill that helps you build custom customer support automation for your company.

## What is this?

This is a meta-skill that guides you through creating your own customer support automation system. Instead of manually handling tickets, you'll have an AI assistant that can:

- **Automatically triage** all open support tickets by urgency
- **Gather customer context** from multiple platforms (support, billing, database)
- **Draft responses** using templates tailored to your scenarios
- **Execute common operations** (refunds, cancellations, etc.) via scripts
- **Suggest the most important ticket** to handle first (just say "yes" to start)

## How it works

The skill walks you through:

1. **Discovery** - Understanding your support stack (Zendesk? Stripe? Database?)
2. **Planning** - Mapping out the scripts you'll need for your platforms
3. **Building** - Creating TypeScript scripts that interact with your APIs
4. **Templates** - Generating response templates for common scenarios
5. **Workflow** - Setting up an automated triage and response workflow
6. **Testing** - Validating everything works before production use

## What you'll get

By the end, you'll have:

- ✅ **Working scripts** for your support platform (list tickets, reply, close, etc.)
- ✅ **Billing operations** (search customers, refunds, cancellations)
- ✅ **Database queries** (read-only customer lookups)
- ✅ **Response templates** for your common support scenarios
- ✅ **Automated triage** that suggests the most urgent ticket to handle
- ✅ **Complete documentation** for your team

## Installation

### Option 1: Install from marketplace (Recommended)

1. Add the marketplace:
   ```bash
   claude plugin marketplace add nbashaw/claude-cs
   ```

2. Install the skill:
   ```bash
   claude plugin install customer-support-builder
   ```

3. Use it in any repository:
   ```bash
   cd /path/to/your/company/repo
   claude
   /customer-support-builder
   ```

### Option 2: Manual installation

1. Clone this repository:
   ```bash
   cd ~/.claude/skills
   git clone https://github.com/nbashaw/claude-cs
   ```

2. Invoke the skill in Claude Code:
   ```bash
   /customer-support-builder
   ```

## Prerequisites

Before starting, you'll need:

- Claude Code CLI installed and configured
- API credentials for your support/billing platforms
- Access to your company's git repository
- (Optional) Database access for customer lookups

## Example: What you'll create

Here's what a typical support automation looks like:

### Directory Structure
```
support-automation/
├── config.ts                           # Environment loading
├── scripts/
│   ├── check-setup.ts                 # Validate setup
│   ├── list-open-tickets.ts          # Fetch all tickets
│   ├── get-ticket.ts                  # Get ticket details
│   ├── reply-to-ticket.ts            # Send responses
│   ├── close-ticket.ts               # Close tickets
│   ├── get-customer-context.ts       # Unified customer view
│   ├── search-billing.ts             # Look up billing info
│   ├── issue-refund.ts               # Process refunds
│   └── cancel-subscription.ts        # Cancel subscriptions
└── references/
    └── common-responses/
        ├── refund-approved.md
        ├── bug-report.md
        ├── feature-request.md
        └── ...
```

### Example Workflow

```bash
# Invoke your support skill
/support

# Claude automatically:
# 1. Lists ALL open tickets (with pagination)
# 2. Triages by urgency (🚨 Critical, ⚠️ High, 📋 Medium, 📧 Low)
# 3. Suggests: "The most urgent ticket is #12345 (customer charged twice).
#    Should I start with this one?"

# You say: "yes"

# 4. Fetches full ticket details
# 5. Gathers customer context (billing status, subscription, history)
# 6. Drafts a response using your templates
# 7. Shows you the draft and asks for approval
# 8. Sends the reply after you approve
# 9. Closes the ticket if resolved
# 10. Moves to the next urgent ticket
```

## Supported Platforms

This skill can help you integrate with:

### Support/Ticketing
- Zendesk
- Intercom
- HelpScout
- Freshdesk
- Front
- Linear
- Any platform with an API

### Billing/Payments
- Stripe
- Chargebee
- Paddle
- Braintree
- Any payment processor with an API

### Databases
- PostgreSQL
- MySQL
- MongoDB
- Any SQL database

### Other Tools
- Analytics (Mixpanel, Amplitude)
- Feature flags (LaunchDarkly)
- Email services (SendGrid, Postmark)

## Real-World Example

The [Lex support skill](https://github.com/nbashaw/lex) was built using this approach:

- **15 scripts** for HelpScout, Stripe, and PostgreSQL
- **6 response templates** for common scenarios
- **Automatic triage** with keyword detection
- **Unified customer context** across all platforms
- Handles ~80% of support tasks with "yes/no" approvals

## Philosophy

### Proactive, not reactive
The skill **automatically** lists and triages all tickets. You don't waste time scanning - it tells you what's most important.

### Suggest, don't decide
The skill recommends actions but always requires your approval. It's an assistant, not autopilot.

### Context before response
Always gathers full customer context (billing, usage, history) before drafting a response.

### Templates as starting points
Provides response templates but personalizes them based on the specific situation.

### Safety first
- Requires explicit approval before sending anything
- Uses read-only database connections
- Never commits credentials to git
- Validates setup before use

## Who is this for?

### Perfect for:
- **Startups** handling 10-100 support tickets/day
- **Teams** wanting to standardize support responses
- **Solo founders** doing support while building
- **Companies** with complex support workflows across multiple platforms

### Not ideal for:
- Enterprise with dedicated support software (though could still help!)
- Teams with no API access to their platforms
- Complete beginners (need basic familiarity with APIs and CLIs)

## FAQ

**Q: How long does this take?**
A: 30-60 minutes for a basic setup with core scripts and templates. You can expand over time.

**Q: Do I need to be technical?**
A: You need API access and ability to run scripts. The skill does the coding for you.

**Q: Can I customize it later?**
A: Absolutely! Add scripts, templates, and workflow steps as you identify repetitive tasks.

**Q: Will this work with my platform?**
A: If your platform has an API, yes! The skill adapts to your specific stack.

**Q: Is this safe?**
A: Yes - it always requires your approval before sending messages or making changes.

**Q: Can my team use this?**
A: Yes! Once built, anyone on your team with API access can use the automation.

## Examples of automations you can build

- Auto-triage tickets by keywords and customer history
- One-click refunds with automatic email response
- Gather full customer context before replying
- Apply discount codes for billing issues
- Query database for troubleshooting
- Close multiple resolved tickets at once
- Search billing history across tickets
- Generate reports on common issues

## Contributing

Have ideas for improving this skill? Found a bug? PRs welcome!

## License

MIT

## Credits

Created by [Nick Bashaw](https://github.com/nbashaw) for the Claude Code community.

Inspired by real-world support automation at [Lex](https://lex.page).

---

**Ready to automate your support workflow?** Install the skill and invoke `/customer-support-builder` to get started!
