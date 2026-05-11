'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo, just redirect to dashboard
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent mb-4">
            <span className="text-3xl">✈️</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">TripFund</h1>
          <p className="text-textSecondary">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </p>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-sm text-textSecondary mb-2">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-surfaceElevated border border-border rounded-xl px-4 py-3 text-textPrimary focus:border-primary focus:outline-none transition-colors"
                  placeholder="John Doe"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm text-textSecondary mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surfaceElevated border border-border rounded-xl px-4 py-3 text-textPrimary focus:border-primary focus:outline-none transition-colors"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-textSecondary mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surfaceElevated border border-border rounded-xl px-4 py-3 text-textPrimary focus:border-primary focus:outline-none transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-accent text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity"
            >
              {mode === 'login' ? 'Log In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-textSecondary hover:text-primary transition-colors"
            >
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <span className="text-primary font-semibold">
                {mode === 'login' ? 'Sign Up' : 'Log In'}
              </span>
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-textSecondary hover:text-primary transition-colors">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
