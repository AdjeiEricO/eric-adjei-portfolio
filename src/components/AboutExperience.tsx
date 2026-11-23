import { BarChart3, ExternalLink, Megaphone, PenTool } from 'lucide-react';
import { ThemeMode } from '../App';
import { DISCIPLINES, EXPERIENCE_TIMELINE, HomeProfile } from '../data/portfolioData';
import { SocialImpactMetrics } from './SocialImpactMetrics';

interface AboutExperienceProps {
  profile: HomeProfile;
  theme: ThemeMode;
}

const DISCIPLINE_STYLES = {
  cobalt: {
    icon: BarChart3,
    iconBg: 'bg-[#1D4ED8]/10 text-[#1D4ED8] dark:bg-sky-500/20 dark:text-sky-300',
    indexColor: 'text-[#1D4ED8] dark:text-sky-300',
    cardHover: 'hover:border-blue-400/70 dark:hover:border-sky-400/50',
  },
  gold: {
    icon: PenTool,
    iconBg: 'bg-amber-500/15 text-[#B45309] dark:bg-amber-400/20 dark:text-[#FBBF24]',
    indexColor: 'text-[#B45309] dark:text-[#FBBF24]',
    cardHover: 'hover:border-amber-400/70 dark:hover:border-amber-400/50',
  },
  navy: {
    icon: Megaphone,
    iconBg: 'bg-[#0B1F33]/10 text-[#0B1F33] dark:bg-slate-200/15 dark:text-slate-100',
    indexColor: 'text-[#0B1F33] dark:text-slate-200',
    cardHover: 'hover:border-[#0B1F33]/40 dark:hover:border-slate-400/50',
  },
};

export function AboutExperience({ profile, theme }: AboutExperienceProps) {
  return (
    <section
      id="about"
      className="py-16 lg:py-24 border-t border-slate-200 dark:border-[#1E3A5F] bg-[#F1F5F9] dark:bg-[#071320] transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left column: Visual Discipline Cards */}
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">
              <span className="font-mono text-[#1D4ED8] dark:text-[#FBBF24] mr-2 tabular-nums">
                03.
              </span>
              About &amp; Craft
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0B1F33] dark:text-white [text-wrap:balance]">
              How {profile.name.split(' ')[0]} works
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300 max-w-[52ch]">
              I approach every brief as a balance between visual impact and measurable clarity.
              Whether designing a campaign poster, structuring a social calendar, or analyzing
              performance data, my goal is communication that connects and converts.
            </p>

            <div className="mt-8 space-y-4">
              {DISCIPLINES.map((discipline) => {
                const style = DISCIPLINE_STYLES[discipline.accent];
                const Icon = style.icon;
                return (
                  <div
                    key={discipline.index}
                    className={`rounded-xl border border-slate-200 dark:border-[#1E3A5F] bg-white dark:bg-[#0D2136] p-5 transition-all duration-150 hover:-translate-y-0.5 shadow-xs ${style.cardHover}`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${style.iconBg}`}
                      >
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-display text-base sm:text-lg font-bold text-[#0B1F33] dark:text-white">
                          <span
                            className={`font-mono text-xs mr-2 tabular-nums ${style.indexColor}`}
                          >
                            {discipline.index}
                          </span>
                          {discipline.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                          {discipline.description}
                        </p>
                        <p className="mt-2.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                          {discipline.tools}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right column: Visual Experience Timeline */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 dark:border-[#1E3A5F] bg-white dark:bg-[#0D2136] overflow-hidden shadow-xs">
              <div className="px-6 sm:px-8 py-5 bg-gradient-to-r from-[#0B1F33] to-[#163F66] text-white flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight">
                    Experience Timeline
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Social Strategy · Data Analytics · Graphic Design
                  </p>
                </div>
                <span className="font-mono text-xs font-semibold text-[#FBBF24] tabular-nums">
                  2023 — 2026
                </span>
              </div>

              <div className="p-6 sm:p-8 space-y-8">
                {EXPERIENCE_TIMELINE.map((item, idx) => (
                  <div
                    key={`${item.period}-${item.organization}`}
                    className={`relative pl-7 ${
                      idx !== EXPERIENCE_TIMELINE.length - 1
                        ? 'pb-8 border-b border-slate-200/80 dark:border-[#1E3A5F]'
                        : ''
                    }`}
                  >
                    {/* Structural timeline node */}
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 ${
                        idx === 0
                          ? 'bg-[#1D4ED8] border-[#1D4ED8] dark:bg-[#FBBF24] dark:border-[#FBBF24]'
                          : idx === 1
                            ? 'bg-white dark:bg-[#0D2136] border-[#1D4ED8] dark:border-sky-400'
                            : 'bg-white dark:bg-[#0D2136] border-[#D97706] dark:border-[#FBBF24]'
                      }`}
                    />

                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-mono text-xs font-semibold text-[#1D4ED8] dark:text-sky-300 tabular-nums">
                        {item.period}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{item.location}</p>
                    </div>

                    <h4 className="mt-1.5 font-display text-lg font-bold text-[#0B1F33] dark:text-white">
                      {item.role}
                    </h4>

                    {item.organizationUrl ? (
                      <a
                        href={item.organizationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#B45309] dark:text-[#FBBF24] hover:underline underline-offset-4 mt-0.5"
                      >
                        <span>{item.organization}</span>
                        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-0.5">
                        {item.organization}
                      </p>
                    )}

                    <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {item.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Data-driven Social Impact Recharts analytics section */}
        <SocialImpactMetrics theme={theme} />
      </div>
    </section>
  );
}
