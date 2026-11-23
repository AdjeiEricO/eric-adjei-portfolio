import { useState } from 'react';
import { AnalyticsStat } from '../data/portfolioData';

interface AnalyticsPreviewProps {
  variant: 'retail-sales' | 'social-attribution';
  highlights?: AnalyticsStat[];
  compact?: boolean;
}

const RETAIL_MONTHLY_REVENUE = [
  { month: 'Jan', revenue: 11.4, repeat: 28 },
  { month: 'Feb', revenue: 12.1, repeat: 30 },
  { month: 'Mar', revenue: 13.8, repeat: 31 },
  { month: 'Apr', revenue: 12.9, repeat: 32 },
  { month: 'May', revenue: 14.6, repeat: 34 },
  { month: 'Jun', revenue: 15.2, repeat: 35 },
  { month: 'Jul', revenue: 14.1, repeat: 33 },
  { month: 'Aug', revenue: 16.4, repeat: 36 },
  { month: 'Sep', revenue: 15.9, repeat: 37 },
  { month: 'Oct', revenue: 17.8, repeat: 39 },
  { month: 'Nov', revenue: 21.4, repeat: 44 },
  { month: 'Dec', revenue: 19.0, repeat: 42 },
];

type SocialMetricKey = 'reach' | 'saveRate' | 'ctr';

const SOCIAL_FORMATS = [
  { format: 'Educational Carousels', reach: 88, saveRate: 6.8, ctr: 3.9 },
  { format: 'Short-Form Video', reach: 94, saveRate: 5.1, ctr: 3.2 },
  { format: 'Promotional Flyers', reach: 64, saveRate: 2.9, ctr: 4.4 },
  { format: 'Text & Quote Cards', reach: 52, saveRate: 3.4, ctr: 2.1 },
];

export function AnalyticsPreview({
  variant,
  highlights = [],
  compact = false,
}: AnalyticsPreviewProps) {
  const [hoveredMonthIndex, setHoveredMonthIndex] = useState<number>(10); // Default highlight: Nov peak
  const [activeSocialMetric, setActiveSocialMetric] = useState<SocialMetricKey>('reach');

  if (variant === 'retail-sales') {
    const maxRevenue = 22;
    const activePoint = RETAIL_MONTHLY_REVENUE[hoveredMonthIndex] ?? RETAIL_MONTHLY_REVENUE[10];

    return (
      <div className="w-full h-full bg-white dark:bg-[#0B1F33] p-5 sm:p-6 flex flex-col justify-between gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-[#1E3A5F] pb-3.5">
          <div>
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
              Interactive Chart · Hover or tap a month
            </p>
            <p className="font-display text-sm font-semibold text-[#0B1F33] dark:text-white">
              Monthly Net Revenue ($K) &amp; Cohort Repeat Rate
            </p>
          </div>
          <div className="font-mono text-xs bg-[#EFF6FF] dark:bg-[#133254] text-[#1D4ED8] dark:text-[#FBBF24] px-2.5 py-1 rounded-md tabular-nums">
            {activePoint.month}: ${activePoint.revenue.toFixed(1)}K · {activePoint.repeat}% repeat
          </div>
        </div>

        {/* Crisp Interactive Bar Chart */}
        <div className={compact ? 'h-36 sm:h-44' : 'h-52'} aria-label="Monthly revenue bar chart">
          <div className="h-full flex items-end gap-1.5 sm:gap-2.5 pt-4">
            {RETAIL_MONTHLY_REVENUE.map((item, idx) => {
              const heightPct = Math.round((item.revenue / maxRevenue) * 100);
              const isPeak = item.month === 'Nov' || item.month === 'Dec';
              const isSelected = hoveredMonthIndex === idx;
              return (
                <div
                  key={item.month}
                  onMouseEnter={() => setHoveredMonthIndex(idx)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setHoveredMonthIndex(idx);
                  }}
                  className="flex-1 h-full flex flex-col justify-end items-center gap-1.5 cursor-pointer"
                >
                  <span
                    className={`font-mono text-[10px] tabular-nums hidden sm:inline ${
                      isSelected
                        ? 'text-[#1D4ED8] dark:text-[#FBBF24] font-semibold'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {item.revenue.toFixed(0)}k
                  </span>
                  <div className="w-full flex-1 flex items-end">
                    <div
                      style={{ height: `${heightPct}%` }}
                      className={`w-full rounded-t-sm transition-colors duration-150 ${
                        isSelected
                          ? 'bg-[#F59E0B] dark:bg-[#FBBF24]'
                          : isPeak
                            ? 'bg-[#1D4ED8] dark:bg-[#38BDF8]'
                            : 'bg-slate-300 dark:bg-[#27496D] hover:bg-[#2563EB]/70'
                      }`}
                    />
                  </div>
                  <span
                    className={`font-mono text-[10px] tabular-nums ${
                      isSelected
                        ? 'text-[#0B1F33] dark:text-white font-semibold'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {highlights.length > 0 && (
          <div className="grid grid-cols-3 gap-3 pt-3.5 border-t border-slate-200 dark:border-[#1E3A5F]">
            {highlights.map((stat, idx) => (
              <div key={stat.label}>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {stat.label}
                </p>
                <p
                  className={`font-mono text-sm sm:text-base font-semibold tabular-nums mt-0.5 ${
                    idx === 1
                      ? 'text-[#1D4ED8] dark:text-sky-300'
                      : idx === 2
                        ? 'text-[#B45309] dark:text-[#FBBF24]'
                        : 'text-[#0B1F33] dark:text-white'
                  }`}
                >
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white dark:bg-[#0B1F33] p-5 sm:p-6 flex flex-col justify-between gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-[#1E3A5F] pb-3.5">
        <div>
          <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
            Interactive Benchmark · 180 Posts
          </p>
          <p className="font-display text-sm font-semibold text-[#0B1F33] dark:text-white">
            Content Format Performance
          </p>
        </div>

        {/* Interactive metric selector */}
        <div
          className="inline-flex items-center gap-1 p-0.5 rounded-md bg-slate-100 dark:bg-[#071320] border border-slate-200 dark:border-[#1E3A5F]"
          onClick={(e) => e.stopPropagation()}
        >
          {(
            [
              { key: 'reach', label: 'Reach' },
              { key: 'saveRate', label: 'Saves' },
              { key: 'ctr', label: 'CTR' },
            ] as const
          ).map((tab) => {
            const isActive = activeSocialMetric === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSocialMetric(tab.key);
                }}
                className={`px-2 py-1 text-[11px] font-medium rounded-sm transition-colors cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#1D4ED8] text-white dark:bg-[#F59E0B] dark:text-[#071320]'
                    : 'text-slate-600 dark:text-slate-300 hover:text-[#0B1F33] dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparative Horizontal Bars */}
      <div className="space-y-3.5 my-auto" aria-label="Content format engagement comparison">
        {SOCIAL_FORMATS.map((row, idx) => {
          const widthPct =
            activeSocialMetric === 'reach'
              ? row.reach
              : activeSocialMetric === 'saveRate'
                ? Math.round((row.saveRate / 7.2) * 100)
                : Math.round((row.ctr / 4.8) * 100);

          const displayVal =
            activeSocialMetric === 'reach'
              ? `${row.reach} idx`
              : activeSocialMetric === 'saveRate'
                ? `${row.saveRate}%`
                : `${row.ctr}%`;

          const barColors = [
            'bg-[#1D4ED8] dark:bg-[#38BDF8]',
            'bg-[#F59E0B] dark:bg-[#FBBF24]',
            'bg-[#0B1F33] dark:bg-slate-200',
            'bg-slate-400 dark:bg-[#356291]',
          ];

          return (
            <div key={row.format} className="space-y-1.5">
              <div className="flex items-center justify-between gap-3 text-xs">
                <span className="font-medium text-[#0B1F33] dark:text-slate-200 truncate">
                  {row.format}
                </span>
                <span className="font-mono text-[11px] font-semibold text-[#1D4ED8] dark:text-sky-300 tabular-nums whitespace-nowrap shrink-0">
                  {displayVal}
                </span>
              </div>
              <div className="h-2.5 w-full bg-slate-100 dark:bg-[#071320] rounded-full overflow-hidden">
                <div
                  style={{ width: `${widthPct}%` }}
                  className={`h-full rounded-full transition-all duration-300 ${barColors[idx]}`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {highlights.length > 0 && (
        <div className="grid grid-cols-3 gap-3 pt-3.5 border-t border-slate-200 dark:border-[#1E3A5F]">
          {highlights.map((stat, idx) => (
            <div key={stat.label}>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {stat.label}
              </p>
              <p
                className={`font-mono text-sm sm:text-base font-semibold tabular-nums mt-0.5 ${
                  idx === 1
                    ? 'text-[#1D4ED8] dark:text-sky-300'
                    : idx === 2
                      ? 'text-[#B45309] dark:text-[#FBBF24]'
                      : 'text-[#0B1F33] dark:text-white'
                }`}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
