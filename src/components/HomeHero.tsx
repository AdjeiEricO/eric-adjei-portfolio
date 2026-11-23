import {
  ArrowDownRight,
  ArrowRight,
  BarChart3,
  Briefcase,
  Layers,
  Moon,
  Palette,
  Pencil,
  Sun,
} from 'lucide-react';
import { motion } from 'motion/react';
import { ThemeMode } from '../App';
import { HomeProfile, PORTFOLIO_METRICS } from '../data/portfolioData';
import { ResilientImage } from './ResilientImage';

interface HomeHeroProps {
  profile: HomeProfile;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onExploreWork: () => void;
  onEditIntro: () => void;
}

const METRIC_STYLES = {
  cobalt: {
    icon: Briefcase,
    iconWrap: 'bg-blue-600/15 text-[#1D4ED8] dark:bg-blue-500/20 dark:text-sky-300',
    border: 'hover:border-blue-400 dark:hover:border-sky-400/60',
  },
  gold: {
    icon: Layers,
    iconWrap: 'bg-amber-500/15 text-[#B45309] dark:bg-amber-400/20 dark:text-[#FBBF24]',
    border: 'hover:border-amber-400 dark:hover:border-amber-400/60',
  },
  navy: {
    icon: Palette,
    iconWrap: 'bg-[#0B1F33]/10 text-[#0B1F33] dark:bg-slate-200/15 dark:text-slate-100',
    border: 'hover:border-[#0B1F33]/40 dark:hover:border-slate-400/60',
  },
  sky: {
    icon: BarChart3,
    iconWrap: 'bg-sky-500/15 text-[#0369A1] dark:bg-sky-400/20 dark:text-sky-300',
    border: 'hover:border-sky-400 dark:hover:border-sky-400/60',
  },
};

export function HomeHero({
  profile,
  theme,
  onToggleTheme,
  onExploreWork,
  onEditIntro,
}: HomeHeroProps) {
  const isDark = theme === 'dark';

  return (
    <section
      id="home"
      className="pt-10 pb-16 lg:pt-14 lg:pb-22 bg-gradient-to-b from-[#E6EEF8] via-[#F1F5F9] to-[#F8FAFC] dark:from-[#0B1F33] dark:via-[#081728] dark:to-[#071320] transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Split-screen hero with matching column height on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left column: Lively Hero Showcase Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-slate-200/90 dark:border-[#1E3A5F] bg-white dark:bg-[#0D2136] p-6 sm:p-8 lg:p-10 shadow-sm"
          >
            <div>
              {/* Top utility strip */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-[#1E3A5F]">
                <p className="text-sm font-semibold text-[#0B1F33] dark:text-slate-200 tracking-normal">
                  <span className="font-mono text-[#1D4ED8] dark:text-[#FBBF24] mr-2 tabular-nums">
                    01.
                  </span>
                  Home
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    <span>{profile.location}</span>
                    <span aria-hidden="true" className="mx-2 text-slate-300 dark:text-slate-600">
                      ·
                    </span>
                    <span>{profile.availability}</span>
                  </p>

                  <button
                    type="button"
                    onClick={onToggleTheme}
                    aria-pressed={isDark}
                    aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] text-xs font-semibold rounded-lg border border-slate-200 dark:border-[#2B4F7A] bg-[#F1F5F9] dark:bg-[#081421] text-[#0B1F33] dark:text-slate-100 hover:bg-blue-50 dark:hover:bg-[#133254] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] cursor-pointer"
                  >
                    {isDark ? (
                      <>
                        <Sun className="w-3.5 h-3.5 text-[#FBBF24]" aria-hidden="true" />
                        <span>Light Mode</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-3.5 h-3.5 text-[#1D4ED8]" aria-hidden="true" />
                        <span>Dark Mode</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Midnight Navy Logo Crest Strip */}
              <div className="mt-6 rounded-xl bg-gradient-to-r from-[#0B1F33] via-[#123254] to-[#1A4370] p-4 border border-[#1E3A5F] flex items-center gap-4 text-white">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-slate-300/80 bg-[#0B1F33] shrink-0">
                  <ResilientImage
                    src="/assets/aistudio/watermarked_img_3194701161851075162_a7fecd62.jpg"
                    alt="Personal logo emblem — Data, Design, Faith: Better Insights, Bolder Ideas, Greater Purpose"
                    title="Personal Brand Logo"
                    className="w-full h-full object-cover"
                    containerClassName="w-full h-full"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-sm font-bold tracking-wide text-white">
                    Data <span className="text-[#FBBF24]">·</span> Design{' '}
                    <span className="text-sky-300">·</span> Faith
                  </p>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Better Insights · Bolder Ideas · Greater Purpose
                  </p>
                </div>
              </div>

              <div className="mt-7">
                <p className="text-sm sm:text-base font-semibold text-[#1D4ED8] dark:text-[#38BDF8] mb-2.5">
                  {profile.role}
                </p>
                <h1 className="font-display text-[clamp(2.5rem,4.5vw,4.1rem)] font-bold tracking-tight text-[#0B1F33] dark:text-white leading-[1.06] [text-wrap:balance]">
                  {profile.name}
                </h1>
                <p className="mt-3.5 font-display text-lg sm:text-xl font-medium text-slate-700 dark:text-slate-200 leading-snug max-w-2xl [text-wrap:balance]">
                  {profile.tagline}
                </p>
              </div>

              <div className="mt-6 space-y-3.5 max-w-[65ch] text-[15px] sm:text-base leading-[1.68] text-slate-600 dark:text-slate-300">
                <p className="text-[#0B1F33] dark:text-slate-100 font-normal">
                  {profile.introduction}
                </p>
                <p>{profile.secondaryBio}</p>
              </div>
            </div>

            {/* Primary & Secondary Actions */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-[#1E3A5F] flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={onExploreWork}
                className="inline-flex items-center gap-2.5 px-6 py-3 min-h-[44px] bg-[#1D4ED8] hover:bg-[#1E40AF] text-white dark:bg-[#F59E0B] dark:hover:bg-[#FBBF24] dark:text-[#071320] text-sm font-semibold rounded-lg shadow-xs transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0D2136] cursor-pointer"
              >
                <span>Explore Selected Work</span>
                <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 min-h-[44px] bg-[#0B1F33] hover:bg-[#143352] text-white dark:bg-[#163859] dark:hover:bg-[#1E4870] border border-transparent dark:border-[#2B4F7A] text-sm font-medium rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0D2136]"
              >
                <span>Direct Inquiry</span>
                <ArrowRight className="w-4 h-4 text-sky-300" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={onEditIntro}
                className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-[#1D4ED8] dark:hover:text-[#FBBF24] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded-md cursor-pointer sm:ml-auto"
              >
                <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Customize Intro</span>
              </button>
            </div>
          </motion.div>

          {/* Right column: Editorial Portrait matching split height */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex"
          >
            <figure className="w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-[#1E3A5F] bg-[#0B1F33] flex flex-col shadow-sm">
              <div className="relative flex-1 min-h-[380px] sm:min-h-[440px] lg:min-h-0">
                <ResilientImage
                  src="/assets/aistudio/file_00000000764c81f485a0006d54979ba8_b45bdc64.png"
                  alt={`Portrait of ${profile.name}`}
                  title={profile.name}
                  className="w-full h-full lg:absolute lg:inset-0 object-cover object-[50%_22%]"
                  containerClassName="w-full h-full min-h-[380px]"
                />
              </div>
            </figure>
          </motion.div>
        </div>

        {/* Full-width 4-column visual capability strip below the hero split */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PORTFOLIO_METRICS.map((metric) => {
            const style = METRIC_STYLES[metric.accent];
            const Icon = style.icon;
            return (
              <div
                key={metric.label}
                className={`rounded-xl border border-slate-200 dark:border-[#1E3A5F] bg-white dark:bg-[#0D2136] p-5 flex items-start gap-4 transition-all duration-150 hover:-translate-y-0.5 shadow-xs ${style.border}`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${style.iconWrap}`}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {metric.label}
                  </p>
                  <p className="font-display text-lg font-bold tracking-tight text-[#0B1F33] dark:text-white tabular-nums mt-0.5">
                    {metric.value}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                    {metric.context}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
