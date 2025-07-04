
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
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-background/80 backdrop-blur-md border-b border-slate-200 dark:border-border animate-slide-in-right">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 animate-fade-in">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl animate-pulse-glow">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-foreground">VestorIQ</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8 animate-fade-in">
              <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 relative after:absolute after:w-0 after:h-0.5 after:bg-primary after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full">How It Works</a>
              <a href="#case-studies" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 relative after:absolute after:w-0 after:h-0.5 after:bg-primary after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full">Case Studies</a>
              <a href="#product" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 relative after:absolute after:w-0 after:h-0.5 after:bg-primary after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full">Product</a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 relative after:absolute after:w-0 after:h-0.5 after:bg-primary after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full">Pricing</a>
            </nav>

            <Button onClick={handleGetStarted} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-bounce">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-8 animate-fade-in animate-pulse">
            <Zap className="w-4 h-4 animate-bounce" />
            <span>The First AI Day-Trading Platform</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            From <span className="text-red-500 animate-pulse">Manual</span> to
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-shimmer">Automated</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-in-scale">
            AI that trades for you 24/7, so you can maximize profits while you sleep
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-slide-up">
            <Button 
              onClick={handleStartTrading}
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4 h-auto transition-all duration-300 hover:scale-110 hover:shadow-2xl animate-pulse-glow"
            >
              Start Trading <ArrowRight className="ml-2 w-5 h-5 animate-bounce" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-4 h-auto border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20"
            >
              See How It Works
            </Button>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-20 max-w-6xl mx-auto animate-float">
          <Card className="p-4 bg-white/60 dark:bg-card/60 backdrop-blur-sm border-2 border-white/20 dark:border-border/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] animate-fade-in-scale">
            <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
                <div className="flex space-x-6 text-sm">
                  <span className="text-blue-600 font-medium border-b-2 border-blue-600 pb-2 transition-all duration-300 hover:scale-105">Portfolio (12)</span>
                  <span className="text-muted-foreground hover:text-blue-600 transition-all duration-300 hover:scale-105 cursor-pointer">Active Trades (8)</span>
                  <span className="text-muted-foreground hover:text-blue-600 transition-all duration-300 hover:scale-105 cursor-pointer">Watchlist (24)</span>
                  <span className="text-muted-foreground hover:text-blue-600 transition-all duration-300 hover:scale-105 cursor-pointer">AI Strategies</span>
                </div>
                <div className="ml-auto flex items-center space-x-4">
                  <div className="flex items-center space-x-2 animate-bounce">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-500 font-medium">+$2,847</span>
                  </div>
                  <div className="flex items-center space-x-2 animate-pulse">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-purple-500 font-medium">AI Active</span>
                  </div>
                  <span className="text-2xl font-bold animate-bounce">$</span>
                </div>
              </div>
              <div className="text-left text-muted-foreground">
                <p className="animate-fade-in">AI detected a high-probability trade opportunity on TSLA with 87% confidence.</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-medium">Portfolio Value</span>
                  <span className="text-2xl font-bold text-foreground animate-pulse">$48,392</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-slide-up">
            How <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">VestorIQ</span> Trades for You in 3 Steps
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-scale">
            Our AI-driven platform automates day trading for busy professionals, transforming manual analysis into systematic profit generation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto items-center">
          {/* Left side - Steps */}
          <div className="space-y-8 stagger-children">
            <div className="flex items-start space-x-4 p-6 rounded-xl bg-card/50 border border-blue-200 dark:border-blue-800/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-card/70 cursor-pointer">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold animate-pulse-glow">
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

            <div className="flex items-start space-x-4 p-6 rounded-xl bg-card/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-card/70 cursor-pointer">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold animate-pulse-glow" style={{animationDelay: '0.2s'}}>
                2
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">AI Executes Trades Automatically</h3>
                <p className="text-muted-foreground">
                  When optimal conditions are met, VestorIQ automatically executes...
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 rounded-xl bg-card/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-card/70 cursor-pointer">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold animate-pulse-glow" style={{animationDelay: '0.4s'}}>
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
          <div className="relative animate-float">
            <div className="bg-gradient-to-br from-orange-200 to-orange-300 rounded-lg p-8 mb-4 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              {/* Simulated dashboard content */}
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Candice Gasperini</span>
                    <div className="flex space-x-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs animate-pulse">42.6k - 8k</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Scaling Small Businesses from 6 to 7 Figures Without Hiring a Big Team | Part-time CMO |</p>
                  <div className="text-xs text-gray-500">
                    <p>If LinkedIn is your #1 lead source, why treat it like an inbox? You wouldn't track sales in a Gmail thread. So why are you doing it in LinkedIn DMs?</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-3 hover:shadow-md transition-all duration-300 hover:scale-105">
                    <div className="text-xs text-gray-500 mb-1">Reach Potential</div>
                    <div className="font-bold animate-pulse">12.6k - 8k</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 hover:shadow-md transition-all duration-300 hover:scale-105">
                    <div className="text-xs text-gray-500 mb-1">Top Personas</div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-xs">Sales Leaders</span>
                        <span className="text-xs animate-pulse">90%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs">Growth Leaders</span>
                        <span className="text-xs animate-pulse">80%</span>
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
          <div className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium mb-4 animate-bounce">
            AI Trading Features
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-slide-up">
            Advanced <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AI Trading</span> Technology
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-scale">
            Our sophisticated AI platform combines machine learning with proven trading strategies to maximize your returns while minimizing risk.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto stagger-children">
          <Card className="p-6 text-center bg-white/80 dark:bg-card/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-white/90 dark:hover:bg-card/90 group cursor-pointer">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse">
              <TrendingUp className="w-8 h-8 text-white group-hover:animate-bounce" />
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">AI-Powered Trading</h3>
            <p className="text-muted-foreground">
              Advanced algorithms analyze market patterns and execute trades automatically
            </p>
          </Card>

          <Card className="p-6 text-center bg-white/80 dark:bg-card/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-white/90 dark:hover:bg-card/90 group cursor-pointer">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse">
              <Shield className="w-8 h-8 text-white group-hover:animate-bounce" />
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">Risk Management</h3>
            <p className="text-muted-foreground">
              Built-in stop-losses and position sizing to protect your capital
            </p>
          </Card>

          <Card className="p-6 text-center bg-white/80 dark:bg-card/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-white/90 dark:hover:bg-card/90 group cursor-pointer">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse">
              <Clock className="w-8 h-8 text-white group-hover:animate-bounce" />
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">24/7 Trading</h3>
            <p className="text-muted-foreground">
              Never miss an opportunity - our AI trades around the clock
            </p>
          </Card>

          <Card className="p-6 text-center bg-white/80 dark:bg-card/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-white/90 dark:hover:bg-card/90 group cursor-pointer">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse">
              <Bolt className="w-8 h-8 text-white group-hover:animate-bounce" />
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">Instant Execution</h3>
            <p className="text-muted-foreground">
              Lightning-fast trade execution when optimal conditions are met
            </p>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium mb-4 animate-pulse">
            Pricing
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-slide-up">
            Simple, Transparent <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Profit Sharing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-scale">
            Pay just $10/month and we take 15% of your trading profits. You only pay more when you make more.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <Card className="p-8 bg-white/80 dark:bg-card/80 backdrop-blur-sm border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/90 dark:hover:bg-card/90">
            <div className="text-center mb-6">
              <div className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium mb-4 animate-bounce">
                Profit Sharing Model
              </div>
              <h3 className="text-2xl font-bold mb-2">VestorIQ Trading</h3>
              <p className="text-muted-foreground">AI trades for you, we profit together</p>
            </div>

            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-4">
                <div className="hover:scale-110 transition-transform duration-300">
                  <div className="text-4xl font-bold animate-pulse">$10</div>
                  <div className="text-muted-foreground text-sm">monthly fee</div>
                </div>
                <div className="text-2xl text-muted-foreground animate-bounce">+</div>
                <div className="hover:scale-110 transition-transform duration-300">
                  <div className="text-4xl font-bold text-purple-600 animate-pulse">15%</div>
                  <div className="text-muted-foreground text-sm">of profits</div>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300 hover:scale-105">
                <TrendingUp className="w-5 h-5 text-purple-600 animate-bounce" />
                <span className="text-sm">We only win when you win</span>
              </div>
              <div className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
                <Check className="w-5 h-5 text-green-500 animate-pulse" />
                <span className="text-sm">AI trades 24/7 on your behalf</span>
              </div>
              <div className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
                <Check className="w-5 h-5 text-green-500 animate-pulse" style={{animationDelay: '0.2s'}} />
                <span className="text-sm">Advanced risk management</span>
              </div>
              <div className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
                <Check className="w-5 h-5 text-green-500 animate-pulse" style={{animationDelay: '0.4s'}} />
                <span className="text-sm">No hidden fees or commissions</span>
              </div>
            </div>

            <Button 
              onClick={handleStartTrading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-pulse-glow"
            >
              Start AI Trading
            </Button>

            <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300">
              <p className="text-sm text-muted-foreground text-center">
                <strong>Example:</strong> If you make $1,000 in trading profits, you keep $850 and we take $150. If you don't profit, you only pay the $10 monthly fee.
              </p>
            </div>
          </Card>
        </div>

        {/* Free Trial Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="p-8 bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Zap className="w-5 h-5 animate-bounce" />
                  <span className="text-sm font-medium">Free Trial</span>
                </div>
                <h3 className="text-3xl font-bold mb-2 animate-slide-up">Try Risk-Free for 14 Days</h3>
                <p className="text-slate-300 mb-6 max-w-md animate-fade-in">
                  Start with our free trial and see how our AI performs before committing to the profit-sharing model.
                </p>
              </div>
              <Button 
                onClick={handleStartTrading}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-110 hover:shadow-xl animate-pulse-glow"
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-slide-up">Trusted by professional traders</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto stagger-children">
          {/* Stats Card */}
          <Card className="p-8 text-center bg-purple-50 dark:bg-purple-900/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-purple-100 dark:hover:bg-purple-900/30 cursor-pointer group">
            <div className="text-5xl font-bold mb-2 group-hover:animate-pulse">92%</div>
            <div className="text-muted-foreground">success rate on trades</div>
            <div className="mt-4 text-sm font-medium group-hover:text-purple-600 transition-colors">VI • Q VestorIQ</div>
          </Card>

          {/* Testimonial 1 */}
          <Card className="p-6 bg-white/80 dark:bg-card/80 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-white/90 dark:hover:bg-card/90 cursor-pointer">
            <p className="text-lg mb-4 animate-fade-in">
              "VestorIQ's AI trading system has transformed my portfolio. It executes trades 24/7 with precision I could never achieve manually."
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse"></div>
              <div>
                <div className="font-semibold">Sarah Chen</div>
                <div className="text-sm text-muted-foreground">Portfolio Manager at Meridian Capital</div>
              </div>
            </div>
          </Card>

          {/* Testimonial 2 */}
          <Card className="p-6 bg-orange-50 dark:bg-orange-900/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-orange-100 dark:hover:bg-orange-900/30 cursor-pointer">
            <p className="text-lg mb-4 animate-fade-in">
              "The AI identifies market patterns and executes trades faster than any human trader. Our returns have increased by 40% since implementation."
            </p>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-8">
          <Card className="p-6 bg-white/80 dark:bg-card/80 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-white/90 dark:hover:bg-card/90 cursor-pointer">
            <div className="flex items-center space-x-3 mb-4">
              <div className="font-bold text-lg hover:text-blue-600 transition-colors">TradeTech</div>
            </div>
            <p className="text-muted-foreground">
              "VestorIQ's risk management algorithms protect my capital while maximizing opportunities."
            </p>
          </Card>

          <Card className="p-6 bg-slate-100 dark:bg-slate-800 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer">
            <p className="text-lg">
              "VestorIQ's risk management algorithms protect my capital while maximizing opportunities."
            </p>
          </Card>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <Card className="p-12 bg-slate-900 dark:bg-slate-800 text-white text-center max-w-4xl mx-auto hover:bg-slate-800 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
          <div className="inline-flex items-center space-x-2 bg-purple-600/20 px-4 py-2 rounded-full text-purple-300 text-sm font-medium mb-8 animate-pulse">
            <Zap className="w-4 h-4 animate-bounce" />
            <span>Start Trading with AI Today</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-slide-up">
            Ready to Let AI <span className="text-red-400 animate-pulse">Trade</span> for <span className="text-purple-400 animate-pulse">You?</span>
          </h2>

          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto animate-fade-in">
            Join thousands of traders who have transformed their portfolio with AI-driven day trading strategies.
          </p>

          <div className="space-y-4 mb-8 max-w-md mx-auto text-left stagger-children">
            <div className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
              <Check className="w-5 h-5 text-green-400 animate-pulse" />
              <span>AI executes trades 24/7 while you sleep</span>
            </div>
            <div className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
              <Check className="w-5 h-5 text-green-400 animate-pulse" style={{animationDelay: '0.2s'}} />
              <span>Advanced risk management and stop-losses</span>
            </div>
            <div className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
              <Check className="w-5 h-5 text-green-400 animate-pulse" style={{animationDelay: '0.4s'}} />
              <span>Backtested strategies with proven results</span>
            </div>
          </div>

          <Button 
            onClick={handleStartTrading}
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4 h-auto transition-all duration-300 hover:scale-110 hover:shadow-2xl animate-pulse-glow"
          >
            Start Trading Free – No Credit Card Needed <ArrowRight className="ml-2 w-5 h-5 animate-bounce" />
          </Button>
        </Card>
      </section>

      {/* Login Section */}
      <section className="container mx-auto px-6 py-20 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="max-w-md mx-auto">
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="sm" className="p-0 h-auto hover:scale-105 transition-transform duration-300">
              <ChevronLeft className="w-4 h-4 mr-2" />
              <span className="text-purple-600">Back to Home</span>
            </Button>
          </div>

          <Card className="p-8 bg-white/80 dark:bg-card/80 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-card/90 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl animate-fade-in-scale">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2 animate-slide-up">Welcome Back</h2>
              <p className="text-muted-foreground animate-fade-in">Sign in to your VestorIQ account</p>
            </div>

            <form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02]"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12 transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02]"
                  />
                  <Button type="button" variant="ghost" size="sm" className="absolute right-3 top-1/2 -translate-y-1/2 p-0 h-auto hover:scale-110 transition-transform duration-300">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
                <div className="mt-2">
                  <a href="#" className="text-sm text-purple-600 hover:underline transition-all duration-300 hover:scale-105 inline-block">Forgot password?</a>
                </div>
              </div>

              <Button 
                onClick={handleStartTrading}
                className="w-full bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 text-white py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Don't have an account? <a href="#" className="text-purple-600 hover:underline transition-all duration-300 hover:scale-105 inline-block">Sign up</a>
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card dark:bg-card border-t border-border">
        <div className="container mx-auto px-6 py-12">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300 cursor-pointer">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl animate-pulse-glow">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-foreground">VestorIQ</span>
            </div>
          </div>
          <div className="text-center mt-6">
            <p className="text-muted-foreground hover:text-foreground transition-colors duration-300">© 2024 VestorIQ. Advanced AI Trading Platform - All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
