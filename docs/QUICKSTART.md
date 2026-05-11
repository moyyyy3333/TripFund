# TripFund Quick Start Guide

## Get Running in 5 Minutes

### Step 1: Install Dependencies

```bash
cd TripFund/mobile
npm install
```

### Step 2: Start Development Server

```bash
npm start
```

This opens Expo Dev Tools in your browser.

### Step 3: Run on Device/Simulator

**Option A: Physical Device (Recommended)**
1. Install **Expo Go** app on your iPhone or Android
2. Scan the QR code from Expo Dev Tools
3. App loads instantly

**Option B: iOS Simulator (Mac only)**
```bash
npm run ios
```

**Option C: Android Emulator**
```bash
npm run android
```

### Step 4: Explore the App

The app starts with the onboarding flow. Navigate through:
1. **Onboarding** → Swipe through intro screens
2. **Age Gate** → Enter age (14+)
3. **Sign Up** → Create mock account (backend not connected yet)
4. **Dashboard** → Explore mock pools and UI

---

## Current Features (Phase 1 MVP)

✅ **Complete & Working:**
- Onboarding with age gate
- Authentication UI (mock login/signup)
- Dashboard with total savings and pool overview
- Pools list with search/filter
- Cards preview
- Profile with settings menu
- Premium dark theme with gradients
- Smooth animations

⚠️ **Not Yet Connected:**
- Backend (Supabase setup needed)
- Real authentication
- Payment processing
- Real-time updates
- Chat functionality

---

## Next: Connect Backend

See `docs/BACKEND_SETUP.md` for Supabase integration guide.

---

## Troubleshooting

**"Cannot find module 'expo'"**
```bash
npm install
```

**Metro bundler stuck**
```bash
npm start -- --clear
```

**iOS build fails**
```bash
cd ios && pod install && cd ..
npm run ios
```

**Can't connect to dev server**
- Make sure phone and computer are on same Wi-Fi
- Try tunnel mode: `npm start -- --tunnel`

---

## File Structure

```
mobile/
├── app/              # Expo Router pages
│   ├── (tabs)/       # Tab navigation screens
│   ├── onboarding.tsx
│   ├── auth.tsx
│   ├── index.tsx     # Entry point
│   └── _layout.tsx   # Root layout
├── theme.ts          # Design system
├── app.json          # Expo config
├── package.json      # Dependencies
└── tsconfig.json     # TypeScript config
```

---

## Recommended Dev Tools

- **React Native Debugger** — Better debugging
- **Expo Dev Tools** — Built-in (auto-opens)
- **React DevTools** — Component inspection

---

## Testing on Real Devices

**iOS (TestFlight — later):**
1. Build with EAS: `eas build --platform ios`
2. Upload to TestFlight
3. Invite testers via email

**Android (Internal Testing — later):**
1. Build: `eas build --platform android`
2. Upload to Google Play Console
3. Add testers to internal track

---

**Need help?** Check the main README or docs folder.
