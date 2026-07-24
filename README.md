# BusinessSphere ERP v2.0

34-module ERP for Tanzania. React 18 + Vite + Supabase.

## ⚡ Quick Start

```bash
# 1. Enter the project folder (IMPORTANT — run from this folder)
cd businesssphere-erp

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
# Opens at http://localhost:5173
```

## 🚀 Deploy

### Netlify (easiest)
```bash
npm install
npm run build
# Drag the dist/ folder to netlify.com/drop
```

### Vercel
```bash
npm install -g vercel
npm run build
vercel --prod
```

### GitHub Pages / Any static host
```bash
npm run build
# Upload the dist/ folder contents
```

## 🔌 Connect Supabase
Edit `src/shared/supabase.js`:
```js
const SUPABASE_URL     = "https://YOUR-PROJECT.supabase.co";
const SUPABASE_ANON_KEY = "your-anon-key";
```

## 📁 Structure
```
src/
├── main.jsx              ← Entry point
├── App.jsx               ← Main shell (SmartManager)
├── shared/
│   ├── index.js          ← Barrel export (all shared)
│   ├── supabase.js       ← Supabase client + auth
│   ├── hooks.jsx         ← React hooks + mappers
│   ├── utils.jsx         ← Utilities + report tools
│   └── constants.jsx     ← Constants + UI components
└── modules/              ← 28 module files
    ├── Dashboard.jsx
    ├── CRM.jsx
    ├── Sales.jsx
    └── ... (25 more)
```

## ❗ Common Error

**"Failed to load /src/main.jsx"**
→ You are running `npm` from the wrong folder.
→ Make sure you `cd businesssphere-erp` first, then run `npm install`.

## 📋 Modules
Dashboard · CRM · Sales · Inventory · Procurement · Finance · HR ·
Manufacturing · Supply Chain · E-Commerce · Projects · Customer Support ·
Analytics · Notifications · Settings · AI Assistant · Marketing · POS ·
Workflows · Collaboration · Microfinance · VICOBA · Community Groups ·
Healthcare · School · Pharmacy · Hotel · Fleet · Banking/MFI · Restaurant ·
Employee Portal
