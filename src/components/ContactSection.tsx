import { FormEvent, useState } from 'react';
import { Check, Copy, Mail, MapPin, Send, Sparkles } from 'lucide-react';
import { HomeProfile } from '../data/portfolioData';

interface ContactSectionProps {
  profile: HomeProfile;
}

export function ContactSection({ profile }: ContactSectionProps) {
  const [copied, setCopied] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorText, setErrorText] = useState('');

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!senderName.trim() || !senderEmail.trim() || !message.trim()) {
      setErrorText('Please complete your name, email address, and project note.');
      return;
    }
    setErrorText('');
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="py-16 lg:py-24 border-t border-slate-200 dark:border-[#1E3A5F] bg-white dark:bg-[#091829] transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left column: Rich Midnight Navy Showcase Card */}
          <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-[#0B1F33] via-[#102C4A] to-[#163F66] text-white p-6 sm:p-8 flex flex-col justify-between gap-8 border border-[#1E3A5F] shadow-sm">
            <div>
              <p className="text-sm font-semibold text-sky-300 mb-2">
                <span className="font-mono text-[#FBBF24] mr-2 tabular-nums">04.</span>
                Contact
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
                Start a conversation
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-300 max-w-[46ch]">
                Whether you need high-impact graphic design, social media content strategy, or
                support turning business data into clear reports, feel free to reach out directly.
              </p>
            </div>

            <div className="pt-6 border-t border-white/15 space-y-5">
              <div>
                <p className="text-xs font-medium text-sky-300">Direct Email</p>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-white hover:text-[#FBBF24] transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#FBBF24]" aria-hidden="true" />
                    <span>{profile.email}</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[34px] text-xs font-semibold text-[#0B1F33] bg-[#FBBF24] hover:bg-amber-300 rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-sky-300 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-white">Base</p>
                    <p className="mt-0.5">{profile.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Sparkles
                    className="w-4 h-4 text-[#FBBF24] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-semibold text-white">Availability</p>
                    <p className="mt-0.5">{profile.availability}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="h-full rounded-2xl border border-slate-200 dark:border-[#1E3A5F] bg-[#F8FAFC] dark:bg-[#0D2136] p-6 sm:p-8 flex flex-col justify-center">
              {submitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-11 h-11 rounded-full bg-[#1D4ED8] dark:bg-[#F59E0B] text-white dark:text-[#071320] flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#0B1F33] dark:text-white">
                    Note prepared for {profile.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, {senderName}. Your message has been formatted for{' '}
                    <span className="font-semibold text-[#0B1F33] dark:text-white">
                      {profile.email}
                    </span>
                    . You can also open it directly in your mail client below.
                  </p>
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={`mailto:${profile.email}?subject=${encodeURIComponent(
                        `Portfolio Inquiry from ${senderName}`
                      )}&body=${encodeURIComponent(
                        `${message}\n\nReply to: ${senderEmail}`
                      )}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[40px] bg-[#1D4ED8] hover:bg-[#1E40AF] dark:bg-[#F59E0B] dark:hover:bg-[#FBBF24] text-white dark:text-[#071320] text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0"
                    >
                      <Mail className="w-4 h-4" aria-hidden="true" />
                      <span>Open in Mail App</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setSenderName('');
                        setSenderEmail('');
                        setMessage('');
                      }}
                      className="px-4 py-2.5 min-h-[40px] bg-white dark:bg-[#0B1F33] border border-slate-200 dark:border-[#2B4F7A] hover:bg-slate-100 dark:hover:bg-[#133254] text-[#0B1F33] dark:text-slate-100 text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Send Another Note
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                      >
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="Ada Mensah"
                        className="w-full px-3.5 py-2.5 min-h-[44px] text-sm bg-white dark:bg-[#071320] border border-slate-200 dark:border-[#224162] rounded-lg text-[#0B1F33] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                      >
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        placeholder="ada@company.com"
                        className="w-full px-3.5 py-2.5 min-h-[44px] text-sm bg-white dark:bg-[#071320] border border-slate-200 dark:border-[#224162] rounded-lg text-[#0B1F33] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                      Project or Introduction
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share a brief overview of what you are building, timeline, and goals..."
                      className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-[#071320] border border-slate-200 dark:border-[#224162] rounded-lg text-[#0B1F33] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB] resize-y"
                      required
                    />
                  </div>

                  {errorText && (
                    <p role="alert" className="text-xs font-medium text-rose-600 dark:text-rose-400">
                      {errorText}
                    </p>
                  )}

                  <div className="flex items-center justify-between gap-4 pt-1">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Typical reply within 1–2 business days.
                    </p>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] bg-[#1D4ED8] hover:bg-[#1E40AF] dark:bg-[#F59E0B] dark:hover:bg-[#FBBF24] text-white dark:text-[#071320] text-sm font-semibold rounded-lg shadow-xs transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0D2136] cursor-pointer"
                    >
                      <span>Send Message</span>
                      <Send className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
