import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Guide Is On the Way | PeptideLaunch",
  description: "Your free 5-Peptide Recovery Guide is on the way. Before you go — see how to get results faster with the 10-Day Quick Start.",
};

const tripwireItems = [
  {
    name: "10-Day Recovery Roadmap",
    value: "$27",
    desc: "A day-by-day plan that turns the free overview into structured action — exactly what to focus on each day for the first 10 days.",
  },
  {
    name: "Daily Tracking Grid",
    value: "$17",
    desc: "A simple system to monitor trends instead of guessing. Track what matters without overcomplicating it.",
  },
  {
    name: "Quick Reference Sheets (BPC-157, TB-500, KPV)",
    value: "$19",
    desc: "One-page summaries for the 3 most-discussed compounds — what the research says, at a glance.",
  },
  {
    name: "Decision Day Framework",
    value: "$17",
    desc: "A clear checkpoint at Day 10 to evaluate what you've learned and decide your next steps with confidence.",
  },
];

function Disclaimer() {
  return (
    <p className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
      Educational use only. Research suggests these compounds may support recovery-related pathways, but evidence quality varies and much of the literature is preclinical or investigational. Nothing here is medical advice or a personal-use directive. These statements have not been evaluated by the FDA.
    </p>
  );
}

export default function ThankYouPage() {
  return (
    <div className="bg-[#0B1426] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(11,20,38,0.82)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="/" className="text-lg font-semibold uppercase tracking-[0.2em] text-white">
            PeptideLaunch
          </a>
        </div>
      </header>

      <main className="min-h-[calc(100vh-81px)]">
        {/* Confirmation */}
        <section className="border-b border-white/10 bg-[linear-gradient(180deg,#10203A_0%,#0B1426_100%)] px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-[2rem] border border-white/10 bg-white p-8 text-slate-900 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-10">
              <div className="inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                ✓ You&apos;re in
              </div>
              <h1 className="mt-4 text-3xl font-semibold text-[#1B2A4A] sm:text-4xl">
                Your guide is on its way! Check your inbox.
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
                The 5-Peptide Recovery Guide is heading to your email right now. While you wait — there&apos;s something below that can help you move faster.
              </p>
            </div>
          </div>
        </section>

        {/* Bridge + Tripwire Offer */}
        <section className="border-b border-white/10 bg-[#0B1426] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-10">
            {/* Bridge */}
            <div className="text-center">
              <h2 className="text-3xl font-semibold sm:text-4xl">Want to get results faster?</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                The free guide gives you the big picture. But most people get stuck on Day 1 because they don&apos;t know <strong className="text-white">where to start</strong> or <strong className="text-white">what to track</strong>.
              </p>
            </div>

            {/* The Problem */}
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
              <p className="text-lg leading-8 text-slate-200">
                Understanding the research is step one. But turning that understanding into a structured first 10 days — knowing what to focus on each day, what to track, and how to evaluate what you&apos;re learning — that&apos;s where most people stall.
              </p>
              <p className="mt-4 text-lg leading-8 text-slate-200">
                <strong className="text-[#67E8F9]">The free guide tells you WHAT.</strong> The Quick Start shows you <strong className="text-white">HOW</strong> — starting today.
              </p>
            </div>

            {/* Offer Card */}
            <div className="rounded-[2rem] border border-[#0D9488]/30 bg-[#0D9488]/10 p-8 sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#99F6E4]">One-time offer — only available on this page</p>
              <h3 className="mt-4 text-3xl font-semibold sm:text-4xl">The 10-Day Pain Relief Quick Start</h3>
              <p className="mt-4 text-lg leading-8 text-slate-200">
                Turn the free overview into a step-by-step first 10 days. Know exactly what to focus on, what to track, and how to evaluate your progress.
              </p>

              {/* Value Stack */}
              <div className="mt-8 space-y-4">
                {tripwireItems.map((item) => (
                  <div key={item.name} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-base font-semibold text-white">{item.name}</h4>
                        <p className="mt-1 text-sm leading-7 text-slate-300">{item.desc}</p>
                      </div>
                      <span className="shrink-0 rounded-full border border-[#67E8F9]/30 bg-[#67E8F9]/10 px-3 py-1 text-sm font-semibold text-[#67E8F9]">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="mt-8 rounded-[1.5rem] border border-white/15 bg-white/5 p-6 text-center">
                <div className="text-sm text-slate-300">If purchased separately</div>
                <div className="mt-1 text-4xl font-semibold text-white">$80</div>
                <div className="mt-2 text-lg text-slate-200">Your price right now: <span className="text-2xl font-semibold text-[#99F6E4]">$17</span></div>
                <p className="mt-2 text-sm text-slate-400">30-day money-back guarantee</p>
              </div>

              {/* Urgency */}
              <p className="mt-6 text-center text-sm font-medium text-[#FCD34D]">
                ⏳ This offer is only available right now on this page. If you leave, this pricing disappears.
              </p>

              {/* CTAs */}
              <div className="mt-8 space-y-4 text-center">
                <a
                  href="#checkout-17"
                  className="block rounded-full bg-white px-8 py-4 text-lg font-semibold text-[#1B2A4A] transition hover:bg-slate-100"
                >
                  Yes — Give Me the 10-Day Recovery Plan
                </a>
                <a
                  href="/upgrade"
                  className="inline-block text-sm text-slate-400 transition hover:text-slate-200"
                >
                  No thanks, I&apos;ll figure it out on my own →
                </a>
              </div>
            </div>

            <Disclaimer />
          </div>
        </section>
      </main>

      <footer className="bg-[#0B1426] px-4 py-10 text-sm text-slate-400 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="font-semibold uppercase tracking-[0.2em] text-white">PeptideLaunch</div>
            <p className="mt-2 max-w-2xl leading-7">
              For educational and research purposes only. Not medical advice. These statements have not been evaluated by the FDA.
            </p>
          </div>
          <div className="space-y-2 text-left md:text-right">
            <a href="mailto:hello@peptidelaunch.com" className="block text-white">hello@peptidelaunch.com</a>
            <div className="flex gap-4 md:justify-end">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
