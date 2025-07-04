
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Zap, Check, X, ArrowRight } from 'lucide-react';
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

      {/* Comparison Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">Why Manual Trading Is Limiting Your Profits</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Manual Trading Can't Keep Up.
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AI Trading</span> Does.
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Markets move 24/7, but human traders need sleep. While you're away, 
            opportunities slip by and emotions cloud judgment. VestorIQ trades with 
            precision when you can't.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Manual Trading */}
          <Card className="p-8 bg-red-50/50 dark:bg-red-900/10 border-red-200 dark:border-red-800/50">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold">Manual Trading</h3>
              <X className="w-8 h-8 text-red-500" />
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Miss 70% of opportunities</h4>
                  <p className="text-muted-foreground">Markets move while you sleep or work</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Emotional trading decisions</h4>
                  <p className="text-muted-foreground">Fear and greed destroy profitable strategies</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Limited analysis capability</h4>
                  <p className="text-muted-foreground">Can't process multiple data points simultaneously</p>
                </div>
              </div>
            </div>
          </Card>

          {/* AI Day-Trading */}
          <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 border-blue-200 dark:border-blue-800/50">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold">AI Day-Trading</h3>
              <div className="flex items-center space-x-2">
                <Check className="w-8 h-8 text-green-500" />
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">VestorIQ</span>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Never miss opportunities</h4>
                  <p className="text-muted-foreground">AI trades 24/7 across global markets</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Emotion-free execution</h4>
                  <p className="text-muted-foreground">Data-driven decisions without fear or greed</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Advanced pattern recognition</h4>
                  <p className="text-muted-foreground">Processes thousands of indicators instantly</p>
                </div>
              </div>
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
