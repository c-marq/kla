# MDC AI Assignment Assistant

**Miami Dade College**  
**Created by Professor Marquez**

## 🎓 Purpose

This AI-powered application helps neurodivergent students at Miami Dade College complete their assignments with intelligent assistance. The interface is specifically designed with accessibility and cognitive ease in mind.

---

## 🎨 Design Highlights

### Miami Dade College Branding
- **Primary Color**: MDC Blue (#0066CC) - Promotes trust and focus
- **Secondary Color**: MDC Orange (#FF6600) - Encourages engagement and motivation
- **Logo**: Prominently displayed in header with college branding

### Neurodivergent-Friendly Features
1. **High Contrast Design**: WCAG AAA compliant for maximum readability
2. **Reduced Saturation**: Colors chosen to minimize visual overstimulation
3. **Consistent Patterns**: Predictable layouts reduce cognitive load
4. **Clear Hierarchy**: Visual organization supports information processing
5. **Calming Color Palette**: Blues and muted tones reduce anxiety

---

## 🌟 Key Features

### For Students
- **AI Assignment Help**: Intelligent assistance for completing coursework
- **Accessible Interface**: Designed specifically for neurodivergent learners
- **Clear Visual Feedback**: Color-coded states and progress indicators
- **Focus Mode**: Distraction-reduced environment for deep work
- **Multimodal Input**: Text, voice, and visual input options

### For Educators
- **Progress Tracking**: Monitor student engagement and completion
- **Customizable Settings**: Adjust interface to student needs
- **Assignment Management**: Organize and track student work
- **Accessibility First**: Built-in accommodations for diverse learners

---

## 🎯 Color System Logic

### Why These Colors?

#### MDC Blue (#0066CC)
- **Psychology**: Promotes calmness, focus, and trust
- **Accessibility**: High contrast against white backgrounds
- **Branding**: Official Miami Dade College color
- **Use Case**: Primary actions, navigation, institutional trust

#### MDC Orange (#FF6600)
- **Psychology**: Energizing without being alarming
- **Accessibility**: Warm and inviting, high visibility
- **Branding**: Official Miami Dade College accent color
- **Use Case**: Call-to-action, motivation, important highlights

#### Success Green (#2D7A3E)
- **Psychology**: Positive reinforcement, calm achievement
- **Accessibility**: Muted to avoid neon effect
- **Use Case**: Completed tasks, positive feedback

#### Focus Purple (#7B68B8)
- **Psychology**: Promotes concentration and calm
- **Accessibility**: Distinctive without being overwhelming
- **Use Case**: Focus mode, deep work features

#### Warning Amber (#E67E22)
- **Psychology**: Attention without panic
- **Accessibility**: Warmer alternative to yellow
- **Use Case**: Important notices, gentle warnings

---

## 📊 Accessibility Standards

### WCAG AAA Compliance
All text meets or exceeds WCAG AAA standards:
- **Primary Text**: 11.5:1 contrast ratio
- **Secondary Text**: 8.2:1 contrast ratio
- **Interactive Elements**: Minimum 4.5:1 contrast

### Neurodivergent Considerations
- ✅ Reduced motion animations
- ✅ Consistent color meanings
- ✅ Clear focus indicators
- ✅ Predictable layouts
- ✅ No flashing content
- ✅ Ample white space
- ✅ Clear visual hierarchy

### Screen Reader Support
- ✅ Semantic HTML structure
- ✅ ARIA labels on all interactive elements
- ✅ Keyboard navigation support
- ✅ Skip navigation links
- ✅ Alternative text for images

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- Gemini API key
- Modern web browser

### Installation
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your REACT_APP_GEMINI_API_KEY to .env

# Start development server
npm start
```

### Building for Production
```bash
npm run build
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── header/          # MDC branding and attribution
│   ├── control-tray/    # Main controls
│   ├── side-panel/      # Navigation and settings
│   ├── logger/          # Activity logging
│   └── ...
├── contexts/            # React contexts
├── hooks/               # Custom React hooks
├── lib/                 # Utilities and helpers
└── App.scss            # Global styles and color system
```

---

## 🎨 Design System

For detailed information about the color system, accessibility features, and design rationale, see:
- **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** - Complete design documentation

### Quick Reference

#### Primary Colors
```css
--mdc-blue: #0066CC;
--mdc-orange: #FF6600;
```

#### Supporting Colors
```css
--success-green: #2D7A3E;
--focus-purple: #7B68B8;
--warning-amber: #E67E22;
```

#### Neutrals
```css
--text-primary: #1A1A1A;
--background: #FAFAFA;
--surface: #FFFFFF;
```

---

## 👨‍🏫 About the Creator

**Professor Marquez**  
Miami Dade College

This application was created with a deep commitment to supporting neurodivergent students in their academic journey. Every design decision was made with accessibility, cognitive ease, and student success in mind.

### Design Philosophy
> "Technology should adapt to the student, not the other way around. By understanding the unique needs of neurodivergent learners, we can create tools that empower rather than hinder."

---

## 🤝 Contributing

This is an educational project for Miami Dade College students. Suggestions and improvements are welcome!

### Areas for Contribution
- Accessibility testing with diverse user groups
- Additional neurodivergent-friendly features
- Performance optimizations
- Documentation improvements

---

## 📄 License

Educational Use - Miami Dade College  
Created for the benefit of MDC students

---

## 🙏 Acknowledgments

- **Miami Dade College** - For supporting innovative educational technology
- **Neurodivergent Students** - For inspiring this accessible design
- **Disability Services** - For guidance on accessibility best practices
- **Google Gemini** - For AI capabilities powering the assistant

---

## 📞 Support

For questions, support, or feedback:
- **Creator**: Professor Marquez
- **Institution**: Miami Dade College
- **Purpose**: Supporting student academic success

---

## 🔮 Future Enhancements

### Planned Features
- [ ] Dark mode for low-light environments
- [ ] Additional language support
- [ ] Voice-first interaction mode
- [ ] Progress tracking dashboard
- [ ] Customizable interface themes
- [ ] Integration with MDC learning management system

### Research Goals
- Conduct user studies with MDC students
- Measure impact on assignment completion rates
- Gather feedback from disability services
- Iterate based on real-world usage

---

**Version**: 1.0  
**Last Updated**: October 2024  
**Status**: Active Development

---

## 🎯 Mission Statement

To create an accessible, supportive, and effective AI-powered tool that helps neurodivergent students at Miami Dade College achieve their full academic potential through thoughtful design and inclusive technology.

---

*Built with ❤️ for MDC Students by Professor Marquez*


