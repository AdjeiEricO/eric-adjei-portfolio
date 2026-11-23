import { FormEvent, useEffect, useState } from 'react';
import { RotateCcw, X } from 'lucide-react';
import { DEFAULT_HOME_PROFILE, HomeProfile } from '../data/portfolioData';

interface EditIntroModalProps {
  isOpen: boolean;
  profile: HomeProfile;
  onClose: () => void;
  onSave: (updated: HomeProfile) => void;
}

export function EditIntroModal({ isOpen, profile, onClose, onSave }: EditIntroModalProps) {
  const [draft, setDraft] = useState<HomeProfile>(profile);

  useEffect(() => {
    setDraft(profile);
  }, [profile, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave({
      ...draft,
      name: draft.name.trim() || DEFAULT_HOME_PROFILE.name,
      role: draft.role.trim() || DEFAULT_HOME_PROFILE.role,
      tagline: draft.tagline.trim() || DEFAULT_HOME_PROFILE.tagline,
      introduction: draft.introduction.trim() || DEFAULT_HOME_PROFILE.introduction,
      secondaryBio: draft.secondaryBio.trim() || DEFAULT_HOME_PROFILE.secondaryBio,
      location: draft.location.trim() || DEFAULT_HOME_PROFILE.location,
      availability: draft.availability.trim() || DEFAULT_HOME_PROFILE.availability,
      email: draft.email.trim() || DEFAULT_HOME_PROFILE.email,
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-intro-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#081421]/80 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#0D2136] border border-slate-200 dark:border-[#224162] shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-4 bg-white dark:bg-[#0D2136] border-b border-slate-200 dark:border-[#1B3550]">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              <span className="font-mono text-[#163F66] dark:text-[#93C5FD] mr-1.5">01.</span>
              Home Settings
            </p>
            <h3
              id="edit-intro-title"
              className="font-display text-lg font-semibold text-[#0B1F33] dark:text-white"
            >
              Customize Name &amp; Introduction
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close editor"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 dark:border-[#224162] text-slate-600 dark:text-slate-300 hover:text-[#0B1F33] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#132E4A] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="intro-name"
                className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Full Name
              </label>
              <input
                id="intro-name"
                type="text"
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                className="w-full px-3.5 py-2.5 min-h-[42px] text-sm bg-white dark:bg-[#081421] border border-slate-200 dark:border-[#224162] rounded-lg text-[#0B1F33] dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#1E4B7A] dark:focus:ring-[#93C5FD]"
                required
              />
            </div>

            <div>
              <label
                htmlFor="intro-role"
                className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Primary Discipline / Role
              </label>
              <input
                id="intro-role"
                type="text"
                value={draft.role}
                onChange={(e) => setDraft({ ...draft, role: e.target.value })}
                className="w-full px-3.5 py-2.5 min-h-[42px] text-sm bg-white dark:bg-[#081421] border border-slate-200 dark:border-[#224162] rounded-lg text-[#0B1F33] dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#1E4B7A] dark:focus:ring-[#93C5FD]"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="intro-tagline"
              className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
            >
              Headline Tagline
            </label>
            <input
              id="intro-tagline"
              type="text"
              value={draft.tagline}
              onChange={(e) => setDraft({ ...draft, tagline: e.target.value })}
              className="w-full px-3.5 py-2.5 min-h-[42px] text-sm bg-white dark:bg-[#081421] border border-slate-200 dark:border-[#224162] rounded-lg text-[#0B1F33] dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#1E4B7A] dark:focus:ring-[#93C5FD]"
              required
            />
          </div>

          <div>
            <label
              htmlFor="intro-paragraph-1"
              className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
            >
              Introduction (Lead Paragraph)
            </label>
            <textarea
              id="intro-paragraph-1"
              rows={3}
              value={draft.introduction}
              onChange={(e) => setDraft({ ...draft, introduction: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-[#081421] border border-slate-200 dark:border-[#224162] rounded-lg text-[#0B1F33] dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#1E4B7A] dark:focus:ring-[#93C5FD] resize-y"
              required
            />
          </div>

          <div>
            <label
              htmlFor="intro-paragraph-2"
              className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
            >
              Supporting Context
            </label>
            <textarea
              id="intro-paragraph-2"
              rows={2}
              value={draft.secondaryBio}
              onChange={(e) => setDraft({ ...draft, secondaryBio: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-[#081421] border border-slate-200 dark:border-[#224162] rounded-lg text-[#0B1F33] dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#1E4B7A] dark:focus:ring-[#93C5FD] resize-y"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="intro-location"
                className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Location
              </label>
              <input
                id="intro-location"
                type="text"
                value={draft.location}
                onChange={(e) => setDraft({ ...draft, location: e.target.value })}
                className="w-full px-3.5 py-2.5 min-h-[42px] text-sm bg-white dark:bg-[#081421] border border-slate-200 dark:border-[#224162] rounded-lg text-[#0B1F33] dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#1E4B7A] dark:focus:ring-[#93C5FD]"
              />
            </div>
            <div>
              <label
                htmlFor="intro-availability"
                className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Availability
              </label>
              <input
                id="intro-availability"
                type="text"
                value={draft.availability}
                onChange={(e) => setDraft({ ...draft, availability: e.target.value })}
                className="w-full px-3.5 py-2.5 min-h-[42px] text-sm bg-white dark:bg-[#081421] border border-slate-200 dark:border-[#224162] rounded-lg text-[#0B1F33] dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#1E4B7A] dark:focus:ring-[#93C5FD]"
              />
            </div>
            <div>
              <label
                htmlFor="intro-email"
                className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Contact Email
              </label>
              <input
                id="intro-email"
                type="email"
                value={draft.email}
                onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                className="w-full px-3.5 py-2.5 min-h-[42px] text-sm bg-white dark:bg-[#081421] border border-slate-200 dark:border-[#224162] rounded-lg text-[#0B1F33] dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#1E4B7A] dark:focus:ring-[#93C5FD]"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-[#1B3550] flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setDraft(DEFAULT_HOME_PROFILE)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-[#0B1F33] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#132E4A] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Reset Defaults</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 min-h-[40px] text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-[#0B1F33] border border-slate-200 dark:border-[#224162] hover:bg-slate-100 dark:hover:bg-[#132E4A] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 min-h-[40px] text-sm font-medium text-white dark:text-[#0B1F33] bg-[#0B1F33] hover:bg-[#143352] dark:bg-[#E2E8F0] dark:hover:bg-white rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Save Introduction
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
