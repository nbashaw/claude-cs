# Installation Instructions

## Quick Install (2 commands)

```bash
# 1. Add the marketplace
claude plugin marketplace add nbashaw/claude-cs

# 2. Install the skill
claude plugin install customer-support-builder
```

That's it! Now you can use `/customer-support-builder` in any repository.

## What this does

- Downloads the skill to `~/.claude/plugins/`
- Makes it available in all your Claude Code sessions
- You can invoke it with `/customer-support-builder` from any directory

## Usage

```bash
# Navigate to your company repository
cd /path/to/your/company/repo

# Start Claude Code
claude

# Invoke the skill
/customer-support-builder

# Answer questions about your support stack
# Claude will build your automation!
```

## Alternative: Manual Installation

If you prefer to install manually:

```bash
# Clone to the skills directory
cd ~/.claude/skills
git clone https://github.com/nbashaw/claude-cs

# The skill will be available as /customer-support-builder
```

## Updating

To get the latest version:

```bash
claude plugin update customer-support-builder
```

Or if manually installed:

```bash
cd ~/.claude/skills/claude-cs
git pull
```

## Uninstalling

```bash
claude plugin uninstall customer-support-builder
```

Or if manually installed:

```bash
rm -rf ~/.claude/skills/claude-cs
```

## Troubleshooting

**"Marketplace not found"**
- Make sure you added it: `claude plugin marketplace add nbashaw/claude-cs`
- Check it's listed: `claude plugin marketplace list`

**"Skill not found"**
- Make sure you installed it: `claude plugin install customer-support-builder`
- Restart Claude Code

**"Command not found: /customer-support-builder"**
- Restart Claude Code after installation
- Check the skill is installed: `ls ~/.claude/plugins/`

## Need Help?

- [README](README.md) - Full documentation
- [Getting Started](https://github.com/nbashaw/claude-cs/blob/main/.claude/skills/customer-support-builder/GETTING_STARTED.md) - Detailed walkthrough
- [Issues](https://github.com/nbashaw/claude-cs/issues) - Report bugs or ask questions
