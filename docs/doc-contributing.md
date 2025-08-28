# Documentation Contribution Guide

**Purpose**: Rules and processes for maintaining project documentation  
**Owner**: Documentation Team  
**Last-updated**: 2025-08-29  
**Status**: Process (meta-documentation)

## Document Ownership & Roles

### Roles
- **Owner**: Primary maintainer responsible for content accuracy and approval
- **Reviewer**: Secondary reviewer for changes and consistency checking
- **Contributor**: Team members who can suggest changes via PR

### Current Ownership
- **Backend Architecture** (`spring.md`): Backend Team
- **Frontend Architecture** (`nextjs.md`): Frontend Team  
- **Feature Specifications** (`functions_list.md`): Product Team
- **Process Documents** (`git-commit.md`, `charter.md`): Documentation Team
- **Setup Guides** (`steps.md`, `backend-setup.md`): Onboarding Team

## Change Approval Process

### Standard Changes (Content Updates)
- Typo fixes, clarifications, example updates
- **Process**: Direct PR with 1 reviewer approval
- **Label**: `docs:content`

### Architecture Changes (Structural/Policy)
- Changes to API contracts, rendering strategies, folder conventions
- Changes to development principles or no-go rules
- **Process**: PR with owner approval + 1 additional reviewer
- **Label**: `docs:arch-change`
- **Required**: Discuss impact with affected teams before PR

### Document Structure Changes
- Adding/removing documents, changing ownership
- **Process**: Discussion in team meeting + PR with Documentation Team approval
- **Label**: `docs:structure`

## Document Conventions

### File Naming
- Use lowercase kebab-case: `backend-setup.md`, `git-commit.md`
- Avoid abbreviations unless commonly understood
- Group related files in subdirectories when needed (`examples/`, `features/`)

### Front Matter (Required)
All documents must include this header:
```markdown
# Document Title

**Purpose**: Brief description of document purpose  
**Owner**: Team or individual responsible  
**Last-updated**: YYYY-MM-DD  
**Status**: Canonical | Tutorial | Content | Process
```

### Status Definitions
- **Canonical**: Single source of truth (architecture, contracts, TOCs)
- **Tutorial**: Time-sensitive guides with code examples
- **Content**: Marketing materials, sample data, catalogs  
- **Process**: Team workflows, standards, contribution guides

### Content Guidelines
- Keep canonical docs focused on decisions, not implementation details
- Use links and references rather than duplicating content
- Include verification steps for setup instructions
- Mark time-sensitive content with dates and update frequency

## Document Types & Maintenance

### Canonical Documents
- Must be kept current with actual implementation
- Changes require architecture approval process
- Should link to detailed implementation guides rather than include code examples
- **Examples**: `spring.md`, `nextjs.md`, `charter.md`

### Tutorial Documents  
- Include detailed code examples and step-by-step instructions
- Should be updated when dependencies or procedures change
- Mark with creation date and expected relevance period
- **Examples**: `examples/setup-tutorial.md`, `backend-setup.md`

### Living Specifications
- Feature lists and functional requirements
- Require product team approval for changes
- Should be split into focused documents when they exceed 500 lines
- **Examples**: `functions_list.md`, `roadmap.md`

## Quality Gates

### Before Merging Documentation PRs
- [ ] Front matter header complete and accurate
- [ ] No broken internal links
- [ ] Code examples tested if applicable  
- [ ] Appropriate approval obtained (content vs architecture)
- [ ] Related documents updated if cross-references exist

### Quarterly Documentation Review
- Update "Last-updated" dates for current documents
- Archive outdated tutorial content
- Verify canonical documents match current implementation
- Split large living specifications if needed

## Common Issues & Solutions

### Duplicate Content
- **Problem**: Same information appears in multiple documents
- **Solution**: Choose one canonical location, link from others, update cross-references

### Outdated Examples
- **Problem**: Code examples no longer work with current setup
- **Solution**: Add verification steps, mark examples with dependency versions

### Unclear Ownership
- **Problem**: No clear owner for document maintenance
- **Solution**: Assign during document creation, update ownership table above

---

**Contributing**: To modify this document, open a PR with label `docs:structure` and request review from Documentation Team.
