# 🤝 Contributing to Autonomous AI Resume Builder

Thank you for your interest in contributing to our AI Resume Builder! This document provides guidelines and information for contributors.

## 🎯 How to Contribute

### 1. **Fork the Repository**
```bash
git clone https://github.com/shikhar3dev/-autonomous-ai-resume-builder.git
cd autonomous-ai-resume-builder
```

### 2. **Create a Feature Branch**
```bash
git checkout -b feature/amazing-feature
# or
git checkout -b fix/bug-fix
```

### 3. **Make Your Changes**
- Follow the coding standards
- Add tests for new features
- Update documentation if needed

### 4. **Test Your Changes**
```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test

# Run linting
npm run lint
```

### 5. **Commit Your Changes**
```bash
git add .
git commit -m "feat: add amazing feature"
```

### 6. **Push and Create Pull Request**
```bash
git push origin feature/amazing-feature
```

## 📋 Pull Request Guidelines

### **Before Submitting:**
- [ ] Code follows the style guidelines
- [ ] Self-review of your code
- [ ] Tests pass locally
- [ ] Documentation is updated
- [ ] No console errors or warnings

### **PR Title Format:**
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

### **PR Description:**
- Clear description of changes
- Screenshots for UI changes
- Link to related issues
- Testing instructions

## 🛠️ Development Setup

### **Prerequisites:**
- Node.js 18+
- npm or yarn
- Git

### **Installation:**
```bash
# Clone repository
git clone https://github.com/shikhar3dev/-autonomous-ai-resume-builder.git
cd autonomous-ai-resume-builder

# Install dependencies
npm install
cd frontend && npm install
cd ../backend && npm install

# Start development servers
# Terminal 1 - Backend
cd backend && npm start

# Terminal 2 - Frontend
cd frontend && npm start
```

## 📁 Project Structure

```
autonomous-ai-resume-builder/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── api.js          # API integration
│   │   └── App.js          # Main application
│   └── package.json
├── backend/                 # Node.js server
│   ├── server.js           # Main server file
│   ├── routes/             # API routes
│   └── package.json
├── .github/                # GitHub workflows
├── docs/                   # Documentation
└── README.md              # Project documentation
```

## 🎨 Code Style Guidelines

### **JavaScript/React:**
- Use ES6+ features
- Prefer functional components with hooks
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Follow Airbnb JavaScript Style Guide

### **CSS/TailwindCSS:**
- Use TailwindCSS utility classes
- Follow mobile-first approach
- Maintain consistent spacing and colors
- Use semantic class names

### **File Naming:**
- Use PascalCase for components: `ResumeBuilder.js`
- Use camelCase for utilities: `apiUtils.js`
- Use kebab-case for files: `resume-builder.css`

## 🧪 Testing Guidelines

### **Backend Tests:**
- Unit tests for all functions
- Integration tests for API endpoints
- Test error handling scenarios
- Mock external dependencies

### **Frontend Tests:**
- Component unit tests
- User interaction tests
- Accessibility tests
- Cross-browser compatibility

### **Running Tests:**
```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test

# Coverage report
npm run test:coverage
```

## 🐛 Bug Reports

### **Before Reporting:**
- Check existing issues
- Search for similar problems
- Test with latest version

### **Bug Report Template:**
```markdown
**Bug Description:**
Clear description of the issue

**Steps to Reproduce:**
1. Step 1
2. Step 2
3. Step 3

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happens

**Environment:**
- OS: [e.g., Windows 10]
- Browser: [e.g., Chrome 90]
- Node.js: [e.g., 18.0.0]

**Screenshots:**
If applicable, add screenshots
```

## 💡 Feature Requests

### **Feature Request Template:**
```markdown
**Feature Description:**
Clear description of the feature

**Use Case:**
Why this feature is needed

**Proposed Solution:**
How you think it should work

**Alternatives Considered:**
Other approaches you've thought about

**Additional Context:**
Any other relevant information
```

## 🔒 Security

### **Security Guidelines:**
- Never commit sensitive data
- Follow OWASP security guidelines
- Validate all inputs
- Use HTTPS in production
- Keep dependencies updated

### **Reporting Security Issues:**
- Email: security@ai-resume-builder.com
- Don't create public issues for security problems
- Provide detailed reproduction steps

## 📚 Documentation

### **Documentation Standards:**
- Clear and concise writing
- Include code examples
- Keep documentation up-to-date
- Use proper markdown formatting

### **Documentation Areas:**
- README.md updates
- API documentation
- Component documentation
- Deployment guides

## 🏆 Recognition

### **Contributor Recognition:**
- Contributors will be added to the README
- Special recognition for significant contributions
- Featured in release notes

### **Contributor Levels:**
- **Bronze**: 1-5 contributions
- **Silver**: 6-15 contributions
- **Gold**: 16+ contributions
- **Platinum**: Core team member

## 📞 Getting Help

### **Support Channels:**
- GitHub Issues: [Create Issue](https://github.com/shikhar3dev/-autonomous-ai-resume-builder/issues)
- Discussions: [GitHub Discussions](https://github.com/shikhar3dev/-autonomous-ai-resume-builder/discussions)
- Email: support@ai-resume-builder.com

### **Community Guidelines:**
- Be respectful and inclusive
- Help others learn
- Share knowledge
- Follow the code of conduct

## 🎉 Thank You!

Thank you for contributing to the Autonomous AI Resume Builder! Your contributions help make this project better for everyone.

---

**Happy Coding! 🚀**
