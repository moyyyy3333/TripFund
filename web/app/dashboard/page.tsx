'use client';

import Link from 'next/link';

const mockPools = [
  {
    id: '1',
    title: 'Tokyo Adventure',
    goal: 15000,
    current: 8450,
    members: 4,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
    type: 'travel',
  },
  {
    id: '2',
    title: 'Beach House Weekend',
    goal: 3000,
    current: 2750,
    members: 3,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    type: 'travel',
  },
  {
    id: '3',
    title: 'Emergency Fund',
    goal: 5000,
    current: 1200,
    members: 1,
    type: 'personal',
  },
];

export default function DashboardPage() {
  const totalSaved = mockPools.reduce((sum, pool) => sum + pool.current, 0);

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
              <Link href="/TripFund/dashboard" className="text-primary font-semibold">Dashboard</Link>
              <Link href="/TripFund/pools" className="text-textSecondary hover:text-primary transition-colors">Pools</Link>
              <Link href="/TripFund/profile" className="text-textSecondary hover:text-primary transition-colors">Profile</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Good morning 👋</h1>
          <p className="text-textSecondary">Here's your savings overview</p>
        </div>

        {/* Total Saved Card */}
        <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-8 mb-8 border border-primary/20">
          <div className="text-sm text-textSecondary mb-2">Total Saved</div>
          <div className="text-5xl font-bold mb-6">${totalSaved.toLocaleString()}</div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-2xl font-bold">{mockPools.length}</div>
              <div className="text-sm text-textSecondary">Active Pools</div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {Math.round((totalSaved / mockPools.reduce((sum, p) => sum + p.goal, 0)) * 100)}%
              </div>
              <div className="text-sm text-textSecondary">Overall Progress</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: '➕', label: 'Create Pool' },
            { icon: '💸', label: 'Send Money' },
            { icon: '📊', label: 'Analytics' },
            { icon: '🌍', label: 'Explore' },
          ].map((action, i) => (
            <button
              key={i}
              className="bg-surface border border-border rounded-xl p-4 hover:bg-surfaceElevated transition-colors text-center"
            >
              <div className="text-3xl mb-2">{action.icon}</div>
              <div className="text-sm font-semibold">{action.label}</div>
            </button>
          ))}
        </div>

        {/* Pools Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Pools</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockPools.map((pool) => {
              const progress = (pool.current / pool.goal) * 100;
              return (
                <div
                  key={pool.id}
                  className="bg-surface border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all hover:scale-105 cursor-pointer"
                >
                  {pool.image ? (
                    <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${pool.image})` }}>
                      <div className="h-full bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                        <div>
                          <div className="font-bold text-lg">{pool.title}</div>
                          <div className="text-sm text-textSecondary">{pool.members} members</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-textSecondary/20 to-textTertiary/20 flex items-center justify-center p-4">
                      <div className="text-center">
                        <div className="font-bold text-lg mb-1">{pool.title}</div>
                        <div className="text-sm text-textSecondary">{pool.members} members</div>
                      </div>
                    </div>
                  )}
                  <div className="p-4">
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-bold">${pool.current.toLocaleString()}</span>
                        <span className="text-textSecondary">of ${pool.goal.toLocaleString()}</span>
                      </div>
                      <div className="h-2 bg-surfaceElevated rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-accent"
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-primary font-semibold">{progress.toFixed(0)}%</span>
                      <span className="text-textSecondary">{pool.type}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          <div className="bg-surface border border-border rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                💰
              </div>
              <div className="flex-1">
                <div className="font-semibold">Sarah contributed $250</div>
                <div className="text-sm text-textSecondary">2 hours ago</div>
              </div>
              <div className="text-success font-semibold">+$250</div>
            </div>
            <div className="h-px bg-border"></div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                🎯
              </div>
              <div className="flex-1">
                <div className="font-semibold">Beach House goal reached!</div>
                <div className="text-sm text-textSecondary">Yesterday</div>
              </div>
              <div className="text-success">✓</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
