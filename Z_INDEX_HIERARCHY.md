# Z-Index Hierarchy - MDC Shark Assistant

**Purpose**: Maintain consistent stacking order across all UI components

---

## 🎯 **Z-Index Reference**

### **Layer System**

| Layer | Z-Index | Component | Purpose |
|-------|---------|-----------|---------|
| **Base** | 1 | Mic button | Button effects |
| **Base** | -1 | Mic button before | Volume visualization |
| **UI Base** | 50 | Theme toggle | Header controls |
| **Header** | 100 | Header | Top navigation bar |
| **Overlay Low** | 100 | Speech indicator | Status feedback |
| **Overlay Mid** | 150 | Camera preview | Video preview window |
| **Overlay High** | 200 | Action confirmation | Success/error messages |
| **Modal** | 250 | Settings dialog | Modal dialogs |

---

## 📊 **Visual Stacking Order**

```
┌─────────────────────────────────────────────┐
│  Settings Dialog (250)                      │  ← Top
│  ┌─────────────────────────────────────┐   │
│  │  Modal content                       │   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  Action Confirmation (200)                  │
│  ✅ File uploaded!                          │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  Camera Preview (150)                       │
│  📹 Camera Active                           │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  Speech Indicator (100)                     │
│  🔊 Listening...                            │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  Header (100)                               │
│  [Logo] Shark Assistant     [Theme] [Prof]  │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  Theme Toggle (50)                          │
│  In header, but lower z-index               │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  Main Content (default/auto)                │  ← Bottom
│  Regular page content                       │
└─────────────────────────────────────────────┘
```

---

## 🔧 **Implementation**

### **Component Files**

#### 1. **Mic Button** (`src/components/control-tray/control-tray.scss`)
```scss
.mic-button {
  z-index: 1;
  
  &:before {
    z-index: -1; // Volume visualization behind button
  }
}
```

#### 2. **Theme Toggle** (`src/components/theme-toggle/theme-toggle.scss`)
```scss
.theme-toggle {
  position: relative;
  z-index: 50; // In header but below header itself
}
```

#### 3. **Header** (`src/components/header/header.scss`)
```scss
.mdc-header {
  z-index: 100; // Top nav bar
}

.dev-mode-hint {
  z-index: 99; // Slightly below header
}
```

#### 4. **Speech Indicator** (`src/components/speech-indicator/speech-indicator.scss`)
```scss
.speech-indicator {
  z-index: 100; // Same level as header, appears above content
}
```

#### 5. **Camera Preview** (`src/components/camera-preview/camera-preview.scss`)
```scss
.camera-preview {
  z-index: 150; // Above header and indicators
}
```

#### 6. **Action Confirmation** (`src/components/action-confirmation/action-confirmation.scss`)
```scss
.action-confirmation {
  z-index: 200; // Above all previews
}
```

#### 7. **Settings Dialog** (`src/components/settings-dialog/settings-dialog.scss`)
```scss
.dialog {
  z-index: 250; // Modal level - highest
}
```

---

## 🎨 **Design Principles**

### **1. Layer Groups**
- **0-49**: Base UI elements and effects
- **50-99**: In-header controls
- **100-149**: Navigation and persistent UI
- **150-199**: Floating panels and previews
- **200-249**: Notifications and toasts
- **250+**: Modal dialogs and overlays

### **2. Reasoning**

#### **Why Settings Dialog = 250?**
- ✅ Modal should be on top of everything
- ✅ User expects dialog to cover all content
- ✅ Prevents confusion from partial overlap
- ✅ Standard modal pattern

#### **Why Camera Preview = 150?**
- ✅ Important but not critical
- ✅ Can coexist with confirmations
- ✅ Should appear above main content
- ✅ Below notifications for visibility

#### **Why Header = 100?**
- ✅ Always visible navigation
- ✅ Sticky positioning
- ✅ Consistent reference point
- ✅ Standard header z-index

---

## 🐛 **Common Issues & Fixes**

### **Issue 1: Component Behind Header**
**Symptom**: Element appears under the header
**Fix**: Set z-index > 100

```scss
// ❌ Wrong - will be behind header
.my-component {
  position: fixed;
  top: 20px;
  // No z-index set
}

// ✅ Correct - appears above header
.my-component {
  position: fixed;
  top: 20px;
  z-index: 150;
}
```

### **Issue 2: Modal Behind Other Elements**
**Symptom**: Dialog/modal partially hidden
**Fix**: Set z-index to modal level (250+)

```scss
// ❌ Wrong - might be covered
.modal {
  position: fixed;
  z-index: 100;
}

// ✅ Correct - always on top
.modal {
  position: fixed;
  z-index: 250;
}
```

### **Issue 3: Overlapping Floating Elements**
**Symptom**: Two floating elements cover each other
**Fix**: Assign different z-index values

```scss
// ✅ Clear hierarchy
.preview {
  z-index: 150; // Lower priority
}

.notification {
  z-index: 200; // Higher priority - always visible
}
```

---

## ✅ **Before & After: Settings Dialog**

### **Before (Bug)**
```scss
.dialog {
  position: fixed;
  // No z-index ❌
}
```

**Result**: Dialog appears behind header
```
┌─────────────────────────────────────┐
│  Header (z-index: 100)              │  ← On top
├─────────────────────────────────────┤
│                                     │
│  ┌───────────────────┐             │
│  │ Settings Dialog   │  ← Hidden!  │
│  │ (no z-index)      │             │
└──┴───────────────────┴─────────────┘
```

### **After (Fixed)**
```scss
.dialog {
  position: fixed;
  z-index: 250; // ✅ Higher than header
}
```

**Result**: Dialog appears on top
```
┌─────────────────────────────────────┐
│  Settings Dialog (z-index: 250)     │  ← On top!
│  ┌─────────────────────────────┐   │
│  │  [Settings content visible] │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  Header (z-index: 100)              │  ← Behind modal
└─────────────────────────────────────┘
```

---

## 📏 **Adding New Components**

### **Step 1: Determine Layer**
Ask:
1. Is it a modal/dialog? → Use 250+
2. Is it a notification? → Use 200-249
3. Is it a floating panel? → Use 150-199
4. Is it persistent UI? → Use 100-149
5. Is it a header control? → Use 50-99
6. Is it a base element? → Use 1-49

### **Step 2: Check Conflicts**
```bash
# Search for existing z-index values
grep -r "z-index" src/
```

### **Step 3: Assign Value**
```scss
.my-new-component {
  position: fixed; // or absolute
  z-index: [appropriate value];
}
```

### **Step 4: Document**
Add to this file and test layering with other components.

---

## 🧪 **Testing Layering**

### **Manual Test Checklist**

Test all component combinations:

- [ ] Open settings dialog
  - [ ] Appears above header ✅
  - [ ] Appears above camera preview ✅
  - [ ] Appears above confirmations ✅
  
- [ ] Activate camera preview
  - [ ] Appears above main content ✅
  - [ ] Appears above header ✅
  - [ ] Below confirmations ✅
  
- [ ] Show confirmation message
  - [ ] Appears above camera preview ✅
  - [ ] Appears above header ✅
  - [ ] Below settings dialog ✅
  
- [ ] Speech indicator active
  - [ ] Appears above main content ✅
  - [ ] At header level ✅
  - [ ] Below modals ✅

---

## 📚 **Reference Table**

| Component | File | Z-Index | When Visible |
|-----------|------|---------|--------------|
| Mic volume effect | control-tray.scss | -1 | Always (when active) |
| Mic button | control-tray.scss | 1 | Always |
| Theme toggle | theme-toggle.scss | 50 | Always |
| Dev mode hint | header.scss | 99 | When developer mode toggled |
| Header | header.scss | 100 | Always |
| Speech indicator | speech-indicator.scss | 100 | When listening |
| Camera preview | camera-preview.scss | 150 | When camera/screen active |
| Action confirmation | action-confirmation.scss | 200 | After actions (3s) |
| Settings dialog | settings-dialog.scss | 250 | When settings opened |

---

## 🎯 **Summary**

### **Z-Index Ranges**
- **1-49**: Base elements and effects
- **50-99**: Header controls  
- **100-149**: Navigation and persistent UI
- **150-199**: Floating panels
- **200-249**: Notifications
- **250+**: Modals

### **Key Rule**
Higher z-index = Higher priority = Appears on top

### **Fixed Issue**
Settings dialog now has `z-index: 250`, ensuring it appears above the header (z-index: 100) and all other components.

---

**Created by**: Professor Marquez  
**Date**: October 16, 2025  
**Purpose**: Maintain consistent UI layering  
**Last Updated**: Settings dialog z-index fix

