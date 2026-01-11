# Publishing Your Skill

Quick guide for sharing the Customer Support Builder skill with others.

## Option 1: GitHub Repository (Recommended)

### 1. Create a GitHub repository

```bash
cd ~/dev/claude-cs
git init
git add .
git commit -m "Initial commit: Customer Support Builder skill"
```

### 2. Push to GitHub

```bash
# Create repo on GitHub first, then:
git remote add origin https://github.com/yourusername/customer-support-builder.git
git branch -M main
git push -u origin main
```

### 3. Users can install with

```bash
cd ~/.claude/skills
git clone https://github.com/yourusername/customer-support-builder.git
```

Then invoke with `/customer-support-builder` in Claude Code.

## Option 2: npm Package

If you want to publish to npm:

### 1. Update package.json

```bash
# Edit package.json and change:
# - "name" to "@yourusername/customer-support-builder"
# - "author" to your name
# - "repository" URL to your repo
```

### 2. Publish to npm

```bash
npm login
npm publish --access public
```

### 3. Users can install with

```bash
cd ~/.claude/skills
npm install -g @yourusername/customer-support-builder
```

## Option 3: Direct Copy

Users can also copy the skill directly:

```bash
# Create the directory
mkdir -p ~/.claude/skills/customer-support-builder

# Copy skill.md
cp /path/to/customer-support-builder/.claude/skills/customer-support-builder/skill.md \
   ~/.claude/skills/customer-support-builder/

# Copy supporting files if needed
cp -r /path/to/customer-support-builder/examples \
   ~/.claude/skills/customer-support-builder/
```

## Sharing Best Practices

### README should include:
- ✅ Clear description of what it does
- ✅ Quick start instructions
- ✅ Prerequisites
- ✅ Example workflow
- ✅ Supported platforms
- ✅ Link to examples

### skill.md should include:
- ✅ Comprehensive workflow instructions
- ✅ Step-by-step guidance for Claude
- ✅ Examples for each platform
- ✅ Safety guidelines (approval required!)
- ✅ Troubleshooting tips

### Include examples that show:
- ✅ Template format
- ✅ Script structure
- ✅ Configuration pattern
- ✅ Environment variable setup

## Marketing Your Skill

### Where to share:
- Claude Code Discord/community
- Twitter/X with #ClaudeCode hashtag
- Dev.to or Medium article
- Your company blog
- Product Hunt (if public)

### What to highlight:
- Time saved per ticket
- % of support automated
- Real workflow screenshots
- Before/after comparisons
- Specific integrations supported

### Example tweet:
> "Built a Claude Code skill that automates our support workflow 🚀
>
> - Auto-triages ALL tickets by urgency
> - Gathers customer context (Stripe + DB + history)
> - Drafts responses using templates
> - Just say 'yes' to send
>
> Saves ~10hrs/week. Works with any support platform.
>
> [link to repo]"

## Version Updates

When you improve the skill:

### 1. Update version in package.json

```json
{
  "version": "1.1.0"
}
```

### 2. Document changes in CHANGELOG.md

```markdown
## [1.1.0] - 2024-01-15
### Added
- Support for Zendesk integration
- Automatic pagination for large ticket lists
- New template for billing issues

### Fixed
- Environment variable validation
- Error handling for API timeouts
```

### 3. Create a git tag

```bash
git tag v1.1.0
git push origin v1.1.0
```

### 4. Announce the update

Users can update with:
```bash
cd ~/.claude/skills/customer-support-builder
git pull
```

## Getting Feedback

### Ask users:
- What platforms do they use?
- What features are missing?
- What templates would be helpful?
- Where did they get stuck?
- What would make it easier?

### Iterate based on:
- Common platform requests (add more integrations)
- Workflow pain points (improve automation)
- Template needs (add more scenarios)
- Setup difficulties (better documentation)

## Contributing Guidelines

If you want others to contribute:

### Create CONTRIBUTING.md

```markdown
# Contributing

We welcome contributions! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing`)
3. Make your changes
4. Test with a real support workflow
5. Commit (`git commit -m 'Add amazing feature'`)
6. Push (`git push origin feature/amazing`)
7. Open a Pull Request

### What we're looking for:
- New platform integrations
- More template examples
- Workflow improvements
- Better error handling
- Documentation updates
```

## Support

### How to help users:
- Monitor GitHub Issues
- Answer questions in discussions
- Update docs based on FAQs
- Create video walkthroughs
- Write blog posts with examples

### Common support questions:
- "How do I get API credentials?" → Link to platform docs
- "My script fails" → Check error message, verify env vars
- "Can I use with [platform]?" → If they have an API, yes!
- "How do I customize?" → Point to skill.md and examples

## Analytics (Optional)

Track adoption (if public):
- GitHub stars
- npm downloads
- Clone/fork rate
- Issues/discussions
- Community mentions

Use this to prioritize improvements and new features.

---

Ready to share your skill? Push to GitHub and tell the world! 🚀
