# Developer Mode - MDC Shark Assistant

## Overview

The developer console is **hidden by default** to provide a clean, distraction-free interface for neurodivergent students taking business intelligence courses at Miami Dade College.

---

## 🔓 Enabling Developer Mode

### Keyboard Shortcut
Press **`Ctrl + Shift + D`** (Windows/Linux) or **`Cmd + Shift + D`** (Mac)

### What Happens
1. A blue notification appears confirming the toggle
2. The developer console panel appears on the left side
3. You can now view technical logs and debug information

### To Disable
Press the same keyboard shortcut again: **`Ctrl + Shift + D`**

---

## 🎯 Why Hidden by Default?

### For Students
- **Reduces Cognitive Load**: Students can focus on learning, not technical details
- **Prevents Confusion**: Technical logs can be overwhelming for non-technical users
- **Clean Interface**: Keeps the UI simple and student-friendly
- **Distraction-Free**: Supports neurodivergent learners who need minimal visual noise

### For Instructors & Developers
- **Easy Access**: Quick keyboard shortcut when needed
- **Full Logging**: All technical information still available when enabled
- **Debugging Support**: View real-time AI communication logs
- **Development Tools**: Monitor tool calls, API responses, and errors

---

## 📊 What You See in Developer Mode

When enabled, the developer console shows:

### Conversation Logs
- **User Messages**: What students are asking
- **AI Responses**: What the assistant is answering
- **Timestamps**: When each interaction occurred

### Tool Usage
- **Function Calls**: When AI uses tools (search, calculations, etc.)
- **Parameters**: What data is being passed
- **Results**: What the tools return

### Technical Logs
- **WebSocket Status**: Connection state
- **API Calls**: Communication with Gemini AI
- **Errors**: Any technical issues that occur
- **Performance**: Response times and data flow

### Filtering Options
- **Conversations**: View only chat interactions
- **Tool Use**: View only AI tool calls
- **All**: View everything

---

## 🎓 Best Practices

### For Instructors
1. **Keep it hidden** during regular student use
2. **Enable temporarily** when troubleshooting student issues
3. **Use for demonstrations** when teaching about AI systems
4. **Show students** how it works if they're interested in the technology

### For Developers
1. **Use during development** to debug issues
2. **Monitor performance** to optimize user experience
3. **Test features** before deploying to students
4. **Document issues** found in the logs

### For Students (Advanced)
- **Not required** for normal use of the assistant
- **Optional learning** for students interested in AI technology
- **Safe to explore** - won't break anything
- **Ask permission** from your instructor before using in class

---

## 🔧 Technical Details

### Implementation
- Hidden via React state (`developerMode` boolean)
- Keyboard listener in `SidePanel.tsx`
- No data loss when hidden (logs still collected)
- Auto-opens when developer mode is enabled

### Keyboard Shortcut Logic
```typescript
// Listens for Ctrl+Shift+D or Cmd+Shift+D
if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
  setDeveloperMode(!developerMode);
}
```

### Privacy Note
- Logs are **client-side only** (not sent to any server)
- Data is **cleared on page refresh**
- **No persistent storage** of student conversations
- **FERPA compliant** - student data stays private

---

## 🎨 UI Changes When Enabled

### Layout
- Developer console appears on the left side
- Main content area adjusts to accommodate panel
- Panel can be collapsed/expanded with toggle button

### Visual Indicators
- Blue notification on toggle
- "Developer Console" header title
- Streaming status indicator (🔵 Streaming / ⏸️ Paused)

### Panel Controls
- **Fold/Unfold Button**: Collapse panel while keeping it enabled
- **Filter Dropdown**: Choose what type of logs to view
- **Text Input**: Send manual messages to AI (for testing)
- **Auto-scroll**: Logs automatically scroll to most recent

---

## 🚀 Use Cases

### Instructor Use
- **Troubleshooting**: Why isn't the AI responding correctly?
- **Demonstration**: Show students how AI processes requests
- **Training**: Teach about AI systems and APIs
- **Quality Assurance**: Verify AI is giving good answers

### Developer Use
- **Debugging**: Find and fix technical issues
- **Testing**: Verify new features work correctly
- **Performance**: Monitor response times
- **Integration**: Check API communication

### Research Use
- **Data Collection**: Study AI interaction patterns (with IRB approval)
- **Analysis**: Understand how students use the assistant
- **Improvement**: Identify areas for enhancement
- **Publishing**: Document AI effectiveness in education

---

## 📝 Tips & Tricks

### Quick Actions
1. **Toggle quickly**: `Ctrl+Shift+D` multiple times to verify it works
2. **Check connection**: Look for 🔵 Streaming indicator
3. **Filter noise**: Use dropdown to show only what you need
4. **Clear view**: Fold panel when you just need it available

### Common Issues
- **Shortcut not working?** Make sure the page has focus (click on it)
- **Logs not showing?** Wait a few seconds for them to appear
- **Panel won't open?** Refresh the page and try again
- **Too much data?** Use the filter dropdown to reduce noise

### Pro Tips
- Enable before testing new features
- Keep disabled during demos to students
- Use for instructor training sessions
- Document issues you find for developers

---

## 🔐 Security & Privacy

### Student Data Protection
- **No cloud storage**: Logs stay in browser memory
- **Session-only**: Data cleared on page close
- **Local only**: Nothing sent to external servers
- **Instructor control**: Only accessible with keyboard shortcut

### Compliance
- **FERPA**: Student privacy protected
- **COPPA**: Safe for all ages
- **GDPR**: No data collection
- **HIPAA**: No health information stored

---

## 📞 Support

### Questions?
- **Instructors**: Contact Professor Marquez
- **Students**: Ask your instructor
- **Developers**: Check code comments in `SidePanel.tsx`
- **Issues**: Document and report through appropriate channels

---

## 🦈 Remember

MDC Shark Assistant is designed to help students succeed. The developer console is a tool for instructors and developers, not a requirement for students. Keep it hidden during normal use to maintain the clean, accessible interface that supports neurodivergent learners.

**Go Sharks! 🦈**

---

**Created by**: Professor Marquez  
**Institution**: Miami Dade College  
**Purpose**: Support neurodivergent students in Business Intelligence courses  
**Version**: 1.0.0

