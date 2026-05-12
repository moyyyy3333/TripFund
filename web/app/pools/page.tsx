'use client';

import { useState } from 'react';
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
    daysLeft: 45,
  },
  {
    id: '2',
    title: 'Beach House Weekend',
    goal: 3000,
    current: 2750,
    members: 3,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    type: 'travel',
    daysLeft: 12,
  },
  {
    id: '3',
    title: 'Emergency Fund',
    goal: 5000,
    current: 1200,
    members: 1,
    type: 'personal',
    daysLeft: 180,
  },
  {
    id: '4',
    title: 'Road Trip to Colorado',
    goal: 2500,
    current: 950,
    members: 3,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    type: 'travel',
    daysLeft: 60,
  },
];

export default function PoolsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<'all' | 'travel' | 'personal'>('all');

  const filteredPools = mockPools.filter((pool) => {
    const matchesSearch = pool.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterTab === 'all' || pool.type === filterTab;
    return matchesSearch && matchesFilter;
  });

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
              <Link href="/TripFund/pools" className="text-primary font-semibold">Pools</Link>
              <Link href="/TripFund/profile" className="text-textSecondary hover:text-primary transition-colors">Profile</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Savings Pools</h1>
          <button className="px-6 py-3 bg-gradient-to-r from-primary to-accent rounded-xl font-semibold hover:opacity-90 transition-opacity">
            + Create Pool
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pools..."
              className="w-full bg-surface border border-border rounded-xl px-4 py-3 pl-12 text-textPrimary focus:border-primary focus:outline-none transition-colors"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-3 mb-8">
          {[
            { id: 'all', label: 'All' },
            { id: 'travel', label: '✈️ Travel' },
            { id: 'personal', label: '💰 Personal' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterTab === tab.id
                  ? 'bg-primary/20 text-primary border border-primary'
                  : 'bg-surface text-textSecondary border border-border hover:bg-surfaceElevated'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Pools Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredPools.map((pool) => {
            const progress = (pool.current / pool.goal) * 100;
            return (
              <div
                key={pool.id}
                className="bg-surface border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all hover:scale-[1.02] cursor-pointer"
              >
                {pool.image ? (
                  <div className="h-56 bg-cover bg-center relative" style={{ backgroundImage: `url(${pool.image})` }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-bold text-xl mb-1">{pool.title}</div>
                          <div className="text-sm text-textSecondary">{pool.members} members</div>
                        </div>
                        <div className="bg-surface/80 backdrop-blur px-3 py-1 rounded-lg">
                          <div className="text-sm font-semibold">{pool.daysLeft}d</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-56 bg-gradient-to-br from-textSecondary/20 to-textTertiary/20 flex items-center justify-center p-6">
                    <div className="text-center">
                      <div className="font-bold text-xl mb-1">{pool.title}</div>
                      <div className="text-sm text-textSecondary mb-4">{pool.members} members</div>
                      <div className="inline-block bg-surface/80 backdrop-blur px-3 py-1 rounded-lg">
                        <div className="text-sm font-semibold">{pool.daysLeft} days left</div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <div className="text-2xl font-bold">${pool.current.toLocaleString()}</div>
                      <div className="text-sm text-textSecondary">of ${pool.goal.toLocaleString()} goal</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{progress.toFixed(0)}%</div>
                      <div className="text-sm text-textSecondary capitalize">{pool.type}</div>
                    </div>
                  </div>
                  <div className="h-3 bg-surfaceElevated rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredPools.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <div className="text-xl font-semibold mb-2">No pools found</div>
            <div className="text-textSecondary">Try adjusting your search or filters</div>
          </div>
        )}
      </div>
    </div>
  );
}
