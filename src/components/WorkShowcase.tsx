import { useEffect, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { ProjectCategory, ProjectItem, PROJECTS } from '../data/portfolioData';
import { AnalyticsPreview } from './AnalyticsPreview';
import { ResilientImage } from './ResilientImage';

const FILTER_CATEGORIES: ProjectCategory[] = [
  'All Work',
  'Graphic Design',
  'Data Analytics',
  'Social Strategy',
];

export function WorkShowcase() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All Work');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects =
    activeCategory === 'All Work'
      ? PROJECTS
      : PROJECTS.filter(
          (project) =>
            project.category === activeCategory || project.secondaryCategory === activeCategory
        );

  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  return (
    <section
      id="work"
      className="scroll-mt-[73px] py-16 lg:py-24 border-t border-slate-200 dark:border-[#1E3A5F] bg-white dark:bg-[#091829] transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section header + interactive segmented filter control */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-slate-200 dark:border-[#1E3A5F]">
          <div>
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">
              <span className="font-mono text-[#1D4ED8] dark:text-[#FBBF24] mr-2 tabular-nums">
                02.
              </span>
              Selected Work
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0B1F33] dark:text-white [text-wrap:balance]">
              Graphic designs &amp; data analytics case studies
            </h2>
          </div>

          {/* Interactive segmented filter tabs */}
          <div
            role="tablist"
            aria-label="Filter projects by discipline"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#EFF6FF] dark:bg-[#071320] rounded-lg border border-blue-200/70 dark:border-[#1E3A5F] self-start md:self-auto"
          >
            {FILTER_CATEGORIES.map((category) => {
              const isSelected = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3.5 py-2 min-h-[36px] text-xs font-semibold rounded-md transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] cursor-pointer ${
                    isSelected
                      ? 'bg-[#1D4ED8] dark:bg-[#F59E0B] text-white dark:text-[#071320] shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-[#0B1F33] dark:hover:text-white'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Bento Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => {
            const isAnalytics = Boolean(project.analyticsVariant);
            const isWide = activeCategory === 'All Work' && project.spanWide;

            return (
              <article
                key={project.id}
                className={`group rounded-2xl border border-slate-200 dark:border-[#1E3A5F] bg-[#F8FAFC] dark:bg-[#0D2136] overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-blue-400/70 dark:hover:border-sky-400/50 ${
                  isWide ? 'md:col-span-2' : 'md:col-span-1'
                }`}
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedProject(project)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedProject(project);
                    }
                  }}
                  className="text-left flex flex-col flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-inset cursor-pointer"
                >
                  {isAnalytics && project.analyticsVariant ? (
                    <div className="w-full border-b border-slate-200 dark:border-[#1E3A5F] bg-white dark:bg-[#0B1F33]">
                      <AnalyticsPreview
                        variant={project.analyticsVariant}
                        highlights={project.analyticsHighlights}
                        compact
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-[4/4.4] sm:aspect-[4/4.2] overflow-hidden bg-gradient-to-br from-[#E8EFF8] to-[#F1F5F9] dark:from-[#071320] dark:to-[#0B1F33] border-b border-slate-200 dark:border-[#1E3A5F] p-4 sm:p-6 flex items-center justify-center">
                      <ResilientImage
                        src={project.imageUrl || ''}
                        alt={project.imageAlt || project.title}
                        title={project.title}
                        className="w-full h-full object-contain rounded-lg shadow-sm transition-transform duration-300 group-hover:scale-[1.02]"
                        containerClassName="w-full h-full rounded-lg"
                      />
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="font-display text-xl font-bold tracking-tight text-[#0B1F33] dark:text-white group-hover:text-[#1D4ED8] dark:group-hover:text-[#38BDF8] transition-colors">
                          {project.title}
                        </h3>
                        <ArrowUpRight
                          className="w-4 h-4 text-[#1D4ED8] dark:text-[#FBBF24] shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden="true"
                        />
                      </div>

                      <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        {project.summary}
                      </p>
                    </div>

                    {/* Zero-pill inline metadata */}
                    <div className="pt-4 border-t border-slate-200/80 dark:border-[#1E3A5F] flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-semibold text-[#1D4ED8] dark:text-[#38BDF8]">
                        {project.category}
                      </span>
                      {project.secondaryCategory && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="font-medium text-[#B45309] dark:text-[#FBBF24]">
                            {project.secondaryCategory}
                          </span>
                        </>
                      )}
                      <span aria-hidden="true">·</span>
                      <span>{project.client}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">{project.year}</span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Case Study & Design Lightbox Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#071320]/85 backdrop-blur-xs"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#0D2136] border border-slate-200 dark:border-[#2B4F7A] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-4 bg-white/95 dark:bg-[#0D2136]/95 backdrop-blur-sm border-b border-slate-200 dark:border-[#1E3A5F]">
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 min-w-0">
                <span className="font-semibold text-[#0B1F33] dark:text-white truncate">
                  {selectedProject.client}
                </span>
                <span aria-hidden="true">·</span>
                <span className="whitespace-nowrap shrink-0 text-[#1D4ED8] dark:text-sky-300 font-medium">
                  {selectedProject.category}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums whitespace-nowrap shrink-0">
                  {selectedProject.year}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 dark:border-[#2B4F7A] bg-white dark:bg-[#0B1F33] text-slate-700 dark:text-slate-200 hover:text-[#0B1F33] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#133254] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {selectedProject.analyticsVariant ? (
              <div className="w-full border-b border-slate-200 dark:border-[#1E3A5F] bg-white dark:bg-[#0B1F33] p-2 sm:p-4">
                <AnalyticsPreview
                  variant={selectedProject.analyticsVariant}
                  highlights={selectedProject.analyticsHighlights}
                />
              </div>
            ) : (
              <div className="w-full bg-gradient-to-br from-[#E8EFF8] to-[#F1F5F9] dark:from-[#071320] dark:to-[#0B1F33] border-b border-slate-200 dark:border-[#1E3A5F] p-4 sm:p-8 flex items-center justify-center max-h-[62vh]">
                <ResilientImage
                  src={selectedProject.imageUrl || ''}
                  alt={selectedProject.imageAlt || selectedProject.title}
                  title={selectedProject.title}
                  className="max-h-[54vh] w-auto object-contain rounded-lg shadow-sm"
                  containerClassName="w-full h-80"
                />
              </div>
            )}

            <div className="p-6 sm:p-8 space-y-8">
              <div>
                <h3
                  id="project-modal-title"
                  className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1F33] dark:text-white"
                >
                  {selectedProject.title}
                </h3>
                <p className="mt-2 text-sm font-semibold text-[#1D4ED8] dark:text-[#FBBF24]">
                  {selectedProject.role}
                </p>
                <p className="mt-4 text-base leading-relaxed text-slate-700 dark:text-slate-300">
                  {selectedProject.summary}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-slate-200 dark:border-[#1E3A5F]">
                <div>
                  <h4 className="font-display text-sm font-semibold text-[#0B1F33] dark:text-slate-100 mb-2">
                    Brief &amp; Problem
                  </h4>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {selectedProject.challenge}
                  </p>
                </div>
                <div>
                  <h4 className="font-display text-sm font-semibold text-[#0B1F33] dark:text-slate-100 mb-2">
                    Approach &amp; Outcome
                  </h4>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {selectedProject.outcome}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 dark:border-[#1E3A5F] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Key Highlight</p>
                  <p className="font-display text-base font-semibold text-[#0B1F33] dark:text-white mt-0.5 tabular-nums">
                    {selectedProject.impactMetric}
                  </p>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  <span>{selectedProject.deliverables.join(' · ')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
