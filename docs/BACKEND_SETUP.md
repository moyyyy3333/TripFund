# TripFund Backend Setup Guide

**Complete guide to connecting your TripFund app to Supabase.**

---

## Prerequisites

- ✅ TripFund mobile app code (complete)
- ✅ Supabase account (free tier works)
- ✅ 20 minutes of your time

---

## Step 1: Create Supabase Project (5 minutes)

### 1.1 Sign Up / Log In

1. Go to https://supabase.com
2. Click **"Start your project"**
3. Sign in with GitHub (recommended) or email

### 1.2 Create New Project

1. Click **"New project"**
2. Choose your organization (or create new)
3. Fill in project details:
   - **Name:** TripFund
   - **Database Password:** Generate a strong password (SAVE THIS!)
   - **Region:** Choose closest to your users
   - **Pricing Plan:** Free (sufficient for development)
4. Click **"Create new project"**
5. Wait 2-3 minutes for project to initialize

---

## Step 2: Set Up Database Schema (3 minutes)

### 2.1 Open SQL Editor

1. In your Supabase project dashboard
2. Click **"SQL Editor"** in the left sidebar
3. Click **"New query"**

### 2.2 Run Schema SQL

1. Open `TripFund/docs/supabase-schema.sql` on your computer
2. Copy the ENTIRE contents
3. Paste into the Supabase SQL Editor
4. Click **"Run"** (bottom right)
5. Wait for "Success" message (should see green checkmark)

**What this does:**
- Creates all database tables (profiles, pools, contributions, etc.)
- Sets up Row Level Security (RLS) policies
- Creates indexes for performance
- Enables real-time subscriptions
- Adds triggers for automatic updates

---

## Step 3: Get API Credentials (2 minutes)

### 3.1 Find Your Credentials

1. In Supabase dashboard, click **"Settings"** (bottom left)
2. Click **"API"** in settings menu
3. You'll see two important values:

**Project URL:**
```
https://xxxxxxxxxxxx.supabase.co
```

**Anon/Public Key** (long string starting with `eyJ...`):
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3.2 Keep These Safe

- ✅ **DO** use the anon/public key in your app (it's safe)
- ❌ **DON'T** share your service role key (keep that secret!)

---

## Step 4: Configure Your App (3 minutes)

### 4.1 Create Environment File

In your terminal:

```bash
cd TripFund/mobile
cp .env.example .env
```

### 4.2 Add Your Credentials

Open `TripFund/mobile/.env` and replace the placeholder values:

```env
EXPO_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-ID.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=YOUR-ANON-KEY-HERE
```

**Example:**
```env
EXPO_PUBLIC_SUPABASE_URL=https://xyzabc123.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5emFiYzEyMyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjc4MzAwMDAwLCJleHAiOjE5OTM4NzYwMDB9.ABCD1234567890
```

### 4.3 Install Dependencies (if not already done)

```bash
npm install
```

---

## Step 5: Enable Email Authentication (2 minutes)

### 5.1 Configure Email Settings

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Make sure **Email** is enabled (it is by default)
3. Optional: Configure **Email Templates** for branded emails

### 5.2 Email Confirmation Settings

For development, you can disable email confirmation:

1. Go to **Authentication** → **Settings**
2. Find **"Enable email confirmations"**
3. Toggle **OFF** for easier testing
4. ⚠️ **Turn back ON** before production launch!

---

## Step 6: Test Your Connection (5 minutes)

### 6.1 Start the App

```bash
npm start
```

Scan QR code with Expo Go or run in simulator.

### 6.2 Test Signup

1. Go through onboarding
2. Enter age (14+)
3. Create account with email/password
4. If successful, you'll see the dashboard

### 6.3 Verify in Supabase

1. Go to **Authentication** → **Users** in Supabase
2. You should see your new user!
3. Go to **Table Editor** → **profiles**
4. Your profile should be there

### 6.4 Test Sign Out / Sign In

1. Go to Profile tab
2. Tap **"Sign Out"**
3. Log back in with same credentials
4. Should work!

---

## Troubleshooting

### "Missing Supabase environment variables"

- ✅ Make sure `.env` file exists in `mobile/` folder
- ✅ Check that variable names start with `EXPO_PUBLIC_`
- ✅ Restart Metro bundler: `npm start -- --clear`

### "Failed to fetch"

- ✅ Check your internet connection
- ✅ Verify Supabase URL is correct (no typos)
- ✅ Make sure Supabase project is active (not paused)

### "Invalid API key"

- ✅ Double-check you copied the **anon key**, not service role key
- ✅ Make sure there are no extra spaces in `.env` file
- ✅ Key should start with `eyJ...`

### "Row Level Security policy violation"

- ✅ Make sure you ran the full SQL schema
- ✅ Check that RLS policies were created
- ✅ Try signing out and back in

### Sign up works but profile not created

- ✅ Check Supabase logs: **Logs** → **Postgres Logs**
- ✅ Verify the `profiles` table trigger exists
- ✅ Make sure RLS policies allow INSERT for auth users

---

## What's Working Now

After completing this setup:

✅ **Authentication**
- Real email/password signup
- Secure login
- Session persistence
- Sign out

✅ **Database**
- User profiles stored in Supabase
- Ready for pools, contributions, messages
- Row Level Security protecting data
- Real-time subscriptions enabled

✅ **Dashboard**
- Shows real user name
- Empty state when no pools
- Ready to fetch real pool data

---

## Next Steps

Now that backend is connected, you can:

### Immediate (Today)

1. **Create test data:**
   ```sql
   -- In Supabase SQL Editor, create a test pool
   INSERT INTO pools (title, description, goal_amount, pool_type, created_by)
   VALUES (
     'Tokyo Adventure',
     'Summer trip to Japan!',
     15000,
     'travel',
     'YOUR-USER-ID-HERE'
   );
   
   -- Add yourself as a member
   INSERT INTO pool_members (pool_id, user_id, role)
   VALUES (
     'POOL-ID-FROM-ABOVE',
     'YOUR-USER-ID-HERE',
     'owner'
   );
   ```

2. **Refresh app** — pool should appear on dashboard!

### This Week

1. **Build pool creation flow** (let users create pools in-app)
2. **Add contribution flow** (mock payment for now)
3. **Build pool detail screen** (show members, history)

### Next Week

1. **Add group chat** (real-time messaging)
2. **Integrate Stripe** (real payments)
3. **Build approval workflow** (withdrawal requests)

---

## Production Checklist

Before launching to real users:

- [ ] Turn ON email confirmation in Supabase
- [ ] Set up custom email templates (branded)
- [ ] Add password reset flow
- [ ] Enable 2FA for admin accounts
- [ ] Set up database backups
- [ ] Configure rate limiting
- [ ] Add monitoring/alerts
- [ ] Review RLS policies
- [ ] Test on multiple devices
- [ ] Load test with realistic data

---

## Cost Estimates

### Supabase Free Tier Includes:
- 500MB database
- 1GB file storage
- 2GB bandwidth
- 50,000 monthly active users
- Unlimited API requests

**This is MORE than enough for:**
- Development & testing
- First 1,000+ users
- MVP launch

### When to Upgrade ($25/month):
- 8GB database
- 100GB file storage
- 250GB bandwidth
- Daily backups
- Email support

---

## Support

### Supabase Issues
- **Docs:** https://supabase.com/docs
- **Discord:** https://discord.supabase.com
- **GitHub:** https://github.com/supabase/supabase

### TripFund Code Issues
- Check `README.md` for architecture docs
- Review `mobile/lib/supabase.ts` for types
- Check `mobile/contexts/AuthContext.tsx` for auth logic

---

**🎉 Congrats! Your app is now connected to a real backend!**

Next: Build pool creation → `docs/POOL_CREATION.md` (coming soon)
