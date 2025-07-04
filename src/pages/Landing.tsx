
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Zap, Check, X, ArrowRight, Target, Shield, Clock, Bolt, Eye, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  const handleStartTrading = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-background dark:via-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-background/80 backdrop-blur-md border-b border-slate-200 dark:border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-foreground">VestorIQ</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
              <a href="#case-studies" className="text-muted-foreground hover:text-foreground transition-colors">Case Studies</a>
              <a href="#product" className="text-muted-foreground hover:text-foreground transition-colors">Product</a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            </nav>

            <Button onClick={handleGetStarted} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            <span>The First AI Day-Trading Platform</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            From <span className="text-red-500">Manual</span> to
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Automated</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            AI that trades for you 24/7, so you can maximize profits while you sleep
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button 
              onClick={handleStartTrading}
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4 h-auto"
            >
              Start Trading <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-4 h-auto border-2"
            >
              See How It Works
            </Button>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-20 max-w-6xl mx-auto">
          <Card className="p-4 bg-white/60 dark:bg-card/60 backdrop-blur-sm border-2 border-white/20 dark:border-border/50 shadow-2xl">
            <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex space-x-6 text-sm">
                  <span className="text-blue-600 font-medium border-b-2 border-blue-600 pb-2">Portfolio (12)</span>
                  <span className="text-muted-foreground">Active Trades (8)</span>
                  <span className="text-muted-foreground">Watchlist (24)</span>
                  <span className="text-muted-foreground">AI Strategies</span>
                </div>
                <div className="ml-auto flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-500 font-medium">+$2,847</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-purple-500 font-medium">AI Active</span>
                  </div>
                  <span className="text-2xl font-bold">$</span>
                </div>
              </div>
              <div className="text-left text-muted-foreground">
                <p>AI detected a high-probability trade opportunity on TSLA with 87% confidence.</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-medium">Portfolio Value</span>
                  <span className="text-2xl font-bold text-foreground">$48,392</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">VestorIQ</span> Trades for You in 3 Steps
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our AI-driven platform automates day trading for busy professionals, transforming manual analysis into systematic profit generation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto items-center">
          {/* Left side - Steps */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4 p-6 rounded-xl bg-card/50 border border-blue-200 dark:border-blue-800/50">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">AI Analyzes Market Patterns</h3>
                <p className="text-muted-foreground mb-4">
                  Our AI continuously scans thousands of stocks, analyzing...
                </p>
                <div className="text-sm space-y-1">
                  <p>• AI monitors: Technical indicators, volume patterns, and market sentiment across all major exchanges</p>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 rounded-xl bg-card/50">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">AI Executes Trades Automatically</h3>
                <p className="text-muted-foreground">
                  When optimal conditions are met, VestorIQ automatically executes...
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 rounded-xl bg-card/50">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">AI Maximizes Your Returns</h3>
                <p className="text-muted-foreground">
                  Through continuous learning and adaptation, our AI optimizes your...
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Dashboard mockup */}
          <div className="relative">
            <div className="bg-gradient-to-br from-orange-200 to-orange-300 rounded-lg p-8 mb-4">
              {/* Simulated dashboard content */}
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Candice Gasperini</span>
                    <div className="flex space-x-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">42.6k - 8k</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Scaling Small Businesses from 6 to 7 Figures Without Hiring a Big Team | Part-time CMO |</p>
                  <div className="text-xs text-gray-500">
                    <p>If LinkedIn is your #1 lead source, why treat it like an inbox? You wouldn't track sales in a Gmail thread. So why are you doing it in LinkedIn DMs?</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Reach Potential</div>
                    <div className="font-bold">12.6k - 8k</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Top Personas</div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-xs">Sales Leaders</span>
                        <span className="text-xs">90%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs">Growth Leaders</span>
                        <span className="text-xs">80%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Trading Features Section */}
      <section id="product" className="container mx-auto px-6 py-20 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium mb-4">
            AI Trading Features
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Advanced <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AI Trading</span> Technology
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our sophisticated AI platform combines machine learning with proven trading strategies to maximize your returns while minimizing risk.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <Card className="p-6 text-center bg-white/80 dark:bg-card/80 backdrop-blur-sm">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">AI-Powered Trading</h3>
            <p className="text-muted-foreground">
              Advanced algorithms analyze market patterns and execute trades automatically
            </p>
          </Card>

          <Card className="p-6 text-center bg-white/80 dark:bg-card/80 backdrop-blur-sm">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Risk Management</h3>
            <p className="text-muted-foreground">
              Built-in stop-losses and position sizing to protect your capital
            </p>
          </Card>

          <Card className="p-6 text-center bg-white/80 dark:bg-card/80 backdrop-blur-sm">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">24/7 Trading</h3>
            <p className="text-muted-foreground">
              Never miss an opportunity - our AI trades around the clock
            </p>
          </Card>

          <Card className="p-6 text-center bg-white/80 dark:bg-card/80 backdrop-blur-sm">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Bolt className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Instant Execution</h3>
            <p className="text-muted-foreground">
              Lightning-fast trade execution when optimal conditions are met
            </p>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium mb-4">
            Pricing
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Simple, Transparent <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Profit Sharing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Pay just $10/month and we take 15% of your trading profits. You only pay more when you make more.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <Card className="p-8 bg-white/80 dark:bg-card/80 backdrop-blur-sm border-2">
            <div className="text-center mb-6">
              <div className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium mb-4">
                Profit Sharing Model
              </div>
              <h3 className="text-2xl font-bold mb-2">VestorIQ Trading</h3>
              <p className="text-muted-foreground">AI trades for you, we profit together</p>
            </div>

            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-4">
                <div>
                  <div className="text-4xl font-bold">$10</div>
                  <div className="text-muted-foreground text-sm">monthly fee</div>
                </div>
                <div className="text-2xl text-muted-foreground">+</div>
                <div>
                  <div className="text-4xl font-bold text-purple-600">15%</div>
                  <div className="text-muted-foreground text-sm">of profits</div>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <span className="text-sm">We only win when you win</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm">AI trades 24/7 on your behalf</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm">Advanced risk management</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm">No hidden fees or commissions</span>
              </div>
            </div>

            <Button 
              onClick={handleStartTrading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg py-3"
            >
              Start AI Trading
            </Button>

            <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <p className="text-sm text-muted-foreground text-center">
                <strong>Example:</strong> If you make $1,000 in trading profits, you keep $850 and we take $150. If you don't profit, you only pay the $10 monthly fee.
              </p>
            </div>
          </Card>
        </div>

        {/* Free Trial Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="p-8 bg-slate-900 dark:bg-slate-800 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Zap className="w-5 h-5" />
                  <span className="text-sm font-medium">Free Trial</span>
                </div>
                <h3 className="text-3xl font-bold mb-2">Try Risk-Free for 14 Days</h3>
                <p className="text-slate-300 mb-6 max-w-md">
                  Start with our free trial and see how our AI performs before committing to the profit-sharing model.
                </p>
              </div>
              <Button 
                onClick={handleStartTrading}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Start Free Trial
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-6 py-20 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Trusted by professional traders</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Stats Card */}
          <Card className="p-8 text-center bg-purple-50 dark:bg-purple-900/20">
            <div className="text-5xl font-bold mb-2">92%</div>
            <div className="text-muted-foreground">success rate on trades</div>
            <div className="mt-4 text-sm font-medium">VI • Q VestorIQ</div>
          </Card>

          {/* Testimonial 1 */}
          <Card className="p-6 bg-white/80 dark:bg-card/80">
            <p className="text-lg mb-4">
              "VestorIQ's AI trading system has transformed my portfolio. It executes trades 24/7 with precision I could never achieve manually."
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
              <div>
                <div className="font-semibold">Sarah Chen</div>
                <div className="text-sm text-muted-foreground">Portfolio Manager at Meridian Capital</div>
              </div>
            </div>
          </Card>

          {/* Testimonial 2 */}
          <Card className="p-6 bg-orange-50 dark:bg-orange-900/20">
            <p className="text-lg mb-4">
              "The AI identifies market patterns and executes trades faster than any human trader. Our returns have increased by 40% since implementation."
            </p>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-8">
          <Card className="p-6 bg-white/80 dark:bg-card/80">
            <div className="flex items-center space-x-3 mb-4">
              <div className="font-bold text-lg">TradeTech</div>
            </div>
            <p className="text-muted-foreground">
              "VestorIQ's risk management algorithms protect my capital while maximizing opportunities."
            </p>
          </Card>

          <Card className="p-6 bg-slate-100 dark:bg-slate-800">
            <p className="text-lg">
              "VestorIQ's risk management algorithms protect my capital while maximizing opportunities."
            </p>
          </Card>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <Card className="p-12 bg-slate-900 dark:bg-slate-800 text-white text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-purple-600/20 px-4 py-2 rounded-full text-purple-300 text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            <span>Start Trading with AI Today</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Let AI <span className="text-red-400">Trade</span> for <span className="text-purple-400">You?</span>
          </h2>

          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of traders who have transformed their portfolio with AI-driven day trading strategies.
          </p>

          <div className="space-y-4 mb-8 max-w-md mx-auto text-left">
            <div className="flex items-center space-x-3">
              <Check className="w-5 h-5 text-green-400" />
              <span>AI executes trades 24/7 while you sleep</span>
            </div>
            <div className="flex items-center space-x-3">
              <Check className="w-5 h-5 text-green-400" />
              <span>Advanced risk management and stop-losses</span>
            </div>
            <div className="flex items-center space-x-3">
              <Check className="w-5 h-5 text-green-400" />
              <span>Backtested strategies with proven results</span>
            </div>
          </div>

          <Button 
            onClick={handleStartTrading}
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4 h-auto"
          >
            Start Trading Free – No Credit Card Needed <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Card>
      </section>

      {/* Login Section */}
      <section className="container mx-auto px-6 py-20 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="max-w-md mx-auto">
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="sm" className="p-0 h-auto">
              <ChevronLeft className="w-4 h-4 mr-2" />
              <span className="text-purple-600">Back to Home</span>
            </Button>
          </div>

          <Card className="p-8 bg-white/80 dark:bg-card/80 backdrop-blur-sm">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
              <p className="text-muted-foreground">Sign in to your VestorIQ account</p>
            </div>

            <form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                  />
                  <Button type="button" variant="ghost" size="sm" className="absolute right-3 top-1/2 -translate-y-1/2 p-0 h-auto">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
                <div className="mt-2">
                  <a href="#" className="text-sm text-purple-600 hover:underline">Forgot password?</a>
                </div>
              </div>

              <Button 
                onClick={handleStartTrading}
                className="w-full bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 text-white py-3"
              >
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Don't have an account? <a href="#" className="text-purple-600 hover:underline">Sign up</a>
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card dark:bg-card border-t border-border">
        <div className="container mx-auto px-6 py-12">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-foreground">VestorIQ</span>
            </div>
          </div>
          <div className="text-center mt-6">
            <p className="text-muted-foreground">© 2024 VestorIQ. Advanced AI Trading Platform - All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
