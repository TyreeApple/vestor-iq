import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Zap, Check, ArrowRight, Target, Shield, Clock, Bolt } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  const handleStartTrading = () => {
    navigate('/dashboard');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-background dark:via-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-background/80 backdrop-blur-md border-b border-slate-200 dark:border-border animate-slide-in-right">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 animate-fade-in">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-foreground">VestorIQ</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8 animate-fade-in">
              <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 relative after:absolute after:w-0 after:h-0.5 after:bg-primary after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full">How It Works</a>
              <a href="#product" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 relative after:absolute after:w-0 after:h-0.5 after:bg-primary after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full">AI Trading</a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 relative after:absolute after:w-0 after:h-0.5 after:bg-primary after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full">Pricing</a>
            </nav>

            <div className="flex items-center space-x-4">
              <Button onClick={handleLogin} variant="ghost" className="transition-all duration-300 hover:scale-105">
                Log In
              </Button>
              <Button onClick={handleSignUp} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-8 animate-fade-in">
            <Zap className="w-4 h-4" />
            <span>The First AI Day-Trading Platform</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            From <span className="text-red-500">Manual</span> to
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
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4 h-auto transition-all duration-300 hover:scale-110 hover:shadow-2xl"
            >
              Start Trading <ArrowRight className="ml-2 w-5 h-5" />
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
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex space-x-6 text-sm">
                  <span className="text-blue-600 font-medium border-b-2 border-blue-600 pb-2 transition-all duration-300 hover:scale-105">Portfolio (12)</span>
                  <span className="text-muted-foreground hover:text-blue-600 transition-all duration-300 hover:scale-105 cursor-pointer">Active Trades (8)</span>
                  <span className="text-muted-foreground hover:text-blue-600 transition-all duration-300 hover:scale-105 cursor-pointer">Watchlist (24)</span>
                  <span className="text-muted-foreground hover:text-blue-600 transition-all duration-300 hover:scale-105 cursor-pointer">AI Strategies</span>
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
                </div>
              </div>
              <div className="text-left text-muted-foreground">
                <p className="animate-fade-in">AI detected a high-probability trade opportunity on TSLA with 87% confidence.</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-medium">Portfolio Value</span>
                  <span className="text-2xl font-bold text-foreground">$48,392</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* How It Works Interactive Section */}
      <section id="how-it-works" className="container mx-auto px-6 py-20 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4">
            How It Works
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-slide-up">
            Watch <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AI Trading</span> in Action
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-scale">
            See exactly how our AI analyzes markets and executes profitable trades automatically
          </p>
        </div>

        {/* Interactive Demo */}
        <div className="max-w-5xl mx-auto mb-16">
          <Card className="p-8 bg-white/80 dark:bg-card/80 backdrop-blur-sm border-2 transition-all duration-300 hover:shadow-2xl">
            <div className="bg-slate-900 dark:bg-slate-800 rounded-lg p-6 text-white">
              {/* Terminal Header */}
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-sm text-slate-400 ml-4">VestorIQ AI Trading Engine</span>
              </div>

              {/* Live Trading Simulation */}
              <div className="space-y-4 font-mono text-sm">
                <div className="flex items-center space-x-3 group hover:bg-slate-800 dark:hover:bg-slate-700 p-2 rounded transition-colors">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400">[SCANNING]</span>
                  <span className="text-slate-300">Analyzing 2,847 stocks across all markets...</span>
                </div>
                
                <div className="flex items-center space-x-3 group hover:bg-slate-800 dark:hover:bg-slate-700 p-2 rounded transition-colors">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-blue-400">[PATTERN]</span>
                  <span className="text-slate-300">Bullish breakout detected on TSLA - Confidence: 89%</span>
                </div>
                
                <div className="flex items-center space-x-3 group hover:bg-slate-800 dark:hover:bg-slate-700 p-2 rounded transition-colors">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-purple-400">[RISK CHECK]</span>
                  <span className="text-slate-300">Position size: $2,500 | Stop loss: $245.80 | Target: $267.50</span>
                </div>
                
                <div className="flex items-center space-x-3 group hover:bg-slate-800 dark:hover:bg-slate-700 p-2 rounded transition-colors">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  <span className="text-orange-400">[EXECUTING]</span>
                  <span className="text-slate-300">BUY 10 shares TSLA @ $250.00 - Order filled in 0.12s</span>
                </div>
                
                <div className="flex items-center space-x-3 group hover:bg-slate-800 dark:hover:bg-slate-700 p-2 rounded transition-colors">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-400">[PROFIT]</span>
                  <span className="text-slate-300">SELL 10 shares TSLA @ $263.40 - Profit: +$134.00 (5.36%)</span>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="mt-6 pt-4 border-t border-slate-700 flex justify-between text-xs">
                <div className="text-green-400">
                  <span className="block font-semibold">Today's P&L</span>
                  <span>+$1,247.82</span>
                </div>
                <div className="text-blue-400">
                  <span className="block font-semibold">Win Rate</span>
                  <span>87.3%</span>
                </div>
                <div className="text-purple-400">
                  <span className="block font-semibold">Trades</span>
                  <span>23 executed</span>
                </div>
                <div className="text-orange-400">
                  <span className="block font-semibold">Active</span>
                  <span>24/7 monitoring</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Step-by-Step Process */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="p-8 text-center bg-white/80 dark:bg-card/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl group cursor-pointer">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Target className="w-10 h-10 text-white" />
            </div>
            <div className="mb-4">
              <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-2">
                Step 1
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">Market Analysis</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Our AI scans thousands of stocks every second, analyzing price patterns, volume, and technical indicators to identify profitable opportunities.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-center space-x-2 text-green-600">
                <Check className="w-4 h-4" />
                <span>Real-time market scanning</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-green-600">
                <Check className="w-4 h-4" />
                <span>Technical analysis</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-green-600">
                <Check className="w-4 h-4" />
                <span>Pattern recognition</span>
              </div>
            </div>
          </Card>

          <Card className="p-8 text-center bg-white/80 dark:bg-card/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl group cursor-pointer">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <div className="mb-4">
              <div className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium mb-2">
                Step 2
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-600 transition-colors">Risk Assessment</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Before executing any trade, our AI calculates optimal position sizes, stop-losses, and profit targets to protect your capital.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-center space-x-2 text-green-600">
                <Check className="w-4 h-4" />
                <span>Position sizing</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-green-600">
                <Check className="w-4 h-4" />
                <span>Stop-loss calculation</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-green-600">
                <Check className="w-4 h-4" />
                <span>Risk-reward analysis</span>
              </div>
            </div>
          </Card>

          <Card className="p-8 text-center bg-white/80 dark:bg-card/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl group cursor-pointer">
            <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Bolt className="w-10 h-10 text-white" />
            </div>
            <div className="mb-4">
              <div className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-medium mb-2">
                Step 3
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-green-600 transition-colors">Instant Execution</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              When optimal conditions are met, trades are executed instantly with lightning speed, often faster than human reaction time.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-center space-x-2 text-green-600">
                <Check className="w-4 h-4" />
                <span>Sub-second execution</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-green-600">
                <Check className="w-4 h-4" />
                <span>Automated monitoring</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-green-600">
                <Check className="w-4 h-4" />
                <span>Profit optimization</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Interactive Stats */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-2">Real Performance Metrics</h3>
              <p className="text-blue-100">Based on live trading data from our AI system</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center group hover:scale-105 transition-transform cursor-pointer">
                <div className="text-4xl font-bold mb-2 group-hover:text-yellow-300 transition-colors">87.3%</div>
                <div className="text-blue-100 text-sm">Win Rate</div>
              </div>
              <div className="text-center group hover:scale-105 transition-transform cursor-pointer">
                <div className="text-4xl font-bold mb-2 group-hover:text-yellow-300 transition-colors">0.12s</div>
                <div className="text-blue-100 text-sm">Avg Execution</div>
              </div>
              <div className="text-center group hover:scale-105 transition-transform cursor-pointer">
                <div className="text-4xl font-bold mb-2 group-hover:text-yellow-300 transition-colors">24/7</div>
                <div className="text-blue-100 text-sm">Market Monitoring</div>
              </div>
              <div className="text-center group hover:scale-105 transition-transform cursor-pointer">
                <div className="text-4xl font-bold mb-2 group-hover:text-yellow-300 transition-colors">2,847</div>
                <div className="text-blue-100 text-sm">Stocks Analyzed</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* AI Trading Features Section */}
      <section id="product" className="container mx-auto px-6 py-20 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium mb-4">
            AI Trading Features
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-slide-up">
            Advanced <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AI Trading</span> Technology
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-scale">
            Sophisticated algorithms that combine machine learning with proven trading strategies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <Card className="p-6 text-center bg-white/80 dark:bg-card/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl group cursor-pointer">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">AI-Powered Trading</h3>
            <p className="text-muted-foreground">
              Advanced algorithms analyze market patterns and execute trades automatically
            </p>
          </Card>

          <Card className="p-6 text-center bg-white/80 dark:bg-card/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl group cursor-pointer">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">Risk Management</h3>
            <p className="text-muted-foreground">
              Built-in stop-losses and position sizing to protect your capital
            </p>
          </Card>

          <Card className="p-6 text-center bg-white/80 dark:bg-card/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl group cursor-pointer">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">24/7 Trading</h3>
            <p className="text-muted-foreground">
              Never miss an opportunity - our AI trades around the clock
            </p>
          </Card>

          <Card className="p-6 text-center bg-white/80 dark:bg-card/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl group cursor-pointer">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Bolt className="w-8 h-8 text-white" />
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
          <div className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium mb-4">
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
          <Card className="p-8 bg-white/80 dark:bg-card/80 backdrop-blur-sm border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="text-center mb-6">
              <div className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium mb-4">
                Profit Sharing Model
              </div>
              <h3 className="text-2xl font-bold mb-2">VestorIQ Trading</h3>
              <p className="text-muted-foreground">AI trades for you, we profit together</p>
            </div>

            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-4">
                <div className="hover:scale-110 transition-transform duration-300">
                  <div className="text-4xl font-bold">$10</div>
                  <div className="text-muted-foreground text-sm">monthly fee</div>
                </div>
                <div className="text-2xl text-muted-foreground">+</div>
                <div className="hover:scale-110 transition-transform duration-300">
                  <div className="text-4xl font-bold text-purple-600">15%</div>
                  <div className="text-muted-foreground text-sm">of profits</div>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm">AI trades 24/7 on your behalf</span>
              </div>
              <div className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm">Advanced risk management</span>
              </div>
              <div className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm">No hidden fees or commissions</span>
              </div>
            </div>

            <Button 
              onClick={handleStartTrading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Start AI Trading
            </Button>
          </Card>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <Card className="p-12 bg-slate-900 dark:bg-slate-800 text-white text-center max-w-4xl mx-auto hover:bg-slate-800 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
          <div className="inline-flex items-center space-x-2 bg-purple-600/20 px-4 py-2 rounded-full text-purple-300 text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            <span>Start Trading with AI Today</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-slide-up">
            Ready to Let AI <span className="text-purple-400">Trade</span> for You?
          </h2>

          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto animate-fade-in">
            Join thousands of traders who have transformed their portfolio with AI-driven strategies.
          </p>

          <Button 
            onClick={handleStartTrading}
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4 h-auto transition-all duration-300 hover:scale-110 hover:shadow-2xl"
          >
            Start Trading Free – No Credit Card Needed <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-card dark:bg-card border-t border-border">
        <div className="container mx-auto px-6 py-12">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300 cursor-pointer">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
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
