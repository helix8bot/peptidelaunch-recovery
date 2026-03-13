"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type FunnelStage = "landing" | "tripwire" | "core";

type Citation = {
  title: string;
  journal: string;
  takeaway: string;
};

const citations: Citation[] = [
  {
    title: "Seiwerth et al. 2018",
    journal: "Current Pharmaceutical Design",
    takeaway:
      "Research suggests BPC-157 may support angiogenesis and blood-vessel signaling relevant to tissue repair pathways in preclinical models.",
  },
  {
    title: "Chang et al. 2011",
    journal: "Journal of Applied Physiology",
    takeaway:
      "Studies indicate BPC-157 may improve tendon-healing quality and functional recovery markers in preclinical models.",
  },
  {
    title: "Goldstein et al. 2012",
    journal: "Expert Opinion on Biological Therapy",
    takeaway:
      "Reviews describe thymosin beta-4 / TB-500 biology as relevant to wound-healing, migration, and repair signaling research.",
  },
  {
    title: "Pickart & Margolina 2018",
    journal: "International Journal of Molecular Sciences",
    takeaway:
      "Research review suggests GHK-Cu may influence collagen signaling, remodeling, and repair-related gene expression.",
  },
];

const faqs = [
  {
    question: "Is this medical advice?",
    answer:
      "No. PeptideLaunch provides educational research compilation only. Nothing on this page is medical advice, diagnosis, treatment, or a personal recommendation.",
  },
  {
    question: "What will I get in the free guide?",
    answer:
      "A concise research-first overview of the 5 peptides most discussed in the recovery conversation, what pathways they are studied for, and how to think about them without guesswork.",
  },
  {
    question: "What makes the 10-Day Recovery Plan different?",
    answer:
      "The 10-Day Plan turns the free overview into a structured first-10-days roadmap with a daily tracking grid, quick-reference sheets, and a clear bridge into the full system.",
  },
  {
    question: "What makes the full 30/60/90-Day system different?",
    answer:
      "It organizes the complete educational framework: the 6-pillar recovery model, mechanism summaries, study notes, planning calendar, tracking worksheets, and a full research appendix with 50+ citations.",
  },
  {
    question: "Do I need injections or dosing guidance?",
    answer:
      "No. This page and funnel stay educational and research-first. The focus is on understanding the literature, mechanisms, and framework clearly.",
  },
  {
    question: "What if it's not for me?",
    answer:
      "The free guide costs nothing. The 10-Day Plan has a 30-day money-back guarantee. The full system has a 60-Day Research Guarantee — if the educational framework doesn't help you organize a clearer recovery plan, email us for a full refund.",
  },
];

const painPoints = [
  "Still cycling through painkillers, procedures, and short-lived relief without a coherent framework?",
  "Still hearing conflicting opinions without understanding which recovery pathway each compound is actually studied for?",
  "Still trying to compare BPC-157, TB-500, GHK-Cu, KPV, and SS-31 from random Reddit posts and forum fragments?",
  "Still unsure what belongs in a serious recovery-research conversation versus what is just hype and marketing?",
];

const coreValueStack = [
  {
    name: "The 6-Pillar Recovery Framework",
    value: "$147",
    body: "Understand the key recovery pathways and how they fit together — the structural foundation everything else builds on.",
  },
  {
    name: "30/60/90-Day Planning Calendar",
    value: "$67",
    body: "See how to organize the research over time with a phased approach instead of trying to absorb everything at once.",
  },
  {
    name: "Peptide Profile Library",
    value: "$57",
    body: "Fast-reference pages for BPC-157, TB-500, GHK-Cu, SS-31, and KPV — what each is studied for and where it fits.",
  },
  {
    name: "Stacking + Timing Research Guide",
    value: "$47",
    body: "How published research approaches compound combinations, sequencing, and timing — organized for easy comparison.",
  },
  {
    name: "Symptom + Function Tracking Worksheets",
    value: "$37",
    body: "Monitor trends instead of guessing. Structured worksheets that help you organize notes and track what matters.",
  },
  {
    name: "Pattern Decoder + Troubleshooting Guide",
    value: "$47",
    body: "Know what to adjust before you overcomplicate the stack. Common patterns, decision points, and research-backed logic.",
  },
  {
    name: "Research Appendix + Citation Library",
    value: "$97",
    body: "50+ curated citations with plain-English summaries — the evidence base that makes the whole system credible.",
  },
];

const tripwireValueStack = [
  { name: "10-Day Recovery Roadmap", value: "$27" },
  { name: "Daily Tracking Grid", value: "$17" },
  { name: "Quick Reference Sheets", value: "$19" },
  { name: "Decision Day Framework", value: "$17" },
];

const proofStats = [
  { value: "50+", label: "peer-reviewed studies cited" },
  { value: "40", label: "page comprehensive research guide" },
  { value: "15", label: "page quick-start framework" },
  { value: "11", label: "page overview guide" },
];

const photos = {
  hero: "https://images.unsplash.com/photo-1626440861759-b3d7e45ee88e?w=1200&q=80",
  pain: "https://images.unsplash.com/photo-1562771379-eafdca7a02f8?w=800&q=80",
  research: "https://images.unsplash.com/photo-1614308459036-779d0dfe51ff?w=800&q=80",
  stack: "https://images.unsplash.com/photo-1707944746058-4da338d0f827?w=800&q=80",
  final: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1200&q=80",
  tripwire: "https://images.unsplash.com/photo-1626440861747-a723ff8f3fb1?w=800&q=80",
  core: "https://images.unsplash.com/photo-1630057105795-d858189bee44?w=800&q=80",
};

function Disclaimer() {
  return (
    <p className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
      Educational use only. Research suggests these compounds may support recovery-related pathways, but evidence quality varies and much of the literature is preclinical or investigational. Nothing here is medical advice or a personal-use directive. These statements have not been evaluated by the FDA.
    </p>
  );
}

function PhotoCard({ src, alt, className = "", eager = false }: { src: string; alt: string; className?: string; eager?: boolean }) {
  return (
    <div className={`overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_24px_60px_rgba(15,23,42,0.18)] ${className}`}>
      <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} className="h-full w-full object-cover" />
    </div>
  );
}

export default function Home() {
  const [stage, setStage] = useState<FunnelStage>("landing");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const savedStage = window.localStorage.getItem("recoveryFunnelStage") as FunnelStage | null;
    const savedName = window.localStorage.getItem("recoveryLeadName");
    const savedEmail = window.localStorage.getItem("recoveryLeadEmail");

    if (savedStage === "tripwire" || savedStage === "core") setStage(savedStage);
    if (savedName) setName(savedName);
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const ctaLabel = useMemo(() => {
    if (stage === "tripwire") return "Get the 10-Day Recovery Plan";
    if (stage === "core") return "Unlock the Full Recovery System";
    return "Get the 5-Peptide Recovery Guide";
  }, [stage]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = { name, email, source: "pain-recovery-landing-page", submittedAt: new Date().toISOString() };

      window.localStorage.setItem("recoveryLeadName", name);
      window.localStorage.setItem("recoveryLeadEmail", email);
      window.localStorage.setItem("recoveryFunnelStage", "tripwire");

      await fetch("https://services.leadconnectorhq.com/hooks/recovery-optin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        mode: "cors",
      }).catch(() => null);

      setSubmitted(true);
      setStage("tripwire");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function skipTripwire() {
    window.localStorage.setItem("recoveryFunnelStage", "core");
    setStage("core");
  }

  function advanceFromTripwire() {
    window.localStorage.setItem("recoveryFunnelStage", "core");
    setStage("core");
  }

  return (
    <div className="bg-[#0B1426] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(11,20,38,0.82)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#top" className="text-lg font-semibold uppercase tracking-[0.2em] text-white">
            PeptideLaunch
          </a>
          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a href="#problem">Problem</a>
            <a href="#mechanism">How It Works</a>
            <a href="#proof">Research</a>
            <a href="#stack">What You Get</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a href={stage === "landing" ? "#optin" : "#offer"} className="rounded-full bg-[#0D9488] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#14B8A6]">
            {ctaLabel}
          </a>
        </div>
      </header>

      {/* ===== LANDING STATE ===== */}
      {stage === "landing" && (
        <main id="top">

          {/* SECTION 1: HERO — Triple Hook + VSL + Opt-in */}
          <section className="relative isolate overflow-hidden border-b border-white/10">
            <img src={photos.hero} alt="Athlete stretching during active recovery session" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,20,38,0.94)_0%,rgba(11,20,38,0.78)_45%,rgba(11,20,38,0.58)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(13,148,136,0.35),transparent_35%)]" />
            <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-24">
              <div className="space-y-8">
                <div className="inline-flex rounded-full border border-[#0D9488]/40 bg-[#0D9488]/15 px-4 py-2 text-sm text-[#99F6E4]">
                  Research-first education for the pain-management loop
                </div>

                {/* Triple Hook */}
                <div className="space-y-5">
                  <p className="text-xl font-medium text-[#67E8F9] sm:text-2xl">Still stuck in the pain-management loop?</p>
                  <h1 className="max-w-4xl text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                    Most people keep changing treatments without ever understanding which recovery pathway they&apos;re actually trying to support.
                  </h1>
                  <p className="max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
                    This free guide shows the 5 peptides most studied for recovery support — and how to think about them clearly.
                  </p>
                </div>

                {/* VSL Video */}
                <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.4)]" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    src="https://drive.google.com/file/d/16VqMfFPjSFW9_iHf57mjhs2tPKVrm12i/preview"
                    className="absolute inset-0 h-full w-full"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title="Pain Recovery VSL"
                  />
                </div>

                {/* Subheadline */}
                <p className="max-w-2xl text-base leading-7 text-slate-300">
                  Get the free guide that breaks down the 5 peptides most studied in the recovery conversation — and see why people start with a simple 10-day framework before committing to a full 30/60/90-day system.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <a href="#optin" className="rounded-full bg-[#0D9488] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#14B8A6]">
                    Get the 5-Peptide Recovery Guide
                  </a>
                  <a href="#stack" className="rounded-full border border-white/15 px-6 py-4 text-base font-semibold text-white transition hover:bg-white/5">
                    See What&apos;s Inside
                  </a>
                </div>

                {/* Stat tiles — NO pricing */}
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    { value: "50+", label: "peer-reviewed studies referenced" },
                    { value: "3-Step", label: "recovery education framework" },
                    { value: "7–14", label: "day initial research window" },
                    { value: "Instant", label: "access to the free guide" },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                      <div className="text-3xl font-semibold text-[#67E8F9]">{stat.value}</div>
                      <div className="mt-2 text-sm leading-6 text-slate-200">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <Disclaimer />
              </div>

              {/* Opt-in Form */}
              <div id="optin" className="rounded-[2rem] border border-white/10 bg-white p-6 text-slate-900 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-8">
                <div className="mb-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0D9488]">Free guide</p>
                  <h2 className="mt-3 text-3xl font-semibold text-[#1B2A4A]">Get the 5 Peptides Most Studied in the Recovery Conversation</h2>
                  <p className="mt-3 text-base leading-7 text-slate-600">
                    Enter your name and email for instant access. Then see the one-time 10-day Quick Start that turns the overview into a clean first step.
                  </p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">First name</label>
                    <input required value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-base outline-none transition focus:border-[#0D9488] focus:ring-4 focus:ring-[#0D9488]/10" placeholder="Perry" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Email address</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-base outline-none transition focus:border-[#0D9488] focus:ring-4 focus:ring-[#0D9488]/10" placeholder="you@example.com" />
                  </div>
                  <button type="submit" disabled={loading} className="w-full rounded-2xl bg-[#0D9488] px-4 py-4 text-base font-semibold text-white transition hover:bg-[#14B8A6] disabled:cursor-not-allowed disabled:opacity-70">
                    {loading ? "Submitting..." : "Get the 5-Peptide Recovery Guide"}
                  </button>
                  <p className="text-sm leading-6 text-slate-500">We&apos;ll also send occasional peptide education and funnel follow-up. Unsubscribe anytime.</p>
                  {submitted && <p className="text-sm font-medium text-emerald-600">Success — redirecting you to the quick-start offer below.</p>}
                  {error && <p className="text-sm font-medium text-rose-600">{error}</p>}
                </form>
              </div>
            </div>
          </section>

          {/* SECTION 2: PROBLEM / FAILED SOLUTIONS */}
          <section id="problem" className="border-b border-white/10 bg-[#1B2A4A] px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <PhotoCard src={photos.pain} alt="Person holding painful shoulder during training" className="h-[320px] lg:h-[520px]" />
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#99F6E4]">The real problem</p>
                <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">The frustration isn&apos;t just pain. It&apos;s trying to make sense of too many fragmented answers.</h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                  Most people bounce between symptom suppression, forum advice, and scattered compound talk without ever getting a simple research-first framework they can actually trust. Sound familiar?
                </p>
                <div className="mt-8 grid gap-4">
                  {painPoints.map((point) => (
                    <div key={point} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 text-sm leading-7 text-slate-200">
                      <span className="mr-2 text-[#67E8F9]">→</span> {point}
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-base leading-7 text-slate-300">
                  If you&apos;re nodding along, you don&apos;t need another random product recommendation. You need a framework that organizes the research so you can think clearly.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a href="#optin" className="rounded-full bg-[#0D9488] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#14B8A6]">
                    Get the 5-Peptide Recovery Guide
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: MECHANISM / WHY THIS WORKS */}
          <section id="mechanism" className="border-b border-white/10 bg-[linear-gradient(180deg,#10203A_0%,#0B1426_100%)] px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#99F6E4]">Why this approach is different</p>
                <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">This isn&apos;t another hype page. It&apos;s a cleaner way to understand mechanism, evidence, and next steps.</h2>
                <div className="mt-6 space-y-5 text-base leading-8 text-slate-300">
                  <p>
                    Most recovery content online either oversimplifies (just take BPC-157!) or overwhelms with contradictory claims. Neither helps you make a clear decision.
                  </p>
                  <p>
                    This system organizes the recovery conversation into a simple progression: <strong className="text-white">overview first</strong> (free guide), <strong className="text-white">implementation bridge second</strong> (10-day plan), <strong className="text-white">full system third</strong> (30/60/90-day framework).
                  </p>
                  <p>
                    Each layer builds on the last. The free guide explains what each peptide is most commonly studied for. The Quick Start maps the first 10 days. The full system turns that into a comprehensive educational framework you can reference for months.
                  </p>
                  <p>
                    That progression means you never feel overwhelmed — you only go deeper when you&apos;re ready.
                  </p>
                </div>
                <div className="mt-8">
                  <Disclaimer />
                </div>
              </div>
              <div className="space-y-4">
                <PhotoCard src={photos.research} alt="Researcher studying samples in a modern laboratory" className="h-[280px]" />
                <div className="grid gap-4">
                  {[
                    { step: "Step 1", title: "Understand the landscape", desc: "The free guide gives you the big picture: 5 peptides, what they're studied for, and how to think about them." },
                    { step: "Step 2", title: "Organize the first 10 days", desc: "The Quick Start turns the overview into a daily tracking plan so you can build structured knowledge." },
                    { step: "Step 3", title: "Go deep with the full system", desc: "The 30/60/90-day framework gives you everything: profiles, worksheets, timing guides, and the full research appendix." },
                  ].map((item) => (
                    <div key={item.step} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                      <div className="text-sm font-semibold text-[#67E8F9]">{item.step}</div>
                      <h3 className="mt-1 text-lg font-semibold text-white">{item.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-300">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: PROOF BLOCK */}
          <section id="proof" className="border-b border-white/10 bg-[#1B2A4A] px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#99F6E4]">The research behind it</p>
                <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Built on real science, not internet hype</h2>
                <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-300">
                  Every claim in this system traces back to published research. Here&apos;s the scope of what you&apos;re getting access to.
                </p>
              </div>

              {/* Proof stats */}
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {proofStats.map((stat) => (
                  <div key={stat.label} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm">
                    <div className="text-4xl font-semibold text-[#67E8F9]">{stat.value}</div>
                    <div className="mt-2 text-sm leading-6 text-slate-200">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Key citations */}
              <div className="mt-10 grid gap-4 lg:grid-cols-2">
                {citations.map((citation) => (
                  <article key={citation.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                    <div className="text-sm font-semibold uppercase tracking-[0.15em] text-[#67E8F9]">{citation.journal}</div>
                    <h3 className="mt-2 text-xl font-semibold text-white">{citation.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{citation.takeaway}</p>
                  </article>
                ))}
              </div>

              <div className="mt-10 text-center">
                <a href="#optin" className="inline-flex rounded-full bg-[#0D9488] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#14B8A6]">
                  Get the 5-Peptide Recovery Guide
                </a>
              </div>
            </div>
          </section>

          {/* SECTION 5: OFFER / VALUE STACK */}
          <section id="stack" className="border-b border-white/10 bg-[#0B1426] px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#99F6E4]">What you get</p>
                <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Inside the Full 30/60/90-Day Recovery System</h2>
                <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-300">
                  Here&apos;s everything included — and what each piece would cost if sold separately.
                </p>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {coreValueStack.map((item) => (
                  <div key={item.name} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                      <span className="shrink-0 rounded-full border border-[#67E8F9]/30 bg-[#67E8F9]/10 px-3 py-1 text-sm font-semibold text-[#67E8F9]">{item.value}</span>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{item.body}</p>
                  </div>
                ))}
              </div>

              {/* Total value callout */}
              <div className="mt-10 rounded-[1.75rem] border border-[#0D9488]/30 bg-[#0D9488]/10 p-8 text-center">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#99F6E4]">Total stacked value</div>
                <div className="mt-2 text-5xl font-semibold text-white">$499+</div>
                <p className="mt-3 text-lg leading-8 text-slate-200">Founder launch pricing: <span className="font-semibold text-white">$67</span></p>
                <p className="mt-1 text-sm text-slate-300">This pricing is introductory and will increase.</p>
              </div>
            </div>
          </section>

          {/* SECTION 6: PRICING / GUARANTEE / URGENCY */}
          <section id="offer" className="border-b border-white/10 bg-[#1B2A4A] px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#99F6E4]">Choose your path</p>
                <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Start free. Then choose the layer that matches your pace.</h2>
              </div>
              <div className="mt-10 grid gap-5 lg:grid-cols-3">
                {/* Free tier */}
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#67E8F9]">Free</div>
                  <h3 className="mt-3 text-2xl font-semibold">5-Peptide Recovery Guide</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">The research-first overview that helps you understand what each peptide is most studied for and why the recovery conversation matters.</p>
                  <div className="mt-6">
                    <a href="#optin" className="block rounded-full border border-white/15 px-6 py-4 text-center text-base font-semibold text-white transition hover:bg-white/5">
                      Get the 5-Peptide Recovery Guide
                    </a>
                  </div>
                </div>

                {/* Quick Start — highlighted */}
                <div className="rounded-[2rem] border border-[#0D9488]/30 bg-[#0D9488]/10 p-8 backdrop-blur-sm">
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#99F6E4]">Quick Start</div>
                  <h3 className="mt-3 text-2xl font-semibold">10-Day Recovery Plan</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-200">The first 10 days mapped out — what to track, what to watch for, and how to know whether you should continue into the full system.</p>
                  <div className="mt-4 space-y-2">
                    {tripwireValueStack.map((item) => (
                      <div key={item.name} className="flex items-center justify-between text-sm text-slate-200">
                        <span>{item.name}</span>
                        <span className="text-[#67E8F9]">{item.value}</span>
                      </div>
                    ))}
                    <div className="border-t border-white/10 pt-2">
                      <div className="flex items-center justify-between text-sm font-semibold text-white">
                        <span>Your price today</span>
                        <span className="text-[#99F6E4]">$17</span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-slate-300">30-day money-back guarantee</p>
                </div>

                {/* Full System */}
                <div className="rounded-[2rem] border border-white/10 bg-white p-8 text-slate-900">
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0D9488]">Full System</div>
                  <h3 className="mt-3 text-2xl font-semibold text-[#1B2A4A]">30/60/90-Day Recovery System</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">The complete educational framework with the 6-pillar model, profile library, planning calendar, tracking worksheets, and full research appendix.</p>
                  <div className="mt-4 rounded-xl bg-slate-50 p-4">
                    <div className="text-sm text-slate-500">Total value: $499+</div>
                    <div className="mt-1 text-2xl font-semibold text-[#0D9488]">Founder pricing: $67</div>
                    <p className="mt-1 text-xs text-slate-400">This pricing is introductory and will increase.</p>
                  </div>
                  <p className="mt-3 text-xs text-slate-500">60-Day Research Guarantee — if it doesn&apos;t help you organize a clearer recovery plan, email us for a full refund.</p>
                </div>
              </div>

              {/* Guarantee callout */}
              <div className="mt-10 rounded-[1.75rem] border border-white/10 bg-white/5 p-8 text-center">
                <h3 className="text-2xl font-semibold">60-Day Research Guarantee</h3>
                <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-slate-300">
                  Review the full system for 60 days. If the educational framework doesn&apos;t help you organize a clearer recovery plan, email us for a full refund. No hoops, no hassle.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 7: FAQ + FINAL CTA */}
          <section id="faq" className="border-b border-white/10 bg-[#0B1426] px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#99F6E4]">FAQ</p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Questions people ask before they move.</h2>
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
          <section className="relative isolate overflow-hidden border-b border-white/10 px-4 py-16 sm:px-6 lg:px-8">
            <img src={photos.final} alt="Hiker reaching a mountain summit at golden hour" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,20,38,0.78),rgba(11,20,38,0.9))]" />
            <div className="relative mx-auto max-w-5xl text-center">
              <h2 className="text-3xl font-semibold sm:text-5xl">Start with clarity. Go deeper only when you&apos;re ready.</h2>
              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-200">
                Free guide first. 10-day plan second. Full 30/60/90-day system third. That&apos;s the entire path — and you choose how far to go.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a href="#optin" className="rounded-full bg-[#0D9488] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#14B8A6]">Get the 5-Peptide Recovery Guide</a>
                <a href="#offer" className="rounded-full border border-white/15 px-6 py-4 text-base font-semibold text-white transition hover:bg-white/5">See All Three Options</a>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-200">
                <span className="rounded-full border border-white/10 px-4 py-2">50+ peer-reviewed studies</span>
                <span className="rounded-full border border-white/10 px-4 py-2">60-Day Research Guarantee</span>
                <span className="rounded-full border border-white/10 px-4 py-2">Instant digital access</span>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* ===== TRIPWIRE + CORE STATES ===== */}
      {stage !== "landing" && (
        <main className="min-h-[calc(100vh-81px)] bg-[linear-gradient(180deg,#0B1426_0%,#10203A_100%)] px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-8">

            {/* Thank-you header */}
            <section className="rounded-[2rem] border border-white/10 bg-white p-8 text-slate-900 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0D9488]">Your guide is on the way</p>
              <h1 className="mt-4 text-3xl font-semibold text-[#1B2A4A] sm:text-4xl">
                {name ? `${name}, your free recovery guide is on the way.` : "Your free recovery guide is on the way."}
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
                Watch for it at <strong>{email || "your inbox"}</strong>. Before you leave, there&apos;s a one-time offer below.
              </p>
            </section>

            {/* TRIPWIRE STATE */}
            {stage === "tripwire" && (
              <section className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
                <div className="rounded-[2rem] border border-[#0D9488]/30 bg-[#0D9488]/10 p-8 text-white">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#99F6E4]">One-time offer</p>
                  <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Before You Leave — Turn the Free Guide Into a 10-Day Plan</h2>
                  <p className="mt-4 text-lg leading-8 text-slate-200">
                    The free guide gives you the research landscape. This turns it into the first 10 days mapped out — what to track, what to watch for, and how to know whether you should continue into the full system.
                  </p>

                  {/* Tripwire value stack */}
                  <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#67E8F9]">What&apos;s included</p>
                    <div className="mt-4 space-y-3">
                      {tripwireValueStack.map((item) => (
                        <div key={item.name} className="flex items-center justify-between text-sm text-slate-200">
                          <span>{item.name}</span>
                          <span className="font-semibold text-[#67E8F9]">{item.value} value</span>
                        </div>
                      ))}
                      <div className="border-t border-white/10 pt-3">
                        <div className="flex items-center justify-between">
                          <span className="text-base font-semibold text-white">Your price today</span>
                          <span className="text-2xl font-semibold text-[#99F6E4]">$17</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-slate-300">30-day money-back guarantee. If the first 10 days help you see a clear signal, the next step is the full 30/60/90-day system that shows you how to build on that momentum.</p>

                  <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                    <a href="https://checkout.example.com/pain-recovery-quick-start" className="rounded-full bg-white px-6 py-4 text-center text-base font-semibold text-[#1B2A4A] transition hover:bg-slate-100">
                      Yes — Give Me the 10-Day Recovery Plan
                    </a>
                    <button onClick={advanceFromTripwire} className="rounded-full border border-white/15 px-6 py-4 text-base font-semibold text-white transition hover:bg-white/5">
                      I bought it — show me the full system
                    </button>
                    <button onClick={skipTripwire} className="rounded-full border border-white/15 px-6 py-4 text-base font-semibold text-white transition hover:bg-white/5">
                      Skip This — Show Me the Full Recovery System
                    </button>
                  </div>
                </div>
                <aside className="space-y-6">
                  <PhotoCard src={photos.tripwire} alt="Athlete in post-workout recovery stretch" className="h-[250px]" />
                  <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-white">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#67E8F9]">The progression</p>
                    <div className="mt-5 space-y-4 text-sm leading-7 text-slate-300">
                      <p><strong className="text-white">Free guide</strong> = understand the 5 peptides and the big picture.</p>
                      <p><strong className="text-white">$17 Quick Start</strong> = the first 10 days organized and trackable.</p>
                      <p><strong className="text-white">$67 Full System</strong> = the complete 30/60/90-day educational framework.</p>
                    </div>
                  </div>
                </aside>
              </section>
            )}

            {/* CORE STATE */}
            {stage === "core" && (
              <section className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-white">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#99F6E4]">Full system</p>
                  <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Unlock the Full 30/60/90-Day Recovery System</h2>
                  <p className="mt-4 text-lg leading-8 text-slate-200">
                    A research-first digital system that helps you move from random peptide guesses and symptom chasing to a structured 30/60/90-day recovery framework with timing, tracking, and protocol logic built in.
                  </p>
                  <p className="mt-3 text-base leading-7 text-slate-300">
                    The Quick Start gives you the first 10 days. This is the complete operating system for the next 90.
                  </p>

                  {/* Core value stack */}
                  <div className="mt-8 space-y-3">
                    {coreValueStack.map((item) => (
                      <div key={item.name} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
                        <span className="text-slate-200">{item.name}</span>
                        <span className="font-semibold text-[#67E8F9]">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                      <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#67E8F9]">Total value</div>
                      <div className="mt-2 text-3xl font-semibold">$499+</div>
                    </div>
                    <div className="rounded-[1.5rem] border border-[#0D9488]/30 bg-[#0D9488]/10 p-5">
                      <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#99F6E4]">Founder pricing</div>
                      <div className="mt-2 text-3xl font-semibold">$67</div>
                      <p className="mt-1 text-xs text-slate-300">This pricing is introductory and will increase.</p>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <a href="https://checkout.example.com/peptide-pain-recovery-protocol" className="rounded-full bg-[#0D9488] px-6 py-4 text-center text-base font-semibold text-white transition hover:bg-[#14B8A6]">
                      Unlock the Full 30/60/90-Day Recovery System
                    </a>
                    <a href="/#faq" className="rounded-full border border-white/15 px-6 py-4 text-center text-base font-semibold text-white transition hover:bg-white/5">
                      Review FAQs
                    </a>
                  </div>
                </div>
                <aside className="space-y-6">
                  <PhotoCard src={photos.core} alt="Healthy active person resting after exercise" className="h-[250px]" />
                  <div className="rounded-[2rem] border border-white/10 bg-white p-8 text-slate-900">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0D9488]">60-Day Research Guarantee</p>
                    <p className="mt-3 text-sm leading-7 text-slate-700">
                      Review the full system for 60 days. If the educational framework doesn&apos;t help you organize a clearer recovery plan, email us for a full refund. No hoops, no hassle.
                    </p>
                  </div>
                  <div className="rounded-[2rem] border border-white/10 bg-white p-8 text-slate-900">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0D9488]">What&apos;s included</p>
                    <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-700">
                      <li>• 6-Pillar Recovery Framework</li>
                      <li>• 30/60/90-Day Planning Calendar</li>
                      <li>• Peptide Profile Library (BPC-157, TB-500, GHK-Cu, SS-31, KPV)</li>
                      <li>• Stacking + Timing Research Guide</li>
                      <li>• Symptom + Function Tracking Worksheets</li>
                      <li>• Pattern Decoder + Troubleshooting Guide</li>
                      <li>• Research Appendix + 50+ Citations</li>
                    </ul>
                  </div>
                </aside>
              </section>
            )}
          </div>
        </main>
      )}

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
