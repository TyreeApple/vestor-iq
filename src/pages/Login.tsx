
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TrendingUp, Eye, EyeOff, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual login logic
    navigate('/dashboard');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-background dark:via-slate-900 dark:to-slate-800 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBackToHome}
            className="p-0 h-auto hover:scale-105 transition-transform duration-300"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            <span className="text-purple-600">Back to Home</span>
          </Button>
        </div>

        <Card className="p-8 bg-white/80 dark:bg-card/80 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-card/90 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl animate-fade-in-scale">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl animate-pulse-glow">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-foreground">VestorIQ</span>
            </div>
            <h2 className="text-2xl font-bold mb-2 animate-slide-up">Welcome Back</h2>
            <p className="text-muted-foreground animate-fade-in">Sign in to your trading account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="email" className="block text-sm font-medium mb-2">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02]"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="block text-sm font-medium mb-2">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-12 transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02]"
                  required
                />
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0 h-auto hover:scale-110 transition-transform duration-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              <div className="mt-2">
                <a href="#" className="text-sm text-purple-600 hover:underline transition-all duration-300 hover:scale-105 inline-block">
                  Forgot password?
                </a>
              </div>
            </div>

            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-pulse-glow"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Don't have an account?{' '}
              <button 
                onClick={handleSignUp}
                className="text-purple-600 hover:underline transition-all duration-300 hover:scale-105 inline-block font-medium"
              >
                Sign up
              </button>
            </p>
          </div>

          <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300">
            <p className="text-sm text-muted-foreground text-center">
              <strong>Demo Account:</strong> Use any email and password to access the demo trading platform.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
