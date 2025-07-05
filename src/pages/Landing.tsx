
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
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl animate-pulse-glow">
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
              <Button onClick={handleSignUp} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-bounce">
                Sign Up
              </Button>
            </div>
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
            How <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">VestorIQ</span> Trades for You
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-scale">
            Our AI-powered platform automates day trading with advanced algorithms and risk management.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="p-6 text-center bg-white/80 dark:bg-card/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl group cursor-pointer">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse">
              <Target className="w-8 h-8 text-white group-hover:animate-bounce" />
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">AI Market Analysis</h3>
            <p className="text-muted-foreground">
              Continuously scans thousands of stocks, analyzing technical indicators and market patterns 24/7
            </p>
          </Card>

          <Card className="p-6 text-center bg-white/80 dark:bg-card/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl group cursor-pointer">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse">
              <Bolt className="w-8 h-8 text-white group-hover:animate-bounce" />
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">Automated Trading</h3>
            <p className="text-muted-foreground">
              Executes trades instantly when optimal conditions are met, faster than any human trader
            </p>
          </Card>

          <Card className="p-6 text-center bg-white/80 dark:bg-card/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl group cursor-pointer">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse">
              <Shield className="w-8 h-8 text-white group-hover:animate-bounce" />
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">Risk Management</h3>
            <p className="text-muted-foreground">
              Built-in stop-losses and position sizing protect your capital while maximizing returns
            </p>
          </Card>
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
            Sophisticated algorithms that combine machine learning with proven trading strategies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <Card className="p-6 text-center bg-white/80 dark:bg-card/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl group cursor-pointer">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse">
              <TrendingUp className="w-8 h-8 text-white group-hover:animate-bounce" />
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">AI-Powered Trading</h3>
            <p className="text-muted-foreground">
              Advanced algorithms analyze market patterns and execute trades automatically
            </p>
          </Card>

          <Card className="p-6 text-center bg-white/80 dark:bg-card/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl group cursor-pointer">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse">
              <Shield className="w-8 h-8 text-white group-hover:animate-bounce" />
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">Risk Management</h3>
            <p className="text-muted-foreground">
              Built-in stop-losses and position sizing to protect your capital
            </p>
          </Card>

          <Card className="p-6 text-center bg-white/80 dark:bg-card/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl group cursor-pointer">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse">
              <Clock className="w-8 h-8 text-white group-hover:animate-bounce" />
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">24/7 Trading</h3>
            <p className="text-muted-foreground">
              Never miss an opportunity - our AI trades around the clock
            </p>
          </Card>

          <Card className="p-6 text-center bg-white/80 dark:bg-card/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl group cursor-pointer">
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
          <Card className="p-8 bg-white/80 dark:bg-card/80 backdrop-blur-sm border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
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
            Ready to Let AI <span className="text-purple-400 animate-pulse">Trade</span> for You?
          </h2>

          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto animate-fade-in">
            Join thousands of traders who have transformed their portfolio with AI-driven strategies.
          </p>

          <Button 
            onClick={handleStartTrading}
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4 h-auto transition-all duration-300 hover:scale-110 hover:shadow-2xl animate-pulse-glow"
          >
            Start Trading Free – No Credit Card Needed <ArrowRight className="ml-2 w-5 h-5 animate-bounce" />
          </Button>
        </Card>
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
