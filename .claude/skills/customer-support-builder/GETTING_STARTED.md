# Getting Started with Customer Support Builder

## Quick Start (5 minutes)

1. **Install the skill**
   ```bash
   # Add the marketplace
   claude plugin marketplace add nbashaw/claude-cs

   # Install the skill
   claude plugin install customer-support-builder
   ```

2. **Navigate to your company repository**
   ```bash
   cd /path/to/your/company/repo
   claude
   ```

3. **Invoke the skill**
   ```
   /customer-support-builder
   ```

4. **Answer the discovery questions**
   The skill will ask about your support stack:
   - What ticketing platform? (Zendesk, HelpScout, etc.)
   - What billing system? (Stripe, Chargebee, etc.)
   - Database access?
   - API credentials ready?

5. **Let Claude build your automation**
   It will create:
   - Scripts for your platforms
   - Response templates
   - Workflow documentation
   - Setup validation

6. **Add your API credentials**
   ```bash
   # Create .env.local in your repo root
   SUPPORT_API_KEY=your_key_here
   BILLING_API_KEY=your_key_here
   DATABASE_URL=postgresql://...
   ```

7. **Test the setup**
   ```bash
   npx tsx support-automation/scripts/check-setup.ts
   ```

8. **Try it out!**
   ```bash
   # If installed as a skill
   /support

   # Or run directly
   npx tsx support-automation/scripts/list-open-tickets.ts
   ```

## What to expect

### Time investment
- **Initial build**: 30-60 minutes with Claude's help
- **First use**: 5-10 minutes to handle a ticket
- **Long-term**: Saves hours per week

### Learning curve
- **Day 1**: Follow Claude's suggestions, approve responses
- **Week 1**: Start recognizing patterns, using templates confidently
- **Month 1**: Add custom scripts for your repetitive tasks

## Example walkthrough

Let's say you use HelpScout and Stripe:

**You:** `/customer-support-builder`

**Claude:** "I'll help you build support automation! What platform do you use for tickets?"

**You:** "HelpScout for tickets, Stripe for billing. I have a PostgreSQL database."

**Claude:** "Perfect! I'll create:
- HelpScout scripts (list, get, reply, close conversations)
- Stripe scripts (search, refunds, cancellations)
- PostgreSQL queries (read-only)
- Response templates for common scenarios

Creating the project structure now..."

*Claude builds everything*

**Claude:** "Done! I've created 10 scripts and 5 templates. Now:
1. Add your API keys to .env.local
2. Run: npx tsx support-automation/scripts/check-setup.ts
3. Test: npx tsx support-automation/scripts/list-open-tickets.ts

Ready to test?"

**You:** "Yes"

*You add API keys and test*

**You:** `/support` *(to use your new skill)*

**Claude automatically:**
- Lists all 23 open conversations
- Identifies 2 CRITICAL (billing issues)
- "The most urgent is conversation #12345 (customer charged twice). Should I start with this one?"

**You:** "yes"

**Claude:**
- Fetches full conversation
- Gets customer context from Stripe and database
- Drafts refund response using template
- "Here's my suggested response: [draft]. Should I send this?"

**You:** "yes"

**Claude:** Sends reply and closes conversation. "Done! Should I move to the next critical ticket?"

## Tips for success

### Start simple
Don't try to automate everything on day 1. Start with:
1. List tickets
2. Get ticket details
3. Reply to tickets
4. Basic templates

Add more as you identify repetitive tasks.

### Use it daily
The more you use it, the better it gets. You'll discover:
- New scenarios that need templates
- Common operations that should be scripts
- Triage patterns specific to your customers

### Iterate based on real use
Keep a running list of improvements:
- "I had to manually look up X - should be a script"
- "This response comes up a lot - needs a template"
- "This keyword always indicates urgency - add to triage"

### Get your team involved
Once working, share with your team:
- Document the workflow
- Train them on common scenarios
- Collect feedback for improvements

## Common first-day questions

**"How do I get API credentials?"**
- Check your platform's developer/integrations settings
- Most platforms: Settings → API → Create token/key
- Keep credentials in .env.local (never commit!)

**"What if my script fails?"**
- Check the error message in the JSON output
- Verify API credentials with check-setup.ts
- Test API access directly (curl or Postman)
- Ask Claude to help debug

**"Can I test without sending real messages?"**
- Yes! Test list and get scripts freely
- For reply scripts, use a test ticket or test mode
- Some platforms have sandbox environments

**"What if I need to modify a script?"**
- Just ask Claude! "Can you update search-billing.ts to also show payment history?"
- The scripts are yours to modify
- Keep them in git so you can track changes

**"How do I add a new template?"**
- Create a new .md file in references/common-responses/
- Follow the format of existing templates
- Tell Claude about it so it knows to use it

## Next steps

After your first successful ticket:

1. **Review the workflow** - What felt smooth? What was clunky?
2. **Add more templates** - Which responses do you write often?
3. **Expand scripts** - What manual steps could be automated?
4. **Refine triage** - Are urgency keywords accurate?
5. **Document edge cases** - Add notes to skill.md

## Need help?

- **Check the README** - Comprehensive overview
- **Read the skill.md** - Claude's instruction manual
- **Ask Claude** - "How do I [task] with my support skill?"
- **Review examples** - Look at the Lex support skill

## Success metrics

You'll know it's working when:
- ✅ You don't scan tickets manually anymore
- ✅ Common responses take 30 seconds (draft → approve → send)
- ✅ You can handle 2-3x more tickets per hour
- ✅ Response quality is more consistent
- ✅ You spend time on hard problems, not repetitive ones

---

**Ready to build?** Navigate to your repo and run `/customer-support-builder` to start!
