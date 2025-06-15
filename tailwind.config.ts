
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				// === PALETA PROFISSIONAL FORKLIFT NAVIGATOR ===
				
				// Azuis sofisticados (primários)
				blue: {
					50: 'hsl(217, 100%, 97%)',
					100: 'hsl(217, 95%, 92%)',
					200: 'hsl(217, 91%, 85%)',
					300: 'hsl(217, 91%, 75%)',
					400: 'hsl(217, 91%, 65%)',
					500: 'hsl(217, 91%, 60%)', // #3B82F6 - Principal
					600: 'hsl(221, 83%, 56%)', // #2563EB - Light mode
					700: 'hsl(221, 83%, 48%)',
					800: 'hsl(221, 83%, 40%)',
					900: 'hsl(221, 83%, 32%)',
				},
				
				// Roxos elegantes (acentos)
				purple: {
					50: 'hsl(262, 100%, 97%)',
					100: 'hsl(262, 95%, 92%)',
					200: 'hsl(262, 91%, 85%)',
					300: 'hsl(262, 83%, 75%)',
					400: 'hsl(262, 83%, 70%)',
					500: 'hsl(262, 83%, 67%)', // #8B5CF6 - Dark mode
					600: 'hsl(262, 83%, 58%)', // #7C3AED - Light mode
					700: 'hsl(262, 83%, 50%)',
					800: 'hsl(262, 83%, 42%)',
					900: 'hsl(262, 83%, 34%)',
				},
				
				// Laranjas vibrantes (highlights)
				orange: {
					50: 'hsl(32, 100%, 95%)',
					100: 'hsl(32, 100%, 90%)',
					200: 'hsl(32, 100%, 82%)',
					300: 'hsl(32, 100%, 74%)',
					400: 'hsl(32, 93%, 66%)',
					500: 'hsl(32, 93%, 62%)', // #F59E42 - Principal
					600: 'hsl(32, 93%, 54%)',
					700: 'hsl(32, 93%, 46%)',
					800: 'hsl(32, 93%, 38%)',
					900: 'hsl(32, 93%, 30%)',
				},
				
				// Cinzas profissionais
				slate: {
					50: 'hsl(210, 36%, 98%)',   // Light bg primary
					100: 'hsl(210, 20%, 98%)',  // Light surface
					150: 'hsl(210, 16%, 95%)',  // Light elevated
					200: 'hsl(210, 16%, 90%)',  // Light border
					300: 'hsl(215, 19%, 56%)',  // Light text secondary
					400: 'hsl(215, 19%, 46%)',
					500: 'hsl(217, 19%, 36%)',
					600: 'hsl(217, 19%, 26%)',
					700: 'hsl(217, 19%, 23%)',  // Light text primary
					800: 'hsl(222, 17%, 12%)',  // Dark surface
					850: 'hsl(226, 16%, 17%)',  // Dark elevated
					900: 'hsl(222, 23%, 9%)',   // Dark bg primary
					950: 'hsl(220, 19%, 20%)',  // Dark border
				},
				
				// Cores semânticas modernas
				success: {
					DEFAULT: 'hsl(142, 70%, 47%)', // #22C55E - Dark
					light: 'hsl(142, 76%, 36%)',   // #16A34A - Light
					foreground: 'hsl(0, 0%, 100%)'
				},
				error: {
					DEFAULT: 'hsl(0, 84%, 60%)',   // #EF4444 - Dark
					light: 'hsl(0, 71%, 48%)',     // #DC2626 - Light
					foreground: 'hsl(0, 0%, 100%)'
				},
				warning: {
					DEFAULT: 'hsl(48, 96%, 56%)',  // #FACC15 - Dark
					light: 'hsl(48, 96%, 46%)',    // #EAB308 - Light
					foreground: 'hsl(0, 0%, 100%)'
				},
				info: {
					DEFAULT: 'hsl(200, 85%, 60%)',
					foreground: 'hsl(200, 80%, 50%)'
				},
				
				// Cores do sistema shadcn/ui
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				
				// Sistema sidebar
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				
				// Status semântico do sistema
				status: {
					operational: 'hsl(var(--status-operational))',
					maintenance: 'hsl(var(--status-maintenance))',
					inactive: 'hsl(var(--status-inactive))',
					warning: 'hsl(var(--status-warning))'
				}
			},
			backgroundImage: {
				// Gradientes sofisticados
				'gradient-primary': 'linear-gradient(135deg, hsl(217, 91%, 60%), hsl(262, 83%, 67%))',
				'gradient-secondary': 'linear-gradient(135deg, hsl(262, 83%, 67%), hsl(32, 93%, 62%))',
				'gradient-accent': 'linear-gradient(135deg, hsl(32, 93%, 62%), hsl(32, 93%, 54%))',
				'gradient-surface-light': 'linear-gradient(135deg, white, hsl(210, 36%, 98%))',
				'gradient-surface-dark': 'linear-gradient(135deg, hsl(222, 17%, 12%), hsl(226, 16%, 17%))',
				'gradient-premium': 'linear-gradient(135deg, hsl(217, 91%, 60%) 0%, hsl(262, 83%, 67%) 50%, hsl(32, 93%, 62%) 100%)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					from: { opacity: '0' },
					to: { opacity: '1' }
				},
				'slide-in-bottom': {
					from: { transform: 'translateY(20px)', opacity: '0' },
					to: { transform: 'translateY(0)', opacity: '1' }
				},
				'pulse-glow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' }
				},
				'shimmer': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'slide-in-bottom': 'slide-in-bottom 0.4s ease-out',
				'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'shimmer': 'shimmer 2s infinite'
			},
			boxShadow: {
				'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
				'glass-hover': '0 10px 30px rgba(0, 0, 0, 0.15)',
				'glass-dark': '0 4px 30px rgba(0, 0, 0, 0.3)',
				'premium': '0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 10px 10px -5px rgba(59, 130, 246, 0.04)',
				'premium-dark': '0 10px 25px -5px rgba(0, 0, 0, 0.25), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
				'elevation-1': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
				'elevation-2': '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
				'elevation-3': '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
