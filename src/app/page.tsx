'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Sparkles,
  Heart,
  PartyPopper,
  Star,
  Copy,
  Trash2,
  Download,
  RefreshCw,
  Pin,
  Search,
  Wand2,
  Check,
  Gift,
  Cake,
  GraduationCap,
  HeartHandshake,
  Baby,
  Briefcase,
  Palette,
  Globe,
  Zap,
  Shield,
  Lock,
  Moon,
  Sun,
  Filter,
  ChevronUp,
  Undo2,
  Share2,
  X,
  Clock,
  Edit3,
  Save,
  XCircle,
  Plus,
  Minus,
  TreePine,
  Ghost,
  Leaf,
  Utensils,
  Wine,
  Type,
  User,
  Facebook,
  Twitter,
  Instagram,
  Accessibility,
  Eye,
  EyeOff,
  Type as TypeIcon,
  Settings,
  FileText,
  Cookie,
  AlertTriangle,
  Scale,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// Types
interface CardData {
  id: string;
  message: string;
  name: string;
  senderName: string;
  age: string;
  hobby: string;
  occasion: string;
  tone: string;
  creativity: string;
  theme: string;
  language: string;
  font: string;
  createdAt: Date;
  isPinned: boolean;
}

interface FormData {
  name: string;
  senderName: string;
  age: string;
  hobby: string;
  occasion: string;
  tone: string;
  creativity: number;
  theme: string;
  language: string;
  font: string;
}

interface UserPreferences {
  language: string;
  tone: string;
  theme: string;
  font: string;
  creativity: number;
}

interface AccessibilitySettings {
  fontSize: 'small' | 'normal' | 'large' | 'extra-large';
  highContrast: boolean;
  reducedMotion: boolean;
  dyslexiaFont: boolean;
}

// Constants - Extended Occasions
const OCCASIONS = [
  { value: 'Birthday', label: 'Birthday', icon: Cake, emoji: '🎂' },
  { value: 'Graduation', label: 'Graduation', icon: GraduationCap, emoji: '🎓' },
  { value: 'Anniversary', label: 'Anniversary', icon: HeartHandshake, emoji: '💕' },
  { value: 'Wedding', label: 'Wedding', icon: Heart, emoji: '💒' },
  { value: 'Baby Shower', label: 'Baby Shower', icon: Baby, emoji: '👶' },
  { value: 'Retirement', label: 'Retirement', icon: Briefcase, emoji: '🎊' },
  { value: 'Christmas', label: 'Christmas', icon: TreePine, emoji: '🎄' },
  { value: 'Valentine\'s Day', label: 'Valentine\'s Day', icon: Heart, emoji: '💝' },
  { value: 'Halloween', label: 'Halloween', icon: Ghost, emoji: '🎃' },
  { value: 'Thanksgiving', label: 'Thanksgiving', icon: Utensils, emoji: '🦃' },
  { value: 'New Year', label: 'New Year', icon: Wine, emoji: '🍾' },
  { value: 'Mother\'s Day', label: 'Mother\'s Day', icon: Heart, emoji: '🌷' },
  { value: 'Father\'s Day', label: 'Father\'s Day', icon: Briefcase, emoji: '👔' },
  { value: 'Get Well Soon', label: 'Get Well Soon', icon: Heart, emoji: '💐' },
  { value: 'Sympathy', label: 'Sympathy', icon: Heart, emoji: '🕊️' },
  { value: 'Thank You', label: 'Thank You', icon: Heart, emoji: '🙏' },
  { value: 'Congratulations', label: 'Congratulations', icon: PartyPopper, emoji: '🎉' },
  { value: 'Housewarming', label: 'Housewarming', icon: Gift, emoji: '🏠' },
];

const TONES = [
  { value: 'Funny', label: 'Funny', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' },
  { value: 'Sweet', label: 'Sweet', color: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300' },
  { value: 'Heartfelt', label: 'Heartfelt', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' },
  { value: 'Sarcastic', label: 'Sarcastic', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' },
  { value: 'Professional', label: 'Professional', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
  { value: 'Romantic', label: 'Romantic', color: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300' },
  { value: 'Inspirational', label: 'Inspirational', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' },
  { value: 'Casual', label: 'Casual', color: 'bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300' },
];

const CREATIVITY_LEVELS = [
  { value: 0, label: 'Safe', description: 'Traditional & family-friendly' },
  { value: 50, label: 'Moderate', description: 'Creative with personality' },
  { value: 100, label: 'Wild', description: 'Very unique & memorable' },
];

const THEMES = [
  { value: 'Party', label: 'Party', color: 'from-yellow-200 via-orange-200 to-pink-200', emoji: '🎉' },
  { value: 'Pastel Dream', label: 'Pastel Dream', color: 'from-pink-200 via-purple-200 to-blue-200', emoji: '✨' },
  { value: 'Dark Mode', label: 'Dark Mode', color: 'from-slate-700 via-purple-800 to-slate-800', emoji: '🌙' },
  { value: 'Neon', label: 'Neon', color: 'from-cyan-400 via-purple-500 to-pink-500', emoji: '💫' },
  { value: 'Nature', label: 'Nature', color: 'from-green-200 via-emerald-200 to-teal-200', emoji: '🌿' },
  { value: 'Ocean', label: 'Ocean', color: 'from-blue-200 via-cyan-200 to-teal-200', emoji: '🌊' },
  { value: 'Sunset', label: 'Sunset', color: 'from-orange-200 via-red-200 to-pink-200', emoji: '🌅' },
  { value: 'Galaxy', label: 'Galaxy', color: 'from-indigo-400 via-purple-500 to-pink-500', emoji: '🌌' },
];

const FONTS = [
  { value: 'Inter', label: 'Inter', style: 'font-sans', preview: 'Clean & Modern' },
  { value: 'Georgia', label: 'Georgia', style: 'font-serif', preview: 'Classic Elegance' },
  { value: 'Playfair Display', label: 'Playfair Display', style: 'font-serif', preview: 'Sophisticated' },
  { value: 'Poppins', label: 'Poppins', style: 'font-sans', preview: 'Friendly & Round' },
  { value: 'Roboto Mono', label: 'Roboto Mono', style: 'font-mono', preview: 'Tech & Modern' },
  { value: 'Dancing Script', label: 'Dancing Script', style: 'font-[cursive]', preview: 'Handwritten' },
];

const LANGUAGES = [
  { value: 'English', label: 'English', flag: '🇺🇸' },
  { value: 'Spanish', label: 'Español', flag: '🇪🇸' },
  { value: 'French', label: 'Français', flag: '🇫🇷' },
  { value: 'German', label: 'Deutsch', flag: '🇩🇪' },
  { value: 'Chinese', label: '中文', flag: '🇨🇳' },
  { value: 'Japanese', label: '日本語', flag: '🇯🇵' },
  { value: 'Portuguese', label: 'Português', flag: '🇧🇷' },
  { value: 'Italian', label: 'Italiano', flag: '🇮🇹' },
];

const FEATURES = [
  {
    icon: Wand2,
    title: 'AI-Powered Generation',
    description: 'Create unique, personalized cards with advanced AI that understands context and emotion.',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50 dark:bg-purple-950/30',
  },
  {
    icon: Globe,
    title: 'Multiple Languages',
    description: 'Generate cards in English, Spanish, French, German, Chinese, and more.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
  },
  {
    icon: Palette,
    title: 'Beautiful Themes',
    description: 'Choose from stunning themes like Party, Pastel Dream, Dark Mode, Neon, and more.',
    color: 'text-pink-500',
    bgColor: 'bg-pink-50 dark:bg-pink-950/30',
  },
  {
    icon: Type,
    title: 'Custom Fonts',
    description: 'Personalize your cards with a variety of beautiful fonts.',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50 dark:bg-indigo-950/30',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your data stays yours. We never store personal information on our servers.',
    color: 'text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-950/30',
  },
  {
    icon: Lock,
    title: 'Always Free',
    description: 'Create unlimited cards at no cost. No hidden fees or subscriptions.',
    color: 'text-teal-500',
    bgColor: 'bg-teal-50 dark:bg-teal-950/30',
  },
];

// Skeleton Loader Component
const SkeletonCard = () => (
  <div className="rounded-2xl overflow-hidden shadow-lg bg-slate-200 dark:bg-slate-800 animate-pulse">
    <div className="p-6 min-h-[240px]">
      <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-full mb-2"></div>
      <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-5/6 mb-2"></div>
      <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-2/3"></div>
    </div>
    <div className="p-4 flex gap-2">
      <div className="h-6 w-16 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
      <div className="h-6 w-16 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
    </div>
  </div>
);

// Confetti Component
const Confetti = ({ active }: { active: boolean }) => {
  const [pieces, setPieces] = useState<Array<{ id: number; x: number; color: string; delay: number }>>([]);

  useEffect(() => {
    if (active) {
      const newPieces = Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4'][Math.floor(Math.random() * 6)],
        delay: Math.random() * 0.5,
      }));
      setPieces(newPieces);
      const timer = setTimeout(() => setPieces([]), 3500);
      return () => clearTimeout(timer);
    }
  }, [active]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{ y: -20, x: `${piece.x}vw`, rotate: 0, opacity: 1 }}
          animate={{
            y: '100vh',
            rotate: Math.random() * 720 - 360,
            opacity: 0,
          }}
          transition={{
            duration: 2.5 + Math.random(),
            delay: piece.delay,
            ease: 'easeIn',
          }}
          className="absolute w-3 h-3 rounded-sm"
          style={{ backgroundColor: piece.color }}
        />
      ))}
    </div>
  );
};

// Floating Elements
const FloatingElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute top-20 left-[10%] text-6xl opacity-20"
      animate={{ y: [0, -30, 0], rotate: [0, 10, -10, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    >
      🎂
    </motion.div>
    <motion.div
      className="absolute top-40 right-[15%] text-5xl opacity-20"
      animate={{ y: [0, 20, -10, 0], rotate: [0, -15, 15, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
    >
      🎁
    </motion.div>
    <motion.div
      className="absolute bottom-40 left-[20%] text-4xl opacity-20"
      animate={{ y: [0, -15, 25, 0], x: [0, 10, -5, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
    >
      🎈
    </motion.div>
    <motion.div
      className="absolute bottom-60 right-[25%] text-5xl opacity-20"
      animate={{ y: [0, 20, -20, 0], rotate: [0, 20, -20, 0] }}
      transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
    >
      🎉
    </motion.div>
    <motion.div
      className="absolute top-1/3 left-[5%] text-3xl opacity-15"
      animate={{ y: [0, -25, 15, 0], rotate: [0, -10, 10, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
    >
      ✨
    </motion.div>
    <motion.div
      className="absolute top-1/2 right-[8%] text-4xl opacity-15"
      animate={{ y: [0, 15, -20, 0], x: [0, -10, 5, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
    >
      💝
    </motion.div>
  </div>
);

// Sticky Navigation Component
const StickyNav = ({
  isDark,
  toggleDark,
  scrolled,
}: {
  isDark: boolean;
  toggleDark: () => void;
  scrolled: boolean;
}) => (
  <motion.nav
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    className={cn(
      'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
      scrolled
        ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg shadow-lg'
        : 'bg-transparent'
    )}
  >
    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <Gift className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-xl dark:text-white">CardGen AI</span>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
          className="hidden sm:flex dark:text-slate-200"
        >
          Create Card
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
          className="hidden sm:flex dark:text-slate-200"
        >
          Gallery
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDark}
          className="rounded-full dark:text-slate-200"
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
      </div>
    </div>
  </motion.nav>
);

// Scroll to Top Button
const ScrollToTop = ({ show }: { show: boolean }) => (
  <AnimatePresence>
    {show && (
      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary text-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-6 h-6" />
      </motion.button>
    )}
  </AnimatePresence>
);

// Accessibility Settings Panel
const AccessibilityPanel = ({
  settings,
  onSettingsChange,
  isOpen,
  onToggle,
}: {
  settings: AccessibilitySettings;
  onSettingsChange: (settings: AccessibilitySettings) => void;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const fontSizes = [
    { value: 'small', label: 'Small', icon: 'A' },
    { value: 'normal', label: 'Normal', icon: 'A' },
    { value: 'large', label: 'Large', icon: 'A' },
    { value: 'extra-large', label: 'X-Large', icon: 'A' },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {/* Toggle Button */}
      <Button
        onClick={onToggle}
        className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg hover:scale-110 transition-transform"
        aria-label={isOpen ? 'Close accessibility settings' : 'Open accessibility settings'}
        aria-expanded={isOpen}
        aria-controls="accessibility-panel"
      >
        <Accessibility className="w-6 h-6" />
      </Button>

      {/* Settings Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="accessibility-panel"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-16 left-0 w-72 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 p-4"
            role="dialog"
            aria-label="Accessibility settings"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <Accessibility className="w-5 h-5" />
                Accessibility
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="h-6 w-6 p-0"
                aria-label="Close accessibility settings"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Font Size */}
            <div className="space-y-2 mb-4">
              <Label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <TypeIcon className="w-4 h-4" />
                Text Size
              </Label>
              <div className="grid grid-cols-4 gap-1">
                {fontSizes.map((size) => (
                  <button
                    key={size.value}
                    onClick={() => onSettingsChange({ ...settings, fontSize: size.value as AccessibilitySettings['fontSize'] })}
                    className={cn(
                      'py-2 rounded-lg text-sm font-medium transition-all',
                      'focus:outline-none focus:ring-2 focus:ring-purple-500',
                      settings.fontSize === size.value
                        ? 'bg-purple-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                    )}
                    style={{ fontSize: size.value === 'small' ? '0.75rem' : size.value === 'large' ? '1rem' : size.value === 'extra-large' ? '1.125rem' : '0.875rem' }}
                    aria-pressed={settings.fontSize === size.value}
                    aria-label={`Set text size to ${size.label}`}
                  >
                    {size.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* High Contrast */}
            <div className="flex items-center justify-between py-2 border-t border-slate-200 dark:border-slate-700">
              <Label htmlFor="high-contrast" className="text-sm text-slate-700 dark:text-slate-300 flex items-center gap-2 cursor-pointer">
                <Eye className="w-4 h-4" />
                High Contrast
              </Label>
              <button
                id="high-contrast"
                role="switch"
                aria-checked={settings.highContrast}
                onClick={() => onSettingsChange({ ...settings, highContrast: !settings.highContrast })}
                className={cn(
                  'relative w-11 h-6 rounded-full transition-colors',
                  'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
                  settings.highContrast ? 'bg-purple-500' : 'bg-slate-300 dark:bg-slate-600'
                )}
              >
                <span
                  className={cn(
                    'absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow',
                    settings.highContrast && 'translate-x-5'
                  )}
                />
              </button>
            </div>

            {/* Reduced Motion */}
            <div className="flex items-center justify-between py-2 border-t border-slate-200 dark:border-slate-700">
              <Label htmlFor="reduced-motion" className="text-sm text-slate-700 dark:text-slate-300 flex items-center gap-2 cursor-pointer">
                <Zap className="w-4 h-4" />
                Reduce Motion
              </Label>
              <button
                id="reduced-motion"
                role="switch"
                aria-checked={settings.reducedMotion}
                onClick={() => onSettingsChange({ ...settings, reducedMotion: !settings.reducedMotion })}
                className={cn(
                  'relative w-11 h-6 rounded-full transition-colors',
                  'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
                  settings.reducedMotion ? 'bg-purple-500' : 'bg-slate-300 dark:bg-slate-600'
                )}
              >
                <span
                  className={cn(
                    'absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow',
                    settings.reducedMotion && 'translate-x-5'
                  )}
                />
              </button>
            </div>

            {/* Dyslexia-Friendly Font */}
            <div className="flex items-center justify-between py-2 border-t border-slate-200 dark:border-slate-700">
              <Label htmlFor="dyslexia-font" className="text-sm text-slate-700 dark:text-slate-300 flex items-center gap-2 cursor-pointer">
                <TypeIcon className="w-4 h-4" />
                Dyslexia Font
              </Label>
              <button
                id="dyslexia-font"
                role="switch"
                aria-checked={settings.dyslexiaFont}
                onClick={() => onSettingsChange({ ...settings, dyslexiaFont: !settings.dyslexiaFont })}
                className={cn(
                  'relative w-11 h-6 rounded-full transition-colors',
                  'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
                  settings.dyslexiaFont ? 'bg-purple-500' : 'bg-slate-300 dark:bg-slate-600'
                )}
              >
                <span
                  className={cn(
                    'absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow',
                    settings.dyslexiaFont && 'translate-x-5'
                  )}
                />
              </button>
            </div>

            {/* Reset Button */}
            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => onSettingsChange({
                  fontSize: 'normal',
                  highContrast: false,
                  reducedMotion: false,
                  dyslexiaFont: false,
                })}
              >
                Reset to Defaults
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Theme Preview Component
const ThemePreview = ({
  theme,
  selected,
  onClick,
}: {
  theme: typeof THEMES[0];
  selected: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'relative overflow-hidden rounded-xl p-3 transition-all duration-300',
      'hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-slate-900',
      selected ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-slate-900 scale-105' : ''
    )}
    aria-pressed={selected}
    aria-label={`Select ${theme.label} theme`}
  >
    <div
      className={cn(
        'absolute inset-0 bg-gradient-to-br',
        theme.color,
        theme.value === 'Dark Mode' || theme.value === 'Neon' || theme.value === 'Galaxy' ? 'opacity-100' : 'opacity-80'
      )}
    />
    <div className="relative z-10 flex flex-col items-center gap-1">
      <span className="text-xl">{theme.emoji}</span>
      <span
        className={cn(
          'text-xs font-medium',
          theme.value === 'Dark Mode' || theme.value === 'Neon' || theme.value === 'Galaxy' ? 'text-white' : 'text-slate-700'
        )}
      >
        {theme.label}
      </span>
    </div>
    {selected && (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute top-1 right-1 bg-primary text-white rounded-full p-0.5"
      >
        <Check className="w-3 h-3" />
      </motion.div>
    )}
  </button>
);

// Font Preview Component
const FontPreview = ({
  font,
  selected,
  onClick,
}: {
  font: typeof FONTS[0];
  selected: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'relative overflow-hidden rounded-lg p-3 transition-all duration-300 border',
      'hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-slate-900',
      selected 
        ? 'border-primary bg-primary/5 dark:bg-primary/10 ring-2 ring-primary ring-offset-2 dark:ring-offset-slate-900' 
        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
    )}
    aria-pressed={selected}
    aria-label={`Select ${font.label} font`}
  >
    <div className={cn('text-sm font-medium dark:text-white', font.style)}>
      {font.label}
    </div>
    <div className={cn('text-xs text-slate-500 dark:text-slate-400 mt-1', font.style)}>
      {font.preview}
    </div>
    {selected && (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute top-1 right-1 bg-primary text-white rounded-full p-0.5"
      >
        <Check className="w-3 h-3" />
      </motion.div>
    )}
  </button>
);

// Format relative time
const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
};

// Social Media Share Icons Component
const SocialShareButtons = ({
  card,
  isDark,
}: {
  card: CardData;
  isDark: boolean;
}) => {
  const shareText = `${card.message}\n\n— ${card.senderName}`;
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const socialPlatforms = [
    {
      name: 'WhatsApp',
      icon: () => (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      color: 'bg-green-500 hover:bg-green-600',
      getUrl: () => `https://wa.me/?text=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700',
      getUrl: () => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'X',
      icon: Twitter,
      color: 'bg-slate-800 hover:bg-slate-900',
      getUrl: () => `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'Instagram',
      icon: Instagram,
      color: 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600',
      getUrl: () => `https://www.instagram.com/`,
    },
    {
      name: 'TikTok',
      icon: () => (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
        </svg>
      ),
      color: 'bg-black hover:bg-gray-800',
      getUrl: () => `https://www.tiktok.com/`,
    },
    {
      name: 'Snapchat',
      icon: () => (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
          <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z"/>
        </svg>
      ),
      color: 'bg-yellow-400 hover:bg-yellow-500',
      getUrl: () => `https://www.snapchat.com/`,
    },
  ];

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {socialPlatforms.map((platform) => {
        const IconComponent = platform.icon;
        return (
          <TooltipProvider key={platform.name}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => window.open(platform.getUrl(), '_blank', 'noopener,noreferrer')}
                  className={cn(
                    'h-7 w-7 p-0 text-white',
                    platform.color
                  )}
                >
                  {typeof IconComponent === 'function' && 'prototype' in IconComponent ? (
                    <IconComponent className="w-4 h-4" />
                  ) : (
                    <IconComponent />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Share on {platform.name}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );
};

// Generated Card Component
const GeneratedCard = ({
  card,
  onCopy,
  onPin,
  onRegenerate,
  onDelete,
  onExport,
  onShare,
  onEdit,
  isRegenerating,
  isEditing,
  editMessage,
  onEditChange,
  onEditSave,
  onEditCancel,
}: {
  card: CardData;
  onCopy: () => void;
  onPin: () => void;
  onRegenerate: () => void;
  onDelete: () => void;
  onExport: () => void;
  onShare: () => void;
  onEdit: () => void;
  isRegenerating: boolean;
  isEditing: boolean;
  editMessage: string;
  onEditChange: (value: string) => void;
  onEditSave: () => void;
  onEditCancel: () => void;
}) => {
  const theme = THEMES.find((t) => t.value === card.theme) || THEMES[0];
  const font = FONTS.find((f) => f.value === card.font) || FONTS[0];
  const isDark = card.theme === 'Dark Mode' || card.theme === 'Neon' || card.theme === 'Galaxy';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className={cn('relative rounded-2xl overflow-hidden shadow-lg group', card.isPinned && 'ring-2 ring-amber-400')}
    >
      {/* Card Background */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br',
          theme.color,
          isDark ? 'opacity-100' : 'opacity-90'
        )}
      />

      {/* Pin Indicator */}
      {card.isPinned && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 left-3 z-10"
        >
          <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
        </motion.div>
      )}

      {/* Timestamp */}
      <div className="absolute top-3 right-3 z-10">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="secondary" className={cn(
                'text-xs',
                isDark ? 'bg-white/20 text-white' : 'bg-white/70 text-slate-600'
              )}>
                <Clock className="w-3 h-3 mr-1" />
                {formatRelativeTime(new Date(card.createdAt))}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              {new Date(card.createdAt).toLocaleString()}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Card Content */}
      <div className={cn('relative p-6 pt-10', isDark ? 'text-white' : 'text-slate-800')}>
        <div className="min-h-[180px] flex flex-col justify-center">
          {isEditing ? (
            <div className="space-y-3">
              <Textarea
                value={editMessage}
                onChange={(e) => onEditChange(e.target.value)}
                className={cn(
                  'min-h-[120px] resize-none',
                  font.style,
                  isDark ? 'bg-white/20 border-white/30 text-white placeholder:text-white/50' : 'bg-white/50'
                )}
                placeholder="Edit your message..."
              />
              <div className="flex gap-2 justify-end">
                <Button size="sm" variant="ghost" onClick={onEditCancel} className="h-8">
                  <XCircle className="w-4 h-4 mr-1" />
                  Cancel
                </Button>
                <Button size="sm" onClick={onEditSave} className="h-8 bg-green-500 hover:bg-green-600">
                  <Save className="w-4 h-4 mr-1" />
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <>
              <p className={cn('text-sm leading-relaxed whitespace-pre-wrap', font.style)}>{card.message}</p>
              {/* Sender Name */}
              {card.senderName && (
                <div className={cn(
                  'mt-4 pt-3 border-t border-white/20 text-right',
                  font.style
                )}>
                  <p className={cn(
                    'text-sm italic opacity-80',
                  )}>
                    — {card.senderName} 💝
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Card Meta */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/20">
          <Badge variant="secondary" className={cn(isDark ? 'bg-white/20 text-white' : 'bg-white/50')}>
            {OCCASIONS.find(o => o.value === card.occasion)?.emoji} {card.occasion}
          </Badge>
          <Badge variant="secondary" className={cn(isDark ? 'bg-white/20 text-white' : 'bg-white/50')}>
            {card.tone}
          </Badge>
          <Badge variant="secondary" className={cn(isDark ? 'bg-white/20 text-white' : 'bg-white/50')}>
            {card.language}
          </Badge>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onCopy}
                  className={cn('h-8 w-8 p-0', isDark ? 'text-white hover:bg-white/20' : 'text-slate-700 hover:bg-white/50')}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onEdit}
                  className={cn('h-8 w-8 p-0', isDark ? 'text-white hover:bg-white/20' : 'text-slate-700 hover:bg-white/50')}
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onShare}
                  className={cn('h-8 w-8 p-0', isDark ? 'text-white hover:bg-white/20' : 'text-slate-700 hover:bg-white/50')}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Native Share</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onPin}
                  className={cn(
                    'h-8 w-8 p-0',
                    card.isPinned ? 'text-amber-400' : isDark ? 'text-white hover:bg-white/20' : 'text-slate-700 hover:bg-white/50'
                  )}
                >
                  <Pin className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{card.isPinned ? 'Unpin' : 'Pin'}</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onRegenerate}
                  disabled={isRegenerating}
                  className={cn('h-8 w-8 p-0', isDark ? 'text-white hover:bg-white/20' : 'text-slate-700 hover:bg-white/50')}
                >
                  <RefreshCw className={cn('w-4 h-4', isRegenerating && 'animate-spin')} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Regenerate</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onExport}
                  className={cn('h-8 w-8 p-0', isDark ? 'text-white hover:bg-white/20' : 'text-slate-700 hover:bg-white/50')}
                >
                  <Download className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Export</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onDelete}
                  className="h-8 w-8 p-0 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Social Media Share Buttons */}
        <div className="flex items-center justify-center mt-3 pt-3 border-t border-white/10">
          <span className={cn('text-xs mr-2', isDark ? 'text-white/60' : 'text-slate-600')}>Share:</span>
          <SocialShareButtons card={card} isDark={isDark} />
        </div>
      </div>
    </motion.div>
  );
};

// Main Page Component
export default function BirthdayCardGenerator() {
  const { toast } = useToast();
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    senderName: '',
    age: '',
    hobby: '',
    occasion: 'Birthday',
    tone: 'Heartfelt',
    creativity: 50,
    theme: 'Party',
    language: 'English',
    font: 'Inter',
  });

  const [cards, setCards] = useState<CardData[]>([]);
  const [deletedCard, setDeletedCard] = useState<CardData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPinned, setFilterPinned] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [regeneratingId, setRegeneratingId] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [showSkeletons, setShowSkeletons] = useState(true);
  const [batchCount, setBatchCount] = useState(1);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [editMessage, setEditMessage] = useState('');
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const [showPreferencesDialog, setShowPreferencesDialog] = useState(false);
  const [accessibilitySettings, setAccessibilitySettings] = useState<AccessibilitySettings>({
    fontSize: 'normal',
    highContrast: false,
    reducedMotion: false,
    dyslexiaFont: false,
  });
  const [showAccessibilityPanel, setShowAccessibilityPanel] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Dark mode toggle
  const toggleDark = useCallback(() => {
    setIsDark((prev) => {
      const newValue = !prev;
      document.documentElement.classList.toggle('dark', newValue);
      localStorage.setItem('darkMode', String(newValue));
      return newValue;
    });
  }, []);

  // Initialize dark mode and user preferences from localStorage
  useEffect(() => {
    const savedDark = localStorage.getItem('darkMode');
    if (savedDark !== null) {
      const isDarkMode = savedDark === 'true';
      setIsDark(isDarkMode);
      document.documentElement.classList.toggle('dark', isDarkMode);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }

    // Load user preferences
    const savedPrefs = localStorage.getItem('userPreferences');
    if (savedPrefs) {
      try {
        const prefs = JSON.parse(savedPrefs) as UserPreferences;
        setUserPreferences(prefs);
        setFormData(prev => ({
          ...prev,
          language: prefs.language,
          tone: prefs.tone,
          theme: prefs.theme,
          font: prefs.font,
          creativity: prefs.creativity,
        }));
      } catch {
        // Ignore parse errors
      }
    }

    // Load accessibility settings
    const savedA11y = localStorage.getItem('accessibilitySettings');
    if (savedA11y) {
      try {
        const a11y = JSON.parse(savedA11y) as AccessibilitySettings;
        setAccessibilitySettings(a11y);
      } catch {
        // Ignore parse errors
      }
    }

    // Check system preferences for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setAccessibilitySettings(prev => ({ ...prev, reducedMotion: true }));
    }
  }, []);

  // Save user preferences when form data changes
  useEffect(() => {
    if (isMounted) {
      const prefs: UserPreferences = {
        language: formData.language,
        tone: formData.tone,
        theme: formData.theme,
        font: formData.font,
        creativity: formData.creativity,
      };
      localStorage.setItem('userPreferences', JSON.stringify(prefs));
      setUserPreferences(prefs);
    }
  }, [formData.language, formData.tone, formData.theme, formData.font, formData.creativity, isMounted]);

  // Save and apply accessibility settings
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('accessibilitySettings', JSON.stringify(accessibilitySettings));
    }

    // Apply font size class
    const html = document.documentElement;
    html.classList.remove('font-size-small', 'font-size-normal', 'font-size-large', 'font-size-extra-large');
    html.classList.add(`font-size-${accessibilitySettings.fontSize}`);

    // Apply high contrast
    html.classList.toggle('high-contrast', accessibilitySettings.highContrast);

    // Apply reduced motion
    html.classList.toggle('reduced-motion', accessibilitySettings.reducedMotion);

    // Apply dyslexia-friendly font
    html.classList.toggle('dyslexia-friendly', accessibilitySettings.dyslexiaFont);
  }, [accessibilitySettings, isMounted]);

  // Handler for accessibility settings change
  const handleAccessibilityChange = useCallback((newSettings: AccessibilitySettings) => {
    setAccessibilitySettings(newSettings);
  }, []);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hydration fix
  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => setShowSkeletons(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Load cards from localStorage
  useEffect(() => {
    if (isMounted) {
      const savedCards = localStorage.getItem('birthdayCards');
      if (savedCards) {
        try {
          const parsed = JSON.parse(savedCards);
          setCards(parsed.map((c: CardData) => ({
            ...c,
            createdAt: new Date(c.createdAt),
          })));
        } catch {
          // Ignore parse errors
        }
      }
    }
  }, [isMounted]);

  // Save cards to localStorage
  useEffect(() => {
    if (isMounted && cards.length > 0) {
      localStorage.setItem('birthdayCards', JSON.stringify(cards));
    }
  }, [cards, isMounted]);

  // Generate single card
  const generateSingleCard = useCallback(async (data: FormData): Promise<CardData | null> => {
    const creativityLabel = CREATIVITY_LEVELS.reduce((prev, curr) =>
      Math.abs(curr.value - data.creativity) < Math.abs(prev.value - data.creativity) ? curr : prev
    ).label;

    try {
      const response = await fetch('/api/generate-card', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          senderName: data.senderName,
          age: data.age,
          hobby: data.hobby,
          occasion: data.occasion,
          tone: data.tone,
          creativity: creativityLabel,
          theme: data.theme,
          language: data.language,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to generate card');
      }

      return {
        id: `card-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        message: responseData.message,
        name: data.name,
        senderName: data.senderName,
        age: data.age,
        hobby: data.hobby,
        occasion: data.occasion,
        tone: data.tone,
        creativity: creativityLabel,
        theme: data.theme,
        language: data.language,
        font: data.font,
        createdAt: new Date(),
        isPinned: false,
      };
    } catch (error) {
      console.error('Card generation error:', error);
      return null;
    }
  }, []);

  // Generate card(s) - supports batch
  const generateCards = useCallback(async () => {
    if (!formData.name.trim()) {
      toast({
        title: 'Name required',
        description: 'Please enter a recipient name for the card.',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.senderName.trim()) {
      toast({
        title: 'Your name required',
        description: 'Please enter your name (sender) for the card.',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    const generatedCards: CardData[] = [];

    for (let i = 0; i < batchCount; i++) {
      const card = await generateSingleCard(formData);
      if (card) {
        generatedCards.push(card);
      }
    }

    if (generatedCards.length > 0) {
      setCards((prev) => [...generatedCards.reverse(), ...prev]);
      
      if (batchCount === 1) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3500);
      }

      toast({
        title: `${generatedCards.length} card${generatedCards.length > 1 ? 's' : ''} created! 🎉`,
        description: 'Powered by Groq AI - Your personalized card(s) are ready!',
      });
    } else {
      toast({
        title: 'Generation failed',
        description: 'Failed to generate cards. Please try again.',
        variant: 'destructive',
      });
    }

    setIsGenerating(false);
  }, [formData, batchCount, generateSingleCard, toast]);

  // Regenerate card
  const regenerateCard = useCallback(async (card: CardData) => {
    setRegeneratingId(card.id);

    try {
      const response = await fetch('/api/generate-card', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: card.name,
          senderName: card.senderName,
          age: card.age,
          hobby: card.hobby,
          occasion: card.occasion,
          tone: card.tone,
          creativity: card.creativity,
          theme: card.theme,
          language: card.language,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to regenerate card');
      }

      setCards((prev) =>
        prev.map((c) =>
          c.id === card.id ? { ...c, message: data.message, createdAt: new Date() } : c
        )
      );

      toast({
        title: 'Card regenerated! ✨',
        description: 'A new message has been generated.',
      });
    } catch (error) {
      toast({
        title: 'Regeneration failed',
        description: error instanceof Error ? error.message : 'Something went wrong.',
        variant: 'destructive',
      });
    } finally {
      setRegeneratingId(null);
    }
  }, [toast]);

  // Card actions
  const copyCard = useCallback((card: CardData) => {
    const textToCopy = `${card.message}\n\n— ${card.senderName}`;
    navigator.clipboard.writeText(textToCopy);
    toast({ title: 'Copied! 📋', description: 'Card message copied to clipboard.' });
  }, [toast]);

  const shareCard = useCallback(async (card: CardData) => {
    const shareText = `${card.message}\n\n— ${card.senderName}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Card for ${card.name}`,
          text: shareText,
        });
      } catch {
        // User cancelled share
      }
    } else {
      copyCard(card);
      toast({ title: 'Copied for sharing! 📤', description: 'Share the copied message anywhere.' });
    }
  }, [copyCard, toast]);

  const pinCard = useCallback((id: string) => {
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isPinned: !c.isPinned } : c))
    );
    toast({
      title: 'Pin toggled! 📌',
      description: 'Card pin status updated.',
    });
  }, [toast]);

  const deleteCard = useCallback((card: CardData) => {
    setDeletedCard(card);
    setCards((prev) => prev.filter((c) => c.id !== card.id));
    
    toast({
      title: 'Card deleted',
      description: 'Card removed. Click undo to restore.',
      action: (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            if (deletedCard) {
              setCards((prev) => [deletedCard, ...prev]);
              setDeletedCard(null);
              toast({ title: 'Card restored! ↩️' });
            }
          }}
        >
          <Undo2 className="w-4 h-4 mr-1" />
          Undo
        </Button>
      ),
    });
  }, [deletedCard, toast]);

  const exportCard = useCallback((card: CardData) => {
    const exportData = {
      message: card.message,
      metadata: {
        recipientName: card.name,
        senderName: card.senderName,
        occasion: card.occasion,
        tone: card.tone,
        theme: card.theme,
        language: card.language,
        font: card.font,
        createdAt: card.createdAt,
      },
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `card-${card.name.toLowerCase().replace(/\s+/g, '-')}-${card.occasion.toLowerCase().replace(/\s+/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({ title: 'Exported! 💾', description: 'Card data has been downloaded.' });
  }, [toast]);

  const startEditCard = useCallback((card: CardData) => {
    setEditingCardId(card.id);
    setEditMessage(card.message);
  }, []);

  const saveEditCard = useCallback((id: string) => {
    if (editMessage.trim()) {
      setCards((prev) =>
        prev.map((c) => (c.id === id ? { ...c, message: editMessage } : c))
      );
      toast({ title: 'Card updated! ✏️', description: 'Your changes have been saved.' });
    }
    setEditingCardId(null);
    setEditMessage('');
  }, [editMessage, toast]);

  const cancelEdit = useCallback(() => {
    setEditingCardId(null);
    setEditMessage('');
  }, []);

  const clearAllCards = useCallback(() => {
    setCards([]);
    localStorage.removeItem('birthdayCards');
    setShowClearConfirm(false);
    toast({ title: 'Cleared', description: 'All cards have been removed.' });
  }, [toast]);

  // Filtered cards
  const filteredCards = cards.filter((card) => {
    const matchesSearch =
      card.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPinned = !filterPinned || card.isPinned;
    return matchesSearch && matchesPinned;
  });

  // Group cards by date for history
  const groupedCards = filteredCards.reduce((groups, card) => {
    const date = new Date(card.createdAt).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(card);
    return groups;
  }, {} as Record<string, CardData[]>);

  // Pinned cards count
  const pinnedCount = cards.filter((c) => c.isPinned).length;

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className={cn('min-h-screen gradient-bg dark:from-slate-900 dark:via-slate-800 dark:to-slate-900')}>
      {/* Skip to Main Content Link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <StickyNav isDark={isDark} toggleDark={toggleDark} scrolled={scrolled} />
      <Confetti active={showConfetti} />
      <ScrollToTop show={showScrollTop} />
      <AccessibilityPanel
        settings={accessibilitySettings}
        onSettingsChange={handleAccessibilityChange}
        isOpen={showAccessibilityPanel}
        onToggle={() => setShowAccessibilityPanel(!showAccessibilityPanel)}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20">
        <FloatingElements />
        <div className="hero-gradient dark:from-slate-900/50 dark:via-purple-900/20 dark:to-slate-900/50">
          <div className="container mx-auto px-4 pt-16 pb-20 md:pt-24 md:pb-28">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm dark:bg-slate-800">
                  <Sparkles className="w-4 h-4 mr-2 text-amber-500" />
                  Powered by Groq AI
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              >
                Create{' '}
                <span className="gradient-text">Personalized</span>
                <br />
                Greeting Cards with AI
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto"
              >
                Generate beautiful, heartfelt messages for any occasion.
                Lightning-fast AI powered by Groq with customization options.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap items-center justify-center gap-4 mb-12"
              >
                <Button
                  size="lg"
                  className="btn-primary px-8 py-6 text-lg"
                  onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Wand2 className="w-5 h-5 mr-2" />
                  Create Your Card
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-lg dark:border-slate-600 dark:text-slate-200"
                  onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <PartyPopper className="w-5 h-5 mr-2" />
                  View Gallery
                </Button>
              </motion.div>

              {/* Social Proof */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400"
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {['🎂', '🎄', '💝', '🎓'].map((emoji, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm ring-2 ring-white dark:ring-slate-800"
                      >
                        {emoji}
                      </div>
                    ))}
                  </div>
                  <span>18+ Occasions</span>
                </div>
                <Separator orientation="vertical" className="h-5 hidden sm:block" />
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-1">4.9/5 rating</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 md:h-24">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              className="fill-white dark:fill-slate-900"
              fillOpacity="0.9"
            />
          </svg>
        </div>
      </section>

      {/* Generator Section */}
      <section id="generator" className="py-16 md:py-24 bg-white dark:bg-slate-900" role="main">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Form Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="glass dark:bg-slate-800/50 border-0 shadow-xl dark:border dark:border-slate-700">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl flex items-center gap-2 dark:text-white">
                      <Gift className="w-6 h-6 text-primary" />
                      Card Details
                    </CardTitle>
                    {userPreferences && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge variant="outline" className="text-xs dark:border-slate-600 dark:text-slate-400">
                              <Clock className="w-3 h-3 mr-1" />
                              Preferences Saved
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            Your preferences are automatically saved
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                  <p className="text-slate-500 dark:text-slate-400">
                    Fill in the details below to generate your personalized card.
                  </p>
                </CardHeader>
                <CardContent className="space-y-5">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base font-medium dark:text-slate-200">
                      Recipient's Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter recipient's name..."
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-12 input-glow dark:bg-slate-800 dark:border-slate-600 dark:text-white transition-shadow"
                      aria-required
                    />
                  </div>

                  {/* Sender Name */}
                  <div className="space-y-2">
                    <Label htmlFor="senderName" className="text-base font-medium dark:text-slate-200">
                      Your Name (Sender) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="senderName"
                      placeholder="Enter your name..."
                      value={formData.senderName}
                      onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                      className="h-12 input-glow dark:bg-slate-800 dark:border-slate-600 dark:text-white transition-shadow"
                      aria-required
                    />
                  </div>

                  {/* Age & Hobby */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="age" className="text-base font-medium dark:text-slate-200">
                        Age (optional)
                      </Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="Age..."
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        className="h-12 input-glow dark:bg-slate-800 dark:border-slate-600 dark:text-white transition-shadow"
                        min="0"
                        max="150"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hobby" className="text-base font-medium dark:text-slate-200">
                        Hobby/Interest
                      </Label>
                      <Input
                        id="hobby"
                        placeholder="e.g., cooking, music..."
                        value={formData.hobby}
                        onChange={(e) => setFormData({ ...formData, hobby: e.target.value })}
                        className="h-12 input-glow dark:bg-slate-800 dark:border-slate-600 dark:text-white transition-shadow"
                      />
                    </div>
                  </div>

                  {/* Occasion & Language */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-base font-medium dark:text-slate-200">Occasion</Label>
                      <Select
                        value={formData.occasion}
                        onValueChange={(value) => setFormData({ ...formData, occasion: value })}
                      >
                        <SelectTrigger className="h-12 input-glow dark:bg-slate-800 dark:border-slate-600 dark:text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-slate-800 dark:border-slate-600 max-h-60">
                          {OCCASIONS.map((occ) => (
                            <SelectItem key={occ.value} value={occ.value}>
                              <div className="flex items-center gap-2">
                                <span>{occ.emoji}</span>
                                {occ.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-base font-medium dark:text-slate-200">Language</Label>
                      <Select
                        value={formData.language}
                        onValueChange={(value) => setFormData({ ...formData, language: value })}
                      >
                        <SelectTrigger className="h-12 input-glow dark:bg-slate-800 dark:border-slate-600 dark:text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-slate-800 dark:border-slate-600">
                          {LANGUAGES.map((lang) => (
                            <SelectItem key={lang.value} value={lang.value}>
                              <span className="flex items-center gap-2">
                                <span>{lang.flag}</span>
                                {lang.label}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Tone */}
                  <div className="space-y-3">
                    <Label className="text-base font-medium dark:text-slate-200">Message Tone</Label>
                    <div className="flex flex-wrap gap-2">
                      {TONES.map((tone) => (
                        <button
                          key={tone.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, tone: tone.value })}
                          className={cn(
                            'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
                            'hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-slate-800',
                            formData.tone === tone.value
                              ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-slate-800 scale-105'
                              : '',
                            tone.color
                          )}
                          aria-pressed={formData.tone === tone.value}
                        >
                          {tone.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Creativity Slider */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-base font-medium dark:text-slate-200">Creativity Level</Label>
                      <Badge variant="secondary" className="px-3 py-1 dark:bg-slate-700">
                        {CREATIVITY_LEVELS.reduce((prev, curr) =>
                          Math.abs(curr.value - formData.creativity) < Math.abs(prev.value - formData.creativity)
                            ? curr
                            : prev
                        ).label}
                      </Badge>
                    </div>
                    <Slider
                      value={[formData.creativity]}
                      onValueChange={(value) => setFormData({ ...formData, creativity: value[0] })}
                      max={100}
                      step={1}
                      className="py-4"
                      aria-label="Creativity level"
                    />
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>🛡️ Safe</span>
                      <span>⚡ Moderate</span>
                      <span>🚀 Wild</span>
                    </div>
                  </div>

                  {/* Theme Selection */}
                  <div className="space-y-3">
                    <Label className="text-base font-medium dark:text-slate-200">Card Theme</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {THEMES.map((theme) => (
                        <ThemePreview
                          key={theme.value}
                          theme={theme}
                          selected={formData.theme === theme.value}
                          onClick={() => setFormData({ ...formData, theme: theme.value })}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Font Selection */}
                  <div className="space-y-3">
                    <Label className="text-base font-medium dark:text-slate-200">Card Font</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {FONTS.map((font) => (
                        <FontPreview
                          key={font.value}
                          font={font}
                          selected={formData.font === font.value}
                          onClick={() => setFormData({ ...formData, font: font.value })}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Batch Generation */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-base font-medium dark:text-slate-200">Generate Multiple Cards</Label>
                      <Badge variant="secondary" className="px-3 py-1 dark:bg-slate-700">
                        {batchCount} card{batchCount > 1 ? 's' : ''}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setBatchCount(Math.max(1, batchCount - 1))}
                        disabled={batchCount <= 1}
                        className="dark:border-slate-600"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <div className="flex-1 text-center">
                        <span className="text-2xl font-bold dark:text-white">{batchCount}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setBatchCount(Math.min(5, batchCount + 1))}
                        disabled={batchCount >= 5}
                        className="dark:border-slate-600"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Generate up to 5 unique cards at once
                    </p>
                  </div>

                  {/* Generate Button */}
                  <Button
                    size="lg"
                    className="w-full btn-primary h-14 text-lg"
                    onClick={generateCards}
                    disabled={isGenerating || !formData.name.trim() || !formData.senderName.trim()}
                  >
                    {isGenerating ? (
                      <>
                        <div className="spinner mr-2" />
                        Generating {batchCount > 1 ? `${batchCount} Cards` : 'Card'}...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        Generate {batchCount > 1 ? `${batchCount} Cards` : 'Card'}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Preview Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col"
            >
              <div className="mb-4">
                <h2 className="text-2xl font-bold flex items-center gap-2 dark:text-white">
                  <Palette className="w-6 h-6 text-primary" />
                  Live Preview
                </h2>
                <p className="text-slate-500 dark:text-slate-400">See how your card will look</p>
              </div>

              <div
                ref={cardRef}
                className={cn(
                  'relative flex-1 rounded-2xl p-8 shadow-xl transition-all duration-500 overflow-hidden',
                  'min-h-[400px] flex flex-col justify-center items-center text-center',
                  'bg-gradient-to-br',
                  THEMES.find((t) => t.value === formData.theme)?.color || 'from-white to-slate-100',
                  formData.theme === 'Dark Mode' || formData.theme === 'Neon' || formData.theme === 'Galaxy'
                    ? 'text-white'
                    : 'text-slate-800'
                )}
              >
                {formData.name ? (
                  <div className="space-y-4">
                    <div className="text-4xl mb-4">
                      {OCCASIONS.find((o) => o.value === formData.occasion)?.emoji}
                    </div>
                    <h3 className={cn(
                      'text-2xl md:text-3xl font-bold',
                      FONTS.find(f => f.value === formData.font)?.style
                    )}>
                      {formData.occasion === 'Birthday'
                        ? `Happy Birthday, ${formData.name}!`
                        : formData.occasion === 'Graduation'
                        ? `Congratulations, ${formData.name}!`
                        : formData.occasion === 'Wedding'
                        ? `Congratulations on Your Wedding, ${formData.name}!`
                        : formData.occasion === 'Anniversary'
                        ? `Happy Anniversary, ${formData.name}!`
                        : formData.occasion === 'Christmas'
                        ? `Merry Christmas, ${formData.name}!`
                        : formData.occasion === 'Valentine\'s Day'
                        ? `Happy Valentine's Day, ${formData.name}!`
                        : formData.occasion === 'New Year'
                        ? `Happy New Year, ${formData.name}!`
                        : `Congratulations, ${formData.name}!`}
                    </h3>
                    <p className={cn(
                      'text-lg opacity-75',
                      FONTS.find(f => f.value === formData.font)?.style
                    )}>
                      {formData.tone === 'Funny'
                        ? 'Another year of being awesome (and modest)! 😄'
                        : formData.tone === 'Sweet'
                        ? 'Wishing you all the happiness in the world! 💝'
                        : formData.tone === 'Heartfelt'
                        ? 'May your special day be filled with love and joy! 💖'
                        : formData.tone === 'Romantic'
                        ? 'You make every moment magical! 💕'
                        : formData.tone === 'Sarcastic'
                        ? "Look who's still aging like fine wine... or cheese 🧀"
                        : 'Wishing you the very best on this special occasion! 🎉'}
                    </p>
                    {formData.hobby && (
                      <p className="text-sm opacity-60">
                        🎯 Including references to: {formData.hobby}
                      </p>
                    )}
                    {formData.senderName && (
                      <p className={cn(
                        'text-sm italic opacity-80 pt-3 border-t border-white/20',
                        FONTS.find(f => f.value === formData.font)?.style
                      )}>
                        — {formData.senderName} 💝
                      </p>
                    )}
                    <Badge
                      variant="secondary"
                      className={cn(
                        'mt-4',
                        formData.theme === 'Dark Mode' || formData.theme === 'Neon' || formData.theme === 'Galaxy'
                          ? 'bg-white/20 text-white'
                          : 'bg-white/50'
                      )}
                    >
                      {formData.language} • {formData.tone} • {formData.font}
                    </Badge>
                  </div>
                ) : (
                  <div className="space-y-4 text-slate-400 dark:text-slate-500">
                    <Wand2 className="w-16 h-16 mx-auto opacity-30" />
                    <p>Enter names to see the preview</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 md:py-24 bg-slate-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
              Your Card Gallery
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              All your generated cards organized by date. Search, filter, edit, and manage your creations.
            </p>
          </motion.div>

          {/* Gallery Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8"
          >
            <div className="flex items-center gap-4 w-full sm:w-auto">
              {/* Search */}
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search cards..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                />
              </div>
              
              {/* Filter Pinned */}
              <Button
                variant={filterPinned ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterPinned(!filterPinned)}
                className={cn(
                  'h-10',
                  filterPinned && 'bg-amber-500 hover:bg-amber-600',
                  !filterPinned && 'dark:border-slate-600 dark:text-slate-200'
                )}
              >
                <Filter className="w-4 h-4 mr-2" />
                Pinned {pinnedCount > 0 && `(${pinnedCount})`}
              </Button>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <span className="text-sm text-slate-500 dark:text-slate-400 mr-2">
                {filteredCards.length} card{filteredCards.length !== 1 ? 's' : ''}
              </span>
              {cards.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowClearConfirm(true)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 dark:border-slate-600"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              )}
            </div>
          </motion.div>

          {/* Cards Grid - Grouped by Date */}
          <AnimatePresence mode="wait">
            {showSkeletons ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : filteredCards.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                {Object.entries(groupedCards).map(([date, dateCards]) => (
                  <div key={date}>
                    <div className="flex items-center gap-3 mb-4">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        {date === new Date().toLocaleDateString() ? 'Today' : date}
                      </span>
                      <Separator className="flex-1" />
                      <Badge variant="secondary" className="dark:bg-slate-700">
                        {dateCards.length} card{dateCards.length > 1 ? 's' : ''}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <AnimatePresence>
                        {dateCards.map((card) => (
                          <GeneratedCard
                            key={card.id}
                            card={card}
                            onCopy={() => copyCard(card)}
                            onPin={() => pinCard(card.id)}
                            onRegenerate={() => regenerateCard(card)}
                            onDelete={() => deleteCard(card)}
                            onExport={() => exportCard(card)}
                            onShare={() => shareCard(card)}
                            onEdit={() => startEditCard(card)}
                            isRegenerating={regeneratingId === card.id}
                            isEditing={editingCardId === card.id}
                            editMessage={editMessage}
                            onEditChange={setEditMessage}
                            onEditSave={() => saveEditCard(card.id)}
                            onEditCancel={cancelEdit}
                          />
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                  <Gift className="w-12 h-12 text-slate-400 dark:text-slate-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                  {searchQuery || filterPinned ? 'No cards found' : 'No cards yet'}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6">
                  {searchQuery || filterPinned
                    ? 'Try adjusting your search or filter criteria.'
                    : 'Create your first personalized greeting card above!'}
                </p>
                {!searchQuery && !filterPinned && (
                  <Button
                    onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
                    className="btn-primary"
                  >
                    <Wand2 className="w-4 h-4 mr-2" />
                    Create Your First Card
                  </Button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
              Why Choose CardGen AI?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Create stunning, personalized greeting cards with cutting-edge AI technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="feature-card p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl dark:border dark:border-slate-700"
              >
                <div className={cn('feature-icon w-12 h-12 rounded-xl flex items-center justify-center mb-4', feature.bgColor)}>
                  <feature.icon className={cn('w-6 h-6', feature.color)} />
                </div>
                <h3 className="text-lg font-semibold mb-2 dark:text-white">{feature.title}</h3>
                <p className="text-slate-500 dark:text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-50 dark:bg-slate-800 border-t dark:border-slate-700">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Gift className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg dark:text-white">CardGen AI</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
              Create beautiful, personalized greeting cards with the power of AI.
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <Link
              href="/privacy"
              className="text-sm text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-purple-400 transition-colors flex items-center gap-1.5"
            >
              <Shield className="w-4 h-4" />
              Privacy Policy
            </Link>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <Link
              href="/terms"
              className="text-sm text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-purple-400 transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4" />
              Terms of Use
            </Link>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <Link
              href="/disclaimer"
              className="text-sm text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-purple-400 transition-colors flex items-center gap-1.5"
            >
              <AlertTriangle className="w-4 h-4" />
              Disclaimer
            </Link>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <Link
              href="/cookies"
              className="text-sm text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-purple-400 transition-colors flex items-center gap-1.5"
            >
              <Cookie className="w-4 h-4" />
              Cookies Policy
            </Link>
          </div>

          <p className="text-slate-400 dark:text-slate-500 text-xs text-center">
            © {new Date().getFullYear()} CardGen AI. Powered by Groq AI. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Clear Confirmation Dialog */}
      <Dialog open={showClearConfirm} onOpenChange={setShowClearConfirm}>
        <DialogContent className="dark:bg-slate-800 dark:border-slate-700">
          <DialogHeader>
            <DialogTitle className="dark:text-white">Clear All Cards?</DialogTitle>
            <DialogDescription className="dark:text-slate-400">
              This will permanently delete all {cards.length} card{cards.length !== 1 ? 's' : ''}. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowClearConfirm(false)} className="dark:border-slate-600 dark:text-slate-200">
              Cancel
            </Button>
            <Button variant="destructive" onClick={clearAllCards}>
              Delete All
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
