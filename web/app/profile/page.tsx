'use client';

import Link from 'next/link';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-surface/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✈️</span>
              <span className="font-bold text-xl">TripFund</span>
            </div>
            <div className="flex gap-6">
              <Link href="/TripFund/dashboard" className="text-textSecondary hover:text-primary transition-colors">Dashboard</Link>
              <Link href="/TripFund/pools" className="text-textSecondary hover:text-primary transition-colors">Pools</Link>
              <Link href="/TripFund/profile" className="text-primary font-semibold">Profile</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent mb-4">
            <span className="text-4xl font-bold">M</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Mark Opdenhoff</h1>
          <div className="text-textSecondary">@markopdenhoff</div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          <div className="bg-surface border border-border rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold mb-2">3</div>
            <div className="text-sm text-textSecondary">Active Pools</div>
          </div>
          <div className="bg-surface border border-border rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold mb-2">$12.4K</div>
            <div className="text-sm text-textSecondary">Total Saved</div>
          </div>
          <div className="bg-surface border border-border rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold mb-2">✓</div>
            <div className="text-sm text-textSecondary">Verified</div>
          </div>
        </div>

        {/* Menu Sections */}
        <div className="space-y-6">
          <div>
            <h2 className="text-sm font-semibold text-textSecondary uppercase tracking-wider mb-3 px-4">Account</h2>
            <div className="bg-surface border border-border rounded-2xl overflow-hidden">
              {[
                { icon: '👤', label: 'Personal Information' },
                { icon: '🔐', label: 'Security & Privacy' },
                { icon: '💳', label: 'Payment Methods' },
              ].map((item, i) => (
                <button
                  key={i}
                  className="w-full flex items-center gap-4 px-6 py-4 hover:bg-surfaceElevated transition-colors border-b border-border last:border-0"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="flex-1 text-left font-medium">{item.label}</span>
                  <span className="text-textTertiary text-xl">›</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-textSecondary uppercase tracking-wider mb-3 px-4">Preferences</h2>
            <div className="bg-surface border border-border rounded-2xl overflow-hidden">
              {[
                { icon: '🔔', label: 'Notifications' },
                { icon: '🎨', label: 'Appearance' },
                { icon: '🌐', label: 'Language & Region' },
              ].map((item, i) => (
                <button
                  key={i}
                  className="w-full flex items-center gap-4 px-6 py-4 hover:bg-surfaceElevated transition-colors border-b border-border last:border-0"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="flex-1 text-left font-medium">{item.label}</span>
                  <span className="text-textTertiary text-xl">›</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-textSecondary uppercase tracking-wider mb-3 px-4">Support</h2>
            <div className="bg-surface border border-border rounded-2xl overflow-hidden">
              {[
                { icon: '❓', label: 'Help Center' },
                { icon: '📧', label: 'Contact Us' },
                { icon: '⭐', label: 'Rate TripFund' },
              ].map((item, i) => (
                <button
                  key={i}
                  className="w-full flex items-center gap-4 px-6 py-4 hover:bg-surfaceElevated transition-colors border-b border-border last:border-0"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="flex-1 text-left font-medium">{item.label}</span>
                  <span className="text-textTertiary text-xl">›</span>
                </button>
              ))}
            </div>
          </div>

          {/* Premium Card */}
          <div className="bg-gradient-to-br from-[#ffd700]/20 to-[#ffa726]/20 border border-[#ffd700]/30 rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">👑</div>
            <h3 className="text-2xl font-bold mb-3">Upgrade to Premium</h3>
            <p className="text-textSecondary mb-6">
              Get physical cards, advanced analytics, and exclusive features
            </p>
            <button className="px-8 py-3 bg-white text-black font-semibold rounded-xl hover:opacity-90 transition-opacity">
              Learn More
            </button>
          </div>

          {/* Sign Out */}
          <button className="w-full py-4 border border-error text-error rounded-xl font-semibold hover:bg-error/10 transition-colors">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
