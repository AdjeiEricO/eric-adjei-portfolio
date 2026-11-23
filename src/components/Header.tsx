import { HomeProfile } from '../data/portfolioData';

interface HeaderProps {
  profile: HomeProfile;
  activeSection: string;
  onContactClick: () => void;
}

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export function Header({ profile, activeSection, onContactClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/92 dark:bg-[#0B1F33]/94 backdrop-blur-md border-b border-slate-200 dark:border-[#1E3A5F] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          className="font-display text-lg font-bold tracking-tight text-[#0B1F33] dark:text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:focus-visible:ring-[#38BDF8] focus-visible:ring-offset-4 dark:focus-visible:ring-offset-[#0B1F33] rounded-sm"
        >
          {profile.name}
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:focus-visible:ring-[#38BDF8] focus-visible:ring-offset-4 dark:focus-visible:ring-offset-[#0B1F33] rounded-sm ${
                  isActive
                    ? 'text-[#1D4ED8] dark:text-[#38BDF8] font-semibold after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5 after:bg-[#D97706] dark:after:bg-[#FBBF24]'
                    : 'text-slate-600 dark:text-slate-300 hover:text-[#0B1F33] dark:hover:text-white hover:underline hover:underline-offset-4 hover:decoration-blue-400'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onContactClick}
            className="px-4 py-2.5 min-h-[40px] text-xs font-semibold text-white bg-[#1D4ED8] hover:bg-[#1E40AF] dark:bg-[#F59E0B] dark:hover:bg-[#FBBF24] dark:text-[#071320] active:scale-[0.99] rounded-lg shadow-xs transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:focus-visible:ring-[#FBBF24] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0B1F33] cursor-pointer"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </header>
  );
}
