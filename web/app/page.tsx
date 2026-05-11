export default function Home() {
  return (
    <div className="min-h-screen bg-background text-textPrimary">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-background"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center animate-fade-in">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent mb-6">
                <span className="text-4xl">✈️</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              TripFund
            </h1>
            <p className="text-xl md:text-2xl text-textSecondary mb-8 max-w-2xl mx-auto">
              Save together, travel together. The modern group savings platform for your next adventure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-primary to-accent rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity">
                Get Started
              </button>
              <button className="px-8 py-4 bg-surface border border-border rounded-xl font-semibold text-lg hover:bg-surfaceElevated transition-colors">
                View Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Everything you need to save together
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: '💰',
              title: 'Group Savings',
              description: 'Create pools with friends and family. Track contributions in real-time.',
            },
            {
              icon: '🔒',
              title: 'Secure & Locked',
              description: 'Funds require unanimous approval. Trust built into every transaction.',
            },
            {
              icon: '💳',
              title: 'Instant Cards',
              description: 'Get virtual and physical debit cards for your pools when ready.',
            },
            {
              icon: '💬',
              title: 'Group Chat',
              description: 'Plan your trip together with built-in messaging and shared itineraries.',
            },
            {
              icon: '🌍',
              title: 'Travel Inspiration',
              description: 'Discover destinations and get AI-powered suggestions for your group.',
            },
            {
              icon: '📊',
              title: 'Smart Analytics',
              description: 'Track progress, celebrate milestones, and stay motivated together.',
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-surface border border-border rounded-2xl p-8 hover:bg-surfaceElevated transition-all hover:scale-105"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-textSecondary">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* App Preview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 md:p-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Beautiful. Simple. Powerful.
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="bg-surface rounded-2xl p-6 mb-4 border border-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent"></div>
                  <div>
                    <div className="font-semibold">Tokyo Adventure</div>
                    <div className="text-sm text-textSecondary">4 members</div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-textSecondary">Progress</span>
                    <span className="text-primary font-semibold">56%</span>
                  </div>
                  <div className="h-2 bg-surfaceElevated rounded-full overflow-hidden">
                    <div className="h-full w-[56%] bg-gradient-to-r from-primary to-accent"></div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-xl font-bold">$8,450</span>
                  <span className="text-textSecondary">of $15,000</span>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  ✓
                </div>
                <div>
                  <div className="font-semibold mb-1">Real-time Updates</div>
                  <div className="text-textSecondary text-sm">
                    See contributions and progress instantly
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  ✓
                </div>
                <div>
                  <div className="font-semibold mb-1">Premium Design</div>
                  <div className="text-textSecondary text-sm">
                    Dark mode with beautiful gradients
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  ✓
                </div>
                <div>
                  <div className="font-semibold mb-1">Mobile & Web</div>
                  <div className="text-textSecondary text-sm">
                    Access anywhere, on any device
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to start saving?
        </h2>
        <p className="text-xl text-textSecondary mb-8">
          Join thousands planning their next adventure together.
        </p>
        <button className="px-12 py-5 bg-gradient-to-r from-primary to-accent rounded-xl font-bold text-lg hover:opacity-90 transition-opacity">
          Create Your First Pool
        </button>
      </div>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✈️</span>
              <span className="font-bold text-xl">TripFund</span>
            </div>
            <div className="flex gap-8 text-textSecondary">
              <a href="#" className="hover:text-primary transition-colors">About</a>
              <a href="#" className="hover:text-primary transition-colors">Features</a>
              <a href="#" className="hover:text-primary transition-colors">Pricing</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
            </div>
            <div className="text-textSecondary text-sm">
              © 2026 TripFund. Built with 🦞 by Claw.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
