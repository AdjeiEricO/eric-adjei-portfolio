import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { AboutExperience } from './components/AboutExperience';
import { ContactSection } from './components/ContactSection';
import { Header } from './components/Header';
import { HomeHero } from './components/HomeHero';
import { ResilientImage } from './components/ResilientImage';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { WorkShowcase } from './components/WorkShowcase';
import { DEFAULT_HOME_PROFILE } from './data/portfolioData';

const THEME_STORAGE_KEY = 'portfolio_theme';

const SECTION_IDS = ['home', 'work', 'about', 'contact'] as const;

export type ThemeMode = 'light' | 'dark';

function getInitialTheme(): ThemeMode {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      return 'dark';
    }
  } catch {
    // Ignore storage access errors
  }
  return 'light';
}

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
  const [activeSection, setActiveSection] = useState<string>('home');
  const profile = DEFAULT_HOME_PROFILE;

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage quota errors
    }
  }, [theme]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0.05 }
    );

    for (const id of SECTION_IDS) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F5F9] dark:bg-[#071320] text-[#0B1F33] dark:text-slate-100 transition-colors duration-200">
      <ScrollProgressBar />

      <Header
        profile={profile}
        activeSection={activeSection}
        onContactClick={() => scrollToSection('contact')}
      />

      <main className="flex-1">
        <HomeHero
          profile={profile}
          theme={theme}
          onToggleTheme={toggleTheme}
          onExploreWork={() => scrollToSection('work')}
        />

        {/* Editorial ribbon divider in brand Midnight Navy + Gold + Sky */}
        <div
          aria-hidden="true"
          className="border-y border-[#1E3A5F] bg-gradient-to-r from-[#0B1F33] via-[#133254] to-[#0B1F33] py-3.5 overflow-hidden select-none"
        >
          <div className="animate-marquee text-xs font-medium text-slate-200 tracking-wide">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex items-center gap-8 pr-8 whitespace-nowrap">
                <span className="text-[#FBBF24] font-semibold">Data · Design · Faith</span>
                <span className="text-sky-400">·</span>
                <span>Better Insights · Bolder Ideas · Greater Purpose</span>
                <span className="text-sky-400">·</span>
                <span>01. Home &amp; Introduction</span>
                <span className="text-sky-400">·</span>
                <span>02. Graphic Design</span>
                <span className="text-sky-400">·</span>
                <span>03. Data Analytics</span>
                <span className="text-sky-400">·</span>
                <span>04. Social Media Strategy</span>
                <span className="text-sky-400">·</span>
              </div>
            ))}
          </div>
        </div>

        <WorkShowcase />
        <AboutExperience profile={profile} theme={theme} />
        <ContactSection profile={profile} />
      </main>

      <footer className="border-t border-slate-200 dark:border-[#1B3550] bg-[#0B1F33] text-slate-300 py-8 transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-400/50 shrink-0 bg-[#071320]">
              <ResilientImage
                src="/assets/aistudio/watermarked_img_3194701161851075162_a7fecd62.jpg"
                alt="Personal emblem — Data, Design, Faith"
                title="DG Emblem"
                className="w-full h-full object-cover"
                containerClassName="w-full h-full"
              />
            </div>
            <p className="text-slate-200">
              © <span className="tabular-nums">2026</span> {profile.name}
              <span aria-hidden="true" className="mx-2 text-[#FBBF24]">
                ·
              </span>
              <span className="text-slate-300">Data · Design · Faith</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <a href="#home" className="hover:text-white transition-colors">
              01. Home
            </a>
            <a href="#work" className="hover:text-white transition-colors">
              02. Work
            </a>
            <a href="#about" className="hover:text-white transition-colors">
              03. About
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              04. Contact
            </a>
            <button
              type="button"
              onClick={toggleTheme}
              aria-pressed={theme === 'dark'}
              className="inline-flex items-center gap-1.5 text-sky-300 hover:text-white font-medium transition-colors cursor-pointer"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-[#FBBF24]" aria-hidden="true" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-sky-300" aria-hidden="true" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
