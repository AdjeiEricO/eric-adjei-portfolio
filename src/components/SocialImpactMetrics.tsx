import { useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { BarChart3, TrendingUp } from 'lucide-react';
import { ThemeMode } from '../App';

interface SocialImpactMetricsProps {
  theme: ThemeMode;
}

type ImpactView = 'growth' | 'campaigns';

const GROWTH_SERIES = [
  { month: 'Jun', reachK: 14.2, engagedK: 2.1 },
  { month: 'Jul', reachK: 18.6, engagedK: 2.8 },
  { month: 'Aug', reachK: 22.4, engagedK: 3.5 },
  { month: 'Sep', reachK: 27.1, engagedK: 4.3 },
  { month: 'Oct', reachK: 31.8, engagedK: 5.1 },
  { month: 'Nov', reachK: 35.3, engagedK: 5.9 },
];

const CAMPAIGN_SERIES = [
  { campaign: 'EKB Tech Nexus', engagementPct: 6.4, conversionLift: 44 },
  { campaign: 'Campus Drives', engagementPct: 5.8, conversionLift: 38 },
  { campaign: 'Commercial Promos', engagementPct: 4.9, conversionLift: 41 },
  { campaign: 'Event Key Visuals', engagementPct: 5.2, conversionLift: 35 },
];

const IMPACT_KPIS = [
  { label: 'Organic Reach Growth', value: '+148%', note: 'Jun – Nov 6-month trend' },
  { label: 'Avg. Engagement Rate', value: '5.4%', note: 'Across managed feeds' },
  { label: 'Save & Share Lift', value: '2.4x', note: 'Carousel & story formats' },
  { label: 'Campaigns Directed', value: '18+', note: 'EKB Studios, Campus & Retail' },
];

interface TooltipPayloadItem {
  name?: string;
  value?: number | string;
  color?: string;
  dataKey?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
  view: ImpactView;
}

function CustomChartTooltip({ active, payload, label, view }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div className="rounded-lg border border-slate-200 dark:border-[#2B4F7A] bg-white dark:bg-[#081421] px-3.5 py-2.5 shadow-lg text-xs">
      <p className="font-display font-semibold text-[#0B1F33] dark:text-white mb-1.5">{label}</p>
      <div className="space-y-1">
        {payload.map((entry) => {
          const isReach = entry.dataKey === 'reachK';
          const isEngaged = entry.dataKey === 'engagedK';
          const isEngPct = entry.dataKey === 'engagementPct';
          const formattedValue =
            view === 'growth'
              ? isReach
                ? `${entry.value}K impressions`
                : isEngaged
                  ? `${entry.value}K engaged`
                  : `${entry.value}`
              : isEngPct
                ? `${entry.value}% engagement`
                : `+${entry.value}% share lift`;

          return (
            <div key={String(entry.dataKey)} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                {entry.name}
              </span>
              <span className="font-mono font-semibold text-[#0B1F33] dark:text-white tabular-nums">
                {formattedValue}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function SocialImpactMetrics({ theme }: SocialImpactMetricsProps) {
  const [view, setView] = useState<ImpactView>('growth');
  const isDark = theme === 'dark';

  const axisTickColor = isDark ? '#94A3B8' : '#475569';
  const gridStroke = isDark ? '#1E3A5F' : '#E2E8F0';
  const primaryColor = isDark ? '#38BDF8' : '#1D4ED8';
  const secondaryColor = isDark ? '#FBBF24' : '#D97706';

  return (
    <div className="mt-10 rounded-2xl border border-slate-200 dark:border-[#1E3A5F] bg-white dark:bg-[#0D2136] overflow-hidden shadow-xs">
      {/* Navy Header Band */}
      <div className="px-6 sm:px-8 py-5 bg-gradient-to-r from-[#0B1F33] via-[#123254] to-[#163F66] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5 text-[#FBBF24]" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-display text-xl font-bold tracking-tight">
              Social Impact &amp; Strategy Metrics
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Measured audience growth, engagement benchmarks &amp; campaign performance
            </p>
          </div>
        </div>

        {/* Interactive view toggle */}
        <div
          role="tablist"
          aria-label="Social impact chart view"
          className="inline-flex items-center gap-1 p-1 rounded-lg bg-[#071320]/80 border border-white/15 self-start sm:self-auto"
        >
          <button
            type="button"
            role="tab"
            aria-selected={view === 'growth'}
            onClick={() => setView('growth')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[34px] text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              view === 'growth'
                ? 'bg-[#F59E0B] text-[#071320]'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Growth Trajectory</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={view === 'campaigns'}
            onClick={() => setView('campaigns')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[34px] text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              view === 'campaigns'
                ? 'bg-[#F59E0B] text-[#071320]'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Campaign Lift</span>
          </button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-[#1E3A5F] border-b border-slate-200 dark:border-[#1E3A5F] bg-[#F8FAFC] dark:bg-[#081421]/60">
        {IMPACT_KPIS.map((kpi, idx) => (
          <div key={kpi.label} className="px-6 py-4">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{kpi.label}</p>
            <p
              className={`font-display text-2xl font-bold tabular-nums mt-1 ${
                idx === 0
                  ? 'text-[#1D4ED8] dark:text-sky-300'
                  : idx === 1
                    ? 'text-[#B45309] dark:text-[#FBBF24]'
                    : 'text-[#0B1F33] dark:text-white'
              }`}
            >
              {kpi.value}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{kpi.note}</p>
          </div>
        ))}
      </div>

      {/* Recharts Visualization Canvas */}
      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <div>
            <p className="font-display text-sm font-semibold text-[#0B1F33] dark:text-white">
              {view === 'growth'
                ? 'Monthly Organic Reach & Engaged Community Growth (Jun – Nov)'
                : 'Engagement Rate (%) & Share Lift (%) by Campaign Pillar'}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {view === 'growth'
                ? 'Consistent visual storytelling paired with weekly performance audits'
                : 'Comparing audience interaction across EKB Studios, campus & retail campaigns'}
            </p>
          </div>

          <div className="flex items-center gap-5 text-xs text-slate-600 dark:text-slate-300">
            <span className="inline-flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-xs"
                style={{ backgroundColor: primaryColor }}
              />
              {view === 'growth' ? 'Organic Reach (K)' : 'Engagement Rate (%)'}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-xs"
                style={{ backgroundColor: secondaryColor }}
              />
              {view === 'growth' ? 'Engaged Audience (K)' : 'Share Lift (%)'}
            </span>
          </div>
        </div>

        <div className="w-full h-72 min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            {view === 'growth' ? (
              <AreaChart
                data={GROWTH_SERIES}
                margin={{ top: 10, right: 16, left: -12, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="reachGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={primaryColor} stopOpacity={0.28} />
                    <stop offset="95%" stopColor={primaryColor} stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="engagedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={secondaryColor} stopOpacity={0.28} />
                    <stop offset="95%" stopColor={secondaryColor} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fill: axisTickColor, fontSize: 12 }}
                  axisLine={{ stroke: gridStroke }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: axisTickColor, fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${v}K`}
                />
                <Tooltip content={<CustomChartTooltip view="growth" />} />
                <Area
                  type="monotone"
                  dataKey="reachK"
                  name="Organic Reach"
                  stroke={primaryColor}
                  strokeWidth={2.5}
                  fill="url(#reachGradient)"
                  activeDot={{ r: 5 }}
                />
                <Area
                  type="monotone"
                  dataKey="engagedK"
                  name="Engaged Audience"
                  stroke={secondaryColor}
                  strokeWidth={2.5}
                  fill="url(#engagedGradient)"
                  activeDot={{ r: 5 }}
                />
              </AreaChart>
            ) : (
              <BarChart
                data={CAMPAIGN_SERIES}
                margin={{ top: 10, right: 16, left: -12, bottom: 0 }}
                barGap={8}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
                <XAxis
                  dataKey="campaign"
                  tick={{ fill: axisTickColor, fontSize: 12 }}
                  axisLine={{ stroke: gridStroke }}
                  tickLine={false}
                />
                <YAxis
                  yAxisId="left"
                  tick={{ fill: axisTickColor, fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${v}%`}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fill: axisTickColor, fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `+${v}%`}
                />
                <Tooltip
                  cursor={{ fill: isDark ? 'rgba(56, 189, 248, 0.08)' : 'rgba(29, 78, 216, 0.06)' }}
                  content={<CustomChartTooltip view="campaigns" />}
                />
                <Bar
                  yAxisId="left"
                  dataKey="engagementPct"
                  name="Engagement Rate"
                  fill={primaryColor}
                  radius={[6, 6, 0, 0]}
                  maxBarSize={44}
                />
                <Bar
                  yAxisId="right"
                  dataKey="conversionLift"
                  name="Share Lift"
                  fill={secondaryColor}
                  radius={[6, 6, 0, 0]}
                  maxBarSize={44}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
