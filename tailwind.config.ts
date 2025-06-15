
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
				// Paleta Primária (Azul Profissional)
				blue: {
					50: 'hsl(220, 100%, 97%)',
					100: 'hsl(220, 95%, 92%)',
					200: 'hsl(220, 90%, 85%)',
					300: 'hsl(220, 85%, 75%)',
					400: 'hsl(220, 80%, 65%)',
					500: 'hsl(220, 75%, 55%)',
					600: 'hsl(220, 70%, 45%)',
					700: 'hsl(220, 65%, 35%)',
					800: 'hsl(220, 60%, 25%)',
					900: 'hsl(220, 55%, 15%)',
				},
				// Paleta Secundária (Roxo Elegante)
				purple: {
					50: 'hsl(270, 100%, 97%)',
					100: 'hsl(270, 95%, 92%)',
					200: 'hsl(270, 90%, 85%)',
					300: 'hsl(270, 85%, 75%)',
					400: 'hsl(270, 80%, 65%)',
					500: 'hsl(270, 75%, 55%)',
					600: 'hsl(270, 70%, 45%)',
					700: 'hsl(270, 65%, 35%)',
					800: 'hsl(270, 60%, 25%)',
					900: 'hsl(270, 55%, 15%)',
				},
				// Paleta de Acento (Laranja Vibrante)
				orange: {
					50: 'hsl(30, 100%, 97%)',
					100: 'hsl(30, 95%, 92%)',
					200: 'hsl(30, 90%, 85%)',
					300: 'hsl(30, 85%, 75%)',
					400: 'hsl(30, 80%, 65%)',
					500: 'hsl(30, 75%, 55%)',
					600: 'hsl(30, 70%, 45%)',
					700: 'hsl(30, 65%, 35%)',
					800: 'hsl(30, 60%, 25%)',
					900: 'hsl(30, 55%, 15%)',
				},
				// Neutrals Sofisticados
				neutral: {
					50: 'hsl(210, 20%, 98%)',
					100: 'hsl(210, 15%, 95%)',
					200: 'hsl(210, 12%, 88%)',
					300: 'hsl(210, 10%, 78%)',
					400: 'hsl(210, 8%, 58%)',
					500: 'hsl(210, 6%, 45%)',
					600: 'hsl(210, 8%, 35%)',
					700: 'hsl(210, 10%, 25%)',
					800: 'hsl(210, 12%, 18%)',
					900: 'hsl(210, 15%, 12%)',
				},
				// Cores Semânticas do Sistema
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
				// Sidebar System Colors
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
				// Status Semântico
				status: {
					operational: 'hsl(var(--status-operational))',
					maintenance: 'hsl(var(--status-maintenance))',
					inactive: 'hsl(var(--status-inactive))',
					warning: 'hsl(var(--status-warning))'
				},
				// Cores Semânticas Globais
				success: {
					DEFAULT: 'hsl(142, 70%, 55%)',
					foreground: 'hsl(142, 65%, 45%)'
				},
				warning: {
					DEFAULT: 'hsl(45, 85%, 60%)',
					foreground: 'hsl(45, 80%, 50%)'
				},
				error: {
					DEFAULT: 'hsl(0, 70%, 55%)',
					foreground: 'hsl(0, 65%, 50%)'
				},
				info: {
					DEFAULT: 'hsl(200, 85%, 60%)',
					foreground: 'hsl(200, 80%, 50%)'
				}
			},
			backgroundImage: {
				// Gradientes Profissionais
				'gradient-primary': 'linear-gradient(135deg, hsl(220, 75%, 55%), hsl(270, 75%, 55%))',
				'gradient-secondary': 'linear-gradient(135deg, hsl(270, 75%, 55%), hsl(30, 75%, 55%))',
				'gradient-accent': 'linear-gradient(135deg, hsl(30, 75%, 55%), hsl(30, 70%, 45%))',
				'gradient-surface-light': 'linear-gradient(135deg, white, hsl(210, 20%, 98%))',
				'gradient-surface-dark': 'linear-gradient(135deg, hsl(210, 12%, 18%), hsl(210, 10%, 25%))',
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
				'fade-out': {
					from: { opacity: '1' },
					to: { opacity: '0' }
				},
				'slide-in-right': {
					from: { transform: 'translateX(100%)' },
					to: { transform: 'translateX(0)' }
				},
				'slide-in-left': {
					from: { transform: 'translateX(-100%)' },
					to: { transform: 'translateX(0)' }
				},
				'slide-in-bottom': {
					from: { transform: 'translateY(20px)', opacity: '0' },
					to: { transform: 'translateY(0)', opacity: '1' }
				},
				'count-up': {
					from: { transform: 'translateY(0)' },
					to: { transform: 'translateY(-100%)' }
				},
				'pulse-glow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'slide-in-right': 'slide-in-right 0.3s ease-out',
				'slide-in-left': 'slide-in-left 0.3s ease-out',
				'slide-in-bottom': 'slide-in-bottom 0.4s ease-out',
				'count-up': 'count-up 0.3s ease-out',
				'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
			},
			boxShadow: {
				'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
				'glass-hover': '0 10px 30px rgba(0, 0, 0, 0.15)',
				'glass-dark': '0 4px 30px rgba(0, 0, 0, 0.3)',
				'glass-dark-hover': '0 10px 30px rgba(0, 0, 0, 0.4)',
				'neo': '5px 5px 10px #d1d1d1, -5px -5px 10px #ffffff',
				'neo-pressed': 'inset 5px 5px 10px #d1d1d1, inset -5px -5px 10px #ffffff',
				'elevation-1': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
				'elevation-2': '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
				'elevation-3': '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
			},
			backdropBlur: {
				'xs': '2px',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
