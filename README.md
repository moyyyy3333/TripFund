# TripFund — Group Savings Platform

**Premium mobile + web application for collaborative savings, travel planning, and group money management.**

---

## 🎯 Product Vision

TripFund combines the simplicity of Cash App, the social engagement of Snapchat, and the visual beauty of Airbnb into a modern group savings platform. Users create shared "Savings Pools" with friends and family, contribute over time, and unlock funds through unanimous approval for travel, milestones, or personal goals.

### Target Audience
- Ages 14+ (with 18+ member requirement per pool for compliance)
- Friend groups planning travel
- Couples saving for milestones
- Families pooling funds
- Personal savers seeking structure

---

## 🚀 Current Status: MVP Foundation (Phase 1)

### ✅ Implemented Features

#### Design System
- **Premium dark theme** with vibrant travel accents (teal, coral, sunset gradients)
- **Smooth animations** and micro-interactions
- **Responsive layouts** optimized for mobile-first experience
- **Consistent typography** and spacing system

#### Core Screens
1. **Onboarding Flow**
   - Beautiful gradient-based intro screens
   - Age gate (14+ requirement)
   - Swipeable carousel with progress dots

2. **Authentication**
   - Age verification
   - Email/password signup & login
   - Gradient-enhanced UI with premium feel
   - Ready for Supabase integration

3. **Dashboard/Home**
   - Total savings overview card
   - Active pools with progress tracking
   - Quick actions (Create Pool, Send Money, Analytics, Explore)
   - Recent activity feed
   - Beautiful travel imagery for travel pools

4. **Pools List**
   - Search and filter (All/Travel/Personal)
   - Rich pool cards with images and progress
   - Real-time progress bars
   - Days-remaining countdown

5. **Cards (Preview)**
   - Virtual card display
   - Card controls (freeze, settings)
   - Physical card teaser

6. **Profile**
   - User stats (pools, savings, friends)
   - Account settings menu
   - Premium upgrade CTA
   - Sign out option

#### Architecture
- **React Native** with Expo (cross-platform iOS + Android)
- **Expo Router** for file-based navigation
- **TypeScript** for type safety
- **Linear Gradient** support
- **Modular design system** (`theme.ts`)

---

## 📋 Next Steps (Phase 2 & Beyond)

### Immediate Priorities

#### Backend Integration
- [ ] **Supabase setup**
  - Authentication (email/password, social logins)
  - Database schema (users, pools, contributions, transactions)
  - Real-time subscriptions for live updates
  - Row-level security policies

- [ ] **Payment Integration**
  - Stripe Connect onboarding
  - ACH/bank account linking
  - Contribution processing
  - Payout workflows

#### Enhanced Flows
- [ ] **Pool Creation**
  - Goal setting (amount, date, description)
  - Cover image selection/upload
  - Member invitations (link, email, phone)
  - Pool type selection (travel, personal, wedding, etc.)

- [ ] **Pool Detail Screen**
  - Full contribution history
  - Member list with individual progress
  - Group chat integration
  - Approval workflow UI
  - Withdrawal requests

- [ ] **Contributions**
  - One-time contribution flow
  - Recurring contribution setup
  - Payment method selection
  - Confirmation animations

#### Social Features
- [ ] **Group Chat**
  - Text messages
  - Photo sharing
  - Reactions
  - Typing indicators
  - Read receipts

- [ ] **Activity Feed**
  - Contribution notifications
  - Milestone celebrations
  - Approval requests
  - Member joins

#### Card Management
- [ ] **Virtual Card Creation**
  - Per-pool or personal cards
  - Instant card generation
  - Apple/Google Pay integration

- [ ] **Physical Cards** (Premium)
  - Order flow
  - Address verification
  - Shipping tracking
  - Card activation

- [ ] **Card Controls**
  - Freeze/unfreeze
  - Spending limits
  - Merchant blocking
  - Transaction alerts

#### Travel Features
- [ ] **Trip Planning**
  - Itinerary builder
  - Destination voting
  - Collaborative mood boards
  - Booking links

- [ ] **Discovery Feed**
  - Travel inspiration
  - Curated destinations
  - AI-powered suggestions
  - Personalized recommendations

### Compliance & Security

#### Age Verification
- [ ] Identity verification service (Onfido, Jumio, etc.)
- [ ] COPPA compliance for 14-18 users
- [ ] Parental consent workflows

#### Financial Compliance
- [ ] KYC (Know Your Customer) integration
- [ ] AML (Anti-Money Laundering) checks
- [ ] Banking partner agreements
- [ ] Regulatory compliance review

#### Security
- [ ] Biometric authentication (Face ID, Touch ID)
- [ ] PIN protection
- [ ] Two-factor authentication
- [ ] Fraud detection
- [ ] End-to-end encryption for chat

### Monetization

#### Revenue Streams
- [ ] **Freemium Model**
  - Free: Basic pools, virtual cards, limited members
  - Premium: Physical cards, unlimited members, advanced analytics, custom themes

- [ ] **Transaction Fees**
  - Small fee on contributions (1-2%)
  - Instant transfer fees

- [ ] **Travel Partnerships**
  - Affiliate commissions on bookings
  - Exclusive deals for TripFund users

---

## 🛠 Tech Stack

### Mobile App
- **Framework:** React Native (Expo)
- **Language:** TypeScript
- **Navigation:** Expo Router
- **UI:** React Native core + Linear Gradient
- **State:** React Context/Hooks (migrate to Zustand/Redux if needed)

### Web App (Planned)
- **Framework:** Next.js 14+
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shared theme
- **Deployment:** Vercel

### Backend
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Real-time:** Supabase Realtime
- **Storage:** Supabase Storage (images, documents)

### Payments
- **Processor:** Stripe Connect
- **ACH:** Stripe ACH/Bank Transfers
- **Cards:** Stripe Issuing

### Additional Services
- **Push Notifications:** Expo Push Notifications
- **Analytics:** PostHog or Mixpanel
- **Monitoring:** Sentry
- **CDN:** Cloudflare

---

## 💻 Development Setup

### Prerequisites
- Node.js 18+
- Expo CLI
- iOS Simulator (Mac) or Android Emulator
- Git

### Installation

```bash
# Clone the repository
cd TripFund/mobile

# Install dependencies
npm install

# Start the development server
npm start
```

### Running the App

```bash
# iOS Simulator
npm run ios

# Android Emulator
npm run android

# Web (for quick testing)
npm run web
```

### Environment Variables

Create `.env` in the mobile directory:

```env
# Supabase (when ready)
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key

# Stripe (when ready)
STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

---

## 📊 Database Schema (Planned)

### Users
```sql
- id (uuid, primary key)
- email (text, unique)
- full_name (text)
- username (text, unique)
- date_of_birth (date)
- phone_number (text)
- avatar_url (text)
- created_at (timestamp)
- updated_at (timestamp)
```

### Pools
```sql
- id (uuid, primary key)
- title (text)
- description (text)
- goal_amount (numeric)
- current_amount (numeric)
- target_date (date)
- cover_image_url (text)
- pool_type (enum: travel, personal, wedding, etc.)
- created_by (uuid, fk to users)
- created_at (timestamp)
- updated_at (timestamp)
```

### Pool Members
```sql
- id (uuid, primary key)
- pool_id (uuid, fk to pools)
- user_id (uuid, fk to users)
- role (enum: owner, admin, member)
- joined_at (timestamp)
```

### Contributions
```sql
- id (uuid, primary key)
- pool_id (uuid, fk to pools)
- user_id (uuid, fk to users)
- amount (numeric)
- payment_method_id (text)
- status (enum: pending, completed, failed)
- created_at (timestamp)
```

### Withdrawal Requests
```sql
- id (uuid, primary key)
- pool_id (uuid, fk to pools)
- requested_by (uuid, fk to users)
- amount (numeric)
- reason (text)
- status (enum: pending, approved, rejected)
- created_at (timestamp)
```

### Approvals
```sql
- id (uuid, primary key)
- withdrawal_request_id (uuid, fk to withdrawal_requests)
- user_id (uuid, fk to users)
- approved (boolean)
- created_at (timestamp)
```

---

## 🎨 Design Principles

### Visual Identity
- **Dark Mode First:** Deep blacks with vibrant accents
- **Travel Focus:** Rich imagery, sunset gradients, wanderlust vibes
- **Premium Feel:** High-end startup aesthetic
- **Joyful:** Celebrate milestones, motivate users

### UX Guidelines
- **Onboarding:** Under 2 minutes from download to first pool
- **Clarity:** Every screen has one primary action
- **Trust:** Emphasize security, transparency, group consensus
- **Delight:** Animations on contributions, goal achievements

---

## 📱 App Store Preparation

### iOS App Store
- [ ] App icon (1024x1024)
- [ ] Screenshots (6.5", 5.5" displays)
- [ ] App preview video
- [ ] Privacy policy URL
- [ ] Terms of service URL
- [ ] Support URL
- [ ] Age rating justification
- [ ] In-app purchase descriptions

### Google Play Store
- [ ] High-res icon (512x512)
- [ ] Feature graphic (1024x500)
- [ ] Screenshots (phone + tablet)
- [ ] Promotional video
- [ ] Privacy policy URL
- [ ] Content rating questionnaire

---

## 🤝 Contributing

### Code Style
- Use TypeScript strict mode
- Follow ESLint + Prettier configs
- Write meaningful commit messages
- Test on both iOS and Android

### Pull Request Process
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit PR with description

---

## 📄 License

**Proprietary** — All rights reserved. This project is not open source.

---

## 📞 Contact

**Project Lead:** Mark Opdenhoff  
**Email:** rhombus_raving.0p@icloud.com  
**Development Partner:** OpenClaw/Claude

---

## 🎯 Success Metrics (Future)

### User Engagement
- Daily active users (DAU)
- Pool creation rate
- Contribution frequency
- Goal completion rate

### Financial
- Total GMV (Gross Merchandise Value)
- Average pool size
- Premium conversion rate
- Transaction volume

### Retention
- 7-day retention
- 30-day retention
- Churn rate

---

## 🚀 Roadmap Timeline

### Q2 2026 (Current)
- ✅ MVP foundation (design system, core screens)
- 🔄 Backend integration (Supabase)
- 🔄 Pool creation + detail flows

### Q3 2026
- Payment integration (Stripe)
- Virtual cards MVP
- Group chat
- TestFlight beta

### Q4 2026
- App Store launch (iOS)
- Google Play launch (Android)
- Physical cards (premium)
- Travel planning features

### Q1 2027+
- Web app launch
- Discovery feed
- AI-powered suggestions
- Partnership integrations

---

**Built with 🦞 by Claw + Mark**
