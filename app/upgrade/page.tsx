import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Complete Recovery Research System | PeptideLaunch",
  description: "The full 30/60/90-day peptide recovery education framework. 6 pillars, 50+ citations, planning calendars, tracking worksheets, and complete research appendix.",
};

const valueStack = [
  {
    name: "6-Pillar Recovery Framework",
    value: "$147",
    desc: "Understand the key recovery pathways and how they fit together — the structural foundation everything else builds on.",
  },
  {
    name: "30/60/90-Day Planning Calendar",
    value: "$67",
    desc: "See how to organize the research over time with a phased approach instead of trying to absorb everything at once.",
  },
  {
    name: "Peptide Profile Library",
    value: "$57",
    desc: "Fast-reference pages for BPC-157, TB-500, GHK-Cu, SS-31, and KPV — what each is studied for and where it fits.",
  },
  {
    name: "Stacking + Timing Research Guide",
    value: "$47",
    desc: "How published research approaches compound combinations, sequencing, and timing — organized for easy comparison.",
  },
  {
    name: "Symptom + Function Tracking Worksheets",
    value: "$37",
    desc: "Monitor trends instead of guessing. Structured worksheets that help you organize notes and track what actually changes.",
  },
  {
    name: "Pattern Decoder + Troubleshooting Guide",
    value: "$47",
    desc: "Know what to adjust before you overcomplicate. Common patterns, decision points, and research-backed logic.",
  },
  {
    name: "Research Appendix + Citation Library",
    value: "$97",
    desc: "50+ curated citations with plain-English summaries — the evidence base that makes the whole system credible and verifiable.",
  },
];

const faqs = [
  {
    question: "How is this different from the free guide?",
    answer:
      "The free guide gives you the big picture — which peptides are most studied and why they matter. This is the complete system: the full 6-pillar framework, planning calendars, tracking worksheets, timing guides, and the entire research appendix. It's the difference between an overview and a comprehensive reference you can use for months.",
  },
  {
    question: "What if I already bought the 10-Day Quick Start?",
    answer:
      "The Quick Start covers the first 10 days. This picks up where it leaves off and extends through a full 90-day framework. Think of the Quick Start as the on-ramp — this is the complete highway.",
  },
  {
    question: "Is this a protocol or treatment plan?",
    answer:
      "No. This is an educational research framework. It organizes the published literature into a clear structure so you can understand it, discuss it with your provider, and make informed decisions. Nothing here is medical advice.",
  },
  {
    question: "What format is it in?",
    answer:
      "Digital PDF format — instant access. You'll receive it immediately after purchase, plus email delivery as a backup.",
  },
  {
    question: "What if I don't find it useful?",
    answer:
      "You're covered by the 60-Day Research Guarantee. Review the full system for 60 days. If it doesn't help you organize a clearer recovery plan, email us for a full refund. No hoops, no hassle.",
  },
  {
    question: "Why is the pricing so low?",
    answer:
      "This is introductory founder pricing. We're building the PeptideLaunch education library and want early adopters to get in at a price that makes it an obvious decision. It will increase.",
  },
];

function Disclaimer() {
  return (
    <p className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
      Educational use only. Research suggests these compounds may support recovery-related pathways, but evidence quality varies and much of the literature is preclinical or investigational. Nothing here is medical advice or a personal-use directive. These statements have not been evaluated by the FDA.
    </p>
  );
}

export default function UpgradePage() {
  return (
    <div className="bg-[#0B1426] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(11,20,38,0.82)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="/" className="text-lg font-semibold uppercase tracking-[0.2em] text-white">
            PeptideLaunch
          </a>
          <a href="#checkout" className="rounded-full bg-[#0D9488] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#14B8A6]">
            Get the Full System
          </a>
        </div>
      </header>

      <main className="min-h-[calc(100vh-81px)]">
        {/* Hero */}
        <section className="border-b border-white/10 bg-[linear-gradient(180deg,#10203A_0%,#0B1426_100%)] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#99F6E4]">The complete system</p>
            <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">The Complete Recovery Research System</h1>
            <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-slate-200">
              The full 30/60/90-day framework with every tool, every reference, and every tracking system in one place.
            </p>
          </div>
        </section>

        {/* The Problem */}
        <section className="border-b border-white/10 bg-[#1B2A4A] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-semibold sm:text-4xl">At some point, you need the full picture.</h2>
            <div className="mt-6 space-y-5 text-lg leading-8 text-slate-300">
              <p>
                Whether you&apos;re starting from the free guide or the 10-Day Quick Start, there comes a point where the overview isn&apos;t enough. You start asking deeper questions:
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "How do these compounds relate to each other?",
                  "What does the research say about timing and sequencing?",
                  "How do I track what's actually changing over 30, 60, 90 days?",
                  "Where's the full citation library so I can verify everything myself?",
                ].map((q) => (
                  <div key={q} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-base text-slate-200">
                    <span className="mr-2 text-[#67E8F9]">→</span> {q}
                  </div>
                ))}
              </div>
              <p>
                That&apos;s what this system is for. Not another overview — the <strong className="text-white">complete educational framework</strong> that organizes everything into a structured 90-day reference you can use for months.
              </p>
            </div>
          </div>
        </section>

        {/* Mechanism */}
        <section className="border-b border-white/10 bg-[#0B1426] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#99F6E4]">Why a structured framework matters</p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Random research leads to random results. Structure leads to clarity.</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                {
                  icon: "📊",
                  title: "Phased, not overwhelming",
                  desc: "The 30/60/90-day calendar breaks the research into manageable phases. You go deep only when you're ready.",
                },
                {
                  icon: "🔍",
                  title: "Evidence you can verify",
                  desc: "Every claim links to published research. The citation library gives you the tools to evaluate the evidence yourself.",
                },
                {
                  icon: "📋",
                  title: "Track trends, not guesses",
                  desc: "The tracking worksheets replace vague feelings with structured data. Know what's changing and what isn't.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
                  <div className="text-2xl">{item.icon}</div>
                  <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Value Stack */}
        <section className="border-b border-white/10 bg-[#1B2A4A] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#99F6E4]">Everything included</p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Here&apos;s what&apos;s inside the complete system</h2>
            </div>

            <div className="mt-10 space-y-4">
              {valueStack.map((item) => (
                <div key={item.name} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-300">{item.desc}</p>
                    </div>
                    <span className="shrink-0 rounded-full border border-[#67E8F9]/30 bg-[#67E8F9]/10 px-3 py-1 text-sm font-semibold text-[#67E8F9]">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing */}
            <div id="checkout" className="mt-10 rounded-[2rem] border border-[#0D9488]/30 bg-[#0D9488]/10 p-8 sm:p-10 text-center">
              <div className="text-sm text-slate-300">If purchased separately</div>
              <div className="mt-1 text-5xl font-semibold text-white">$499+</div>
              <div className="mt-4 text-lg text-slate-200">
                Founder pricing: <span className="text-3xl font-semibold text-[#99F6E4]">$67</span>
              </div>
              <p className="mt-2 text-sm text-slate-400">This pricing is introductory and will increase.</p>

              <a
                href="#checkout-67"
                className="mt-8 inline-block rounded-full bg-white px-10 py-4 text-lg font-semibold text-[#1B2A4A] transition hover:bg-slate-100"
              >
                Unlock the Full 30/60/90-Day Recovery System
              </a>
            </div>

            <Disclaimer />
          </div>
        </section>

        {/* Guarantee */}
        <section className="border-b border-white/10 bg-[#0B1426] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full border border-[#0D9488]/30 bg-[#0D9488]/10 text-3xl">
              🛡️
            </div>
            <h2 className="mt-6 text-3xl font-semibold">60-Day Research Guarantee</h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              Review the full system for 60 days. If the educational framework doesn&apos;t help you organize a clearer recovery plan, email us for a full refund. No hoops, no hassle, no questions about why.
            </p>
            <p className="mt-4 text-base text-slate-400">
              We built this to be genuinely useful. If it isn&apos;t for you, we don&apos;t want your money.
            </p>
          </div>
        </section>

        {/* Progression */}
        <section className="border-b border-white/10 bg-[#1B2A4A] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-semibold sm:text-4xl">The complete progression</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-300">
              Each layer builds on the last. You choose how deep to go.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                {
                  label: "Free Guide",
                  desc: "Understand the 5 peptides and the big picture.",
                  highlight: false,
                },
                {
                  label: "10-Day Quick Start",
                  desc: "The first 10 days organized and trackable.",
                  highlight: false,
                },
                {
                  label: "Full 90-Day System",
                  desc: "The complete framework with every tool, every reference, every worksheet.",
                  highlight: true,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`rounded-[1.5rem] border p-6 ${
                    item.highlight
                      ? "border-[#0D9488]/30 bg-[#0D9488]/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <h3 className={`text-lg font-semibold ${item.highlight ? "text-[#99F6E4]" : "text-white"}`}>{item.label}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{item.desc}</p>
                  {item.highlight && (
                    <p className="mt-3 text-xs font-semibold text-[#99F6E4]">← You are here</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b border-white/10 bg-[#0B1426] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#99F6E4]">FAQ</p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Your Questions, Answered</h2>
            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              {faqs.map((faq) => (
                <details key={faq.question} className="group rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <summary className="cursor-pointer list-none text-lg font-semibold">{faq.question}</summary>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold sm:text-4xl">Ready to see the full picture?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-300">
              The free guide gives you the overview. The Quick Start gives you the first 10 days. This gives you the complete 90-day system — every tool, every framework, every reference.
            </p>
            <a
              href="#checkout-67"
              className="mt-8 inline-block rounded-full bg-[#0D9488] px-10 py-4 text-lg font-semibold text-white transition hover:bg-[#14B8A6]"
            >
              Unlock the Full 30/60/90-Day Recovery System — $67
            </a>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-400">
              <span>60-Day Research Guarantee</span>
              <span>•</span>
              <span>Instant digital access</span>
              <span>•</span>
              <span>Founder pricing — will increase</span>
            </div>
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
