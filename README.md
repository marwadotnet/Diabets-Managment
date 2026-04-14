# DiabetesCare Website - Vanilla HTML/CSS/JavaScript

A comprehensive diabetes management website built with pure HTML, CSS, and JavaScript.

## Files Included

1. **index.html** - Home page with hero section and features
2. **login.html** - Login page (demo mode - accepts any credentials)
3. **dashboard.html** - Main dashboard with all diabetes management features
4. **styles.css** - Complete styling for all pages
5. **script.js** - All JavaScript functionality

## Features

### Home Page (index.html)
- Full-screen hero section with healthcare imagery
- Features overview
- Call-to-action sections
- Responsive design

### Login Page (login.html)
- Simple login form
- Demo mode - enter any email and password to access dashboard
- Uses localStorage for session management

### Dashboard (dashboard.html)
The dashboard includes 4 main sections:

#### 1. Blood Sugar Monitor
- Input field for blood glucose levels (mg/dL)
- Real-time analysis with color-coded warnings:
  - **Low** (below 70 mg/dL) - Yellow warning with immediate actions
  - **Normal** (70-180 mg/dL) - Green confirmation
  - **High** (above 180 mg/dL) - Red warning with recommended actions
- Reference guide for blood sugar ranges

#### 2. Healthy Habits
- Personalized recommendations based on diabetes type
- Type 1 specific: Insulin management tips
- Type 2 specific: Weight management guidance
- Common habits: Diet, exercise, hydration, sleep, monitoring

#### 3. Side Effects
- Immediate effects (hypoglycemia, hyperglycemia)
- Long-term complications with warning signs and prevention tips:
  - Cardiovascular disease
  - Eye damage (retinopathy)
  - Nerve damage (neuropathy)
  - Kidney damage (nephropathy)
  - Cognitive changes

#### 4. Learn More
- Detailed information about selected diabetes type
- Causes and risk factors
- Common symptoms
- Treatment approaches
- Prevalence statistics
- Comparison with the other diabetes type

## How to Use

1. **Copy all files** to a folder on your computer
2. **Open index.html** in your web browser
3. **Click "Get Started"** or "Start Monitoring" to go to the login page
4. **Enter any email and password** (demo mode)
5. **Select your diabetes type** (Type 1 or Type 2)
6. **Use the dashboard** to:
   - Monitor blood sugar levels
   - Learn about healthy habits
   - Understand side effects
   - Read detailed diabetes information

## File Structure

```
vanilla-website/
├── index.html          # Home page
├── login.html          # Login page
├── dashboard.html      # Dashboard with all features
├── styles.css          # All CSS styling
├── script.js           # All JavaScript
└── README.md           # This file
```

## Browser Compatibility

Works in all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## Local Storage

The website uses localStorage to save:
- Login status (`isLoggedIn`)
- Selected diabetes type (`diabetesType`)

To reset, clear your browser's localStorage or click "Sign Out".

## Customization

### Change Colors
Edit the CSS variables and color values in `styles.css`:
- Blue: `#2563eb` (primary buttons, active states)
- Green: `#22c55e` (normal blood sugar)
- Yellow/Amber: `#f59e0b` (low blood sugar warnings)
- Red: `#ef4444` (high blood sugar warnings)

### Change Blood Sugar Ranges
Edit the `analyzeBloodSugar()` function in `script.js`:
```javascript
if (numValue < 70) {
    status = 'low';
} else if (numValue >= 70 && numValue <= 180) {
    status = 'normal';
} else {
    status = 'high';
}
```

### Add More Content
Add new habits, complications, or information by editing the arrays in `script.js`:
- `renderHealthyHabits()` - Add more habit objects
- `renderComplications()` - Add more complications
- `renderDiabetesInfo()` - Modify diabetes information

## Notes

- This is a demo/educational application
- Not intended for real medical use or storing sensitive health data
- Always consult healthcare professionals for medical advice
- No backend or database - all data is stored locally in the browser

## Responsive Design

The website is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

Breakpoint: 768px for mobile/tablet adjustments

---

**Important:** This website is for demonstration and educational purposes only. It should not be used as a replacement for professional medical advice, diagnosis, or treatment.
