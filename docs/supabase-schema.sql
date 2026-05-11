-- TripFund Database Schema
-- Supabase PostgreSQL + Row Level Security

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS TABLE
-- ============================================
-- Note: Supabase Auth handles authentication
-- This extends the auth.users table with profile data

CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  date_of_birth DATE NOT NULL,
  phone_number TEXT,
  avatar_url TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  kyc_status TEXT DEFAULT 'pending', -- pending, approved, rejected
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- ============================================
-- POOLS TABLE
-- ============================================

CREATE TYPE pool_type AS ENUM ('travel', 'personal', 'wedding', 'car', 'house', 'other');
CREATE TYPE pool_status AS ENUM ('active', 'completed', 'cancelled');

CREATE TABLE public.pools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  goal_amount NUMERIC(10, 2) NOT NULL CHECK (goal_amount > 0),
  current_amount NUMERIC(10, 2) DEFAULT 0 CHECK (current_amount >= 0),
  target_date DATE,
  cover_image_url TEXT,
  pool_type pool_type NOT NULL DEFAULT 'personal',
  status pool_status DEFAULT 'active',
  created_by UUID REFERENCES public.profiles(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_pools_created_by ON public.pools(created_by);
CREATE INDEX idx_pools_status ON public.pools(status);

-- RLS Policies for pools
ALTER TABLE public.pools ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Pool members can view pools"
  ON public.pools FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.pool_members
      WHERE pool_members.pool_id = pools.id
        AND pool_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create pools"
  ON public.pools FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Pool owners can update pools"
  ON public.pools FOR UPDATE
  USING (created_by = auth.uid());

-- ============================================
-- POOL MEMBERS TABLE
-- ============================================

CREATE TYPE member_role AS ENUM ('owner', 'admin', 'member');

CREATE TABLE public.pool_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pool_id UUID REFERENCES public.pools(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  role member_role DEFAULT 'member',
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(pool_id, user_id)
);

-- Indexes
CREATE INDEX idx_pool_members_pool ON public.pool_members(pool_id);
CREATE INDEX idx_pool_members_user ON public.pool_members(user_id);

-- RLS Policies
ALTER TABLE public.pool_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Pool members can view members"
  ON public.pool_members FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.pool_members pm
      WHERE pm.pool_id = pool_members.pool_id
        AND pm.user_id = auth.uid()
    )
  );

CREATE POLICY "Pool owners can add members"
  ON public.pool_members FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.pool_members
      WHERE pool_members.pool_id = pool_id
        AND pool_members.user_id = auth.uid()
        AND pool_members.role IN ('owner', 'admin')
    )
  );

-- ============================================
-- CONTRIBUTIONS TABLE
-- ============================================

CREATE TYPE contribution_status AS ENUM ('pending', 'completed', 'failed', 'refunded');

CREATE TABLE public.contributions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pool_id UUID REFERENCES public.pools(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  amount NUMERIC(10, 2) NOT NULL CHECK (amount > 0),
  payment_method_id TEXT,
  stripe_payment_intent_id TEXT,
  status contribution_status DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Indexes
CREATE INDEX idx_contributions_pool ON public.contributions(pool_id);
CREATE INDEX idx_contributions_user ON public.contributions(user_id);
CREATE INDEX idx_contributions_status ON public.contributions(status);

-- RLS Policies
ALTER TABLE public.contributions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Pool members can view contributions"
  ON public.contributions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.pool_members
      WHERE pool_members.pool_id = contributions.pool_id
        AND pool_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create contributions"
  ON public.contributions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- WITHDRAWAL REQUESTS TABLE
-- ============================================

CREATE TYPE withdrawal_status AS ENUM ('pending', 'approved', 'rejected', 'completed');

CREATE TABLE public.withdrawal_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pool_id UUID REFERENCES public.pools(id) ON DELETE CASCADE NOT NULL,
  requested_by UUID REFERENCES public.profiles(id) NOT NULL,
  amount NUMERIC(10, 2) NOT NULL CHECK (amount > 0),
  reason TEXT,
  status withdrawal_status DEFAULT 'pending',
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_withdrawal_requests_pool ON public.withdrawal_requests(pool_id);
CREATE INDEX idx_withdrawal_requests_status ON public.withdrawal_requests(status);

-- RLS Policies
ALTER TABLE public.withdrawal_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Pool members can view withdrawal requests"
  ON public.withdrawal_requests FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.pool_members
      WHERE pool_members.pool_id = withdrawal_requests.pool_id
        AND pool_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Pool members can create withdrawal requests"
  ON public.withdrawal_requests FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.pool_members
      WHERE pool_members.pool_id = pool_id
        AND pool_members.user_id = auth.uid()
    )
  );

-- ============================================
-- APPROVALS TABLE
-- ============================================

CREATE TABLE public.approvals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  withdrawal_request_id UUID REFERENCES public.withdrawal_requests(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  approved BOOLEAN NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(withdrawal_request_id, user_id)
);

-- Indexes
CREATE INDEX idx_approvals_withdrawal ON public.approvals(withdrawal_request_id);

-- RLS Policies
ALTER TABLE public.approvals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Pool members can view approvals"
  ON public.approvals FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.withdrawal_requests wr
      JOIN public.pool_members pm ON pm.pool_id = wr.pool_id
      WHERE wr.id = approvals.withdrawal_request_id
        AND pm.user_id = auth.uid()
    )
  );

CREATE POLICY "Pool members can approve/reject"
  ON public.approvals FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.withdrawal_requests wr
      JOIN public.pool_members pm ON pm.pool_id = wr.pool_id
      WHERE wr.id = withdrawal_request_id
        AND pm.user_id = auth.uid()
    )
  );

-- ============================================
-- MESSAGES TABLE (Group Chat)
-- ============================================

CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pool_id UUID REFERENCES public.pools(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_messages_pool ON public.messages(pool_id);
CREATE INDEX idx_messages_created_at ON public.messages(created_at DESC);

-- RLS Policies
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Pool members can view messages"
  ON public.messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.pool_members
      WHERE pool_members.pool_id = messages.pool_id
        AND pool_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Pool members can send messages"
  ON public.messages FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.pool_members
      WHERE pool_members.pool_id = pool_id
        AND pool_members.user_id = auth.uid()
    )
  );

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER pools_updated_at
  BEFORE UPDATE ON public.pools
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Function to update pool current_amount on contribution
CREATE OR REPLACE FUNCTION update_pool_amount()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND (OLD IS NULL OR OLD.status != 'completed') THEN
    UPDATE public.pools
    SET current_amount = current_amount + NEW.amount
    WHERE id = NEW.pool_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER contribution_completed
  AFTER INSERT OR UPDATE ON public.contributions
  FOR EACH ROW EXECUTE FUNCTION update_pool_amount();

-- ============================================
-- REALTIME PUBLICATION
-- ============================================

-- Enable realtime for specific tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.contributions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.withdrawal_requests;
ALTER PUBLICATION supabase_realtime ADD TABLE public.approvals;

-- ============================================
-- SEED DATA (Optional - for testing)
-- ============================================

-- Insert test user (requires manual auth.users entry first)
-- INSERT INTO public.profiles (id, email, full_name, username, date_of_birth)
-- VALUES (
--   'your-auth-user-uuid',
--   'test@tripfund.com',
--   'Test User',
--   'testuser',
--   '1995-01-01'
-- );
