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
    question: "What makes the $17 Quick Start different?",
    answer:
      "The Quick Start turns the free overview into a simple 10-day research review plan with a daily tracking grid, quick-reference sheets, and a cleaner bridge into the full system.",
  },
  {
    question: "What makes the $67 system different?",
    answer:
      "It organizes the full 30/60/90-day educational framework: mechanism summaries, study notes, value-stack tools, tracking worksheets, and a research appendix in one place.",
  },
  {
    question: "Do I need injections or dosing guidance?",
    answer:
      "No. This page and funnel stay educational and research-first. The focus is on understanding the literature, mechanisms, and framework clearly.",
  },
];

const painPoints = [
  "Still cycling through painkillers, procedures, and short-lived relief?",
  "Still hearing different opinions without a clear framework for what each compound is actually studied for?",
  "Still trying to compare BPC-157, TB-500, GHK-Cu, KPV, and SS-31 from random posts and forum fragments?",
  "Still unsure what belongs in a simple recovery-research conversation versus what is just hype?",
];

const valueStack = [
  {
    name: "5-Peptide Recovery Research Guide",
    value: "$27 value",
    body: "A clean beginner-friendly breakdown of the 5 peptides most often discussed in the recovery conversation.",
  },
  {
    name: "10-Day Recovery Research Quick Start",
    value: "$27 value",
    body: "A simple first-10-days review plan so you know what to read, compare, and track without spinning in circles.",
  },
  {
    name: "30/60/90-Day Recovery System",
    value: "$147 value",
    body: "The complete framework that organizes the research conversation into a premium digital system.",
  },
  {
    name: "Peptide Profile Library",
    value: "$57 value",
    body: "Fast-reference pages for BPC-157, TB-500, GHK-Cu, KPV, SS-31, and the role each plays in the broader conversation.",
  },
  {
    name: "Tracking Worksheets + Decision Frameworks",
    value: "$47 value",
    body: "Worksheets that help readers organize notes, compare studies, and make sense of the landscape more clearly.",
  },
  {
    name: "Research Appendix + Citation Library",
    value: "$97 value",
    body: "Curated citations and plain-English summaries that make the material feel structured instead of scattered.",
  },
];

const tripwireBullets = [
  "10-day research review roadmap",
  "Daily tracking grid for the first 10 days",
  "Quick-reference pages for BPC-157, TB-500, and KLOW",
  "Decision framework for what to study next",
  "30-day money-back guarantee",
];

const coreBullets = [
  "30/60/90-day educational framework",
  "Peptide profile library and mechanism summaries",
  "Tracking worksheets and decision tools",
  "Research appendix and citation library",
  "60-Day Research Guarantee",
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
    if (stage === "tripwire") return "See the 10-Day Quick Start";
    if (stage === "core") return "See the Full Recovery System";
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
            <a href="#research">Research</a>
            <a href="#stack">What You Get</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a href={stage === "landing" ? "#optin" : "#offer"} className="rounded-full bg-[#0D9488] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#14B8A6]">
            {ctaLabel}
          </a>
        </div>
      </header>

      {stage === "landing" && (
        <main id="top">
          <section className="relative isolate overflow-hidden border-b border-white/10">
            <img src={photos.hero} alt="Athlete stretching during active recovery session" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,20,38,0.94)_0%,rgba(11,20,38,0.78)_45%,rgba(11,20,38,0.58)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(13,148,136,0.35),transparent_35%)]" />
            <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-24">
              <div className="space-y-8">
                <div className="inline-flex rounded-full border border-[#0D9488]/40 bg-[#0D9488]/15 px-4 py-2 text-sm text-[#99F6E4]">
                  Research-first education for the pain-management loop
                </div>
                <div className="space-y-5">
                  <h1 className="max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                    Still stuck in the pain-management loop? Discover the recovery-support pathways serious researchers study when symptom chasing stops working.
                  </h1>
                  <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.4)]" style={{ paddingBottom: "56.25%" }}>
                    <iframe
                      src="https://drive.google.com/file/d/16VqMfFPjSFW9_iHf57mjhs2tPKVrm12i/preview"
                      className="absolute inset-0 h-full w-full"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      title="Pain Recovery VSL"
                    />
                  </div>
                  <p className="max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
                    Get the free guide that breaks down the 5 peptides most studied in the recovery conversation — and see why people start with a simple 10-day framework before moving into a full 30/60/90-day system.
                  </p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <a href="#optin" className="rounded-full bg-[#0D9488] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#14B8A6]">
                    Get the 5-Peptide Recovery Guide
                  </a>
                  <a href="#stack" className="rounded-full border border-white/15 px-6 py-4 text-base font-semibold text-white transition hover:bg-white/5">
                    See What You Get Across the Funnel
                  </a>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    { value: "50+", label: "peer-reviewed studies referenced" },
                    { value: "3", label: "clear steps in the buyer journey" },
                    { value: "10", label: "days in the Quick Start bridge" },
                    { value: "90", label: "days mapped inside the full system" },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                      <div className="text-3xl font-semibold text-[#67E8F9]">{stat.value}</div>
                      <div className="mt-2 text-sm leading-6 text-slate-200">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <Disclaimer />
              </div>

              <div id="optin" className="rounded-[2rem] border border-white/10 bg-white p-6 text-slate-900 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-8">
                <div className="mb-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0D9488]">Free guide</p>
                  <h2 className="mt-3 text-3xl font-semibold text-[#1B2A4A]">Get “5 Peptides Most Studied in the Recovery Conversation”</h2>
                  <p className="mt-3 text-base leading-7 text-slate-600">
                    Enter your name and email for instant access to the free guide, then see the one-time 10-day Quick Start that helps you turn the overview into a clean first step.
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
                    {loading ? "Submitting..." : "Get the Free Recovery Guide"}
                  </button>
                  <p className="text-sm leading-6 text-slate-500">We’ll also send occasional peptide education and funnel follow-up. Unsubscribe anytime.</p>
                  {submitted && <p className="text-sm font-medium text-emerald-600">Success — redirecting you to the quick-start offer below.</p>}
                  {error && <p className="text-sm font-medium text-rose-600">{error}</p>}
                </form>
              </div>
            </div>
          </section>

          <section id="problem" className="border-b border-white/10 bg-[#1B2A4A] px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <PhotoCard src={photos.pain} alt="Person holding painful shoulder during training" className="h-[320px] lg:h-[520px]" />
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#99F6E4]">Section 2 · Pain + failed solutions</p>
                <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">The real frustration isn’t just pain. It’s trying to make sense of too many fragmented answers.</h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                  Most people bounce between symptom suppression, forum advice, and scattered compound talk without ever getting a simple research-first framework they can actually trust.
                </p>
                <div className="mt-8 grid gap-4">
                  {painPoints.map((point) => (
                    <div key={point} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 text-sm leading-7 text-slate-200">
                      • {point}
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a href="#optin" className="rounded-full bg-[#0D9488] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#14B8A6]">
                    Start With the Free Guide
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section id="research" className="border-b border-white/10 bg-[linear-gradient(180deg,#10203A_0%,#0B1426_100%)] px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#99F6E4]">Section 3 · Why this works</p>
                <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">This isn’t another hype page. It’s a cleaner way to understand mechanism, evidence, and next steps.</h2>
                <div className="mt-6 space-y-5 text-base leading-8 text-slate-300">
                  <p>
                    Instead of throwing more random claims at the reader, this funnel organizes the recovery conversation into a simple progression: overview first, implementation bridge second, full system third.
                  </p>
                  <p>
                    The free guide explains what each peptide is most commonly studied for. The Quick Start helps the reader organize the first 10 days. The full system turns that into a premium 30/60/90-day educational framework.
                  </p>
                  <p>
                    That message-match keeps the ad hook, page promise, and offer ladder aligned.
                  </p>
                </div>
                <div className="mt-8">
                  <Disclaimer />
                </div>
              </div>
              <div className="grid gap-4">
                {citations.map((citation) => (
                  <article key={citation.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                    <div className="text-sm font-semibold uppercase tracking-[0.15em] text-[#67E8F9]">{citation.journal}</div>
                    <h3 className="mt-2 text-xl font-semibold text-white">{citation.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{citation.takeaway}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="stack" className="border-b border-white/10 bg-[#0B1426] px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#99F6E4]">Section 4 · 10x value stack</p>
                <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">What you get before any price reveal.</h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                  The goal is simple: make the path feel organized, premium, and easy to follow before the reader sees the price.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {valueStack.map((item) => (
                    <div key={item.name} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                        <span className="text-sm font-semibold text-[#67E8F9]">{item.value}</span>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-slate-300">{item.body}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 rounded-[1.75rem] border border-[#0D9488]/20 bg-[#0D9488]/10 p-6">
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#99F6E4]">Total stacked value</div>
                  <div className="mt-2 text-4xl font-semibold text-white">$402+</div>
                  <p className="mt-3 text-sm leading-7 text-slate-200">That’s the value context the reader understands before founder pricing is shown.</p>
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a href="#offer" className="rounded-full bg-[#0D9488] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#14B8A6]">
                    See the Offer Ladder
                  </a>
                </div>
              </div>
              <div className="space-y-6">
                <PhotoCard src={photos.stack} alt="Researcher studying samples in a modern laboratory" className="h-[280px] sm:h-[340px]" />
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#67E8F9]">Message-match promise</p>
                  <div className="mt-5 space-y-4 text-sm leading-7 text-slate-300">
                    <p>Ad hook: stop guessing inside the pain-management loop.</p>
                    <p>Hero: understand the recovery-support pathways serious researchers study.</p>
                    <p>Offer: start with the free guide, move into the 10-day Quick Start, then unlock the full system.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="offer" className="border-b border-white/10 bg-[#1B2A4A] px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#99F6E4]">Section 5 · Offer ladder</p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Start free. Then choose the faster bridge. Then unlock the full system.</h2>
              <div className="mt-10 grid gap-5 lg:grid-cols-3">
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#67E8F9]">Free</div>
                  <h3 className="mt-3 text-2xl font-semibold">5-Peptide Recovery Guide</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">The research-first overview that helps the reader understand what each peptide is most studied for and why the conversation matters.</p>
                </div>
                <div className="rounded-[2rem] border border-[#0D9488]/30 bg-[#0D9488]/10 p-8 backdrop-blur-sm">
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#99F6E4]">Quick Start</div>
                  <h3 className="mt-3 text-2xl font-semibold">10-Day Recovery Research Quick Start</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-200">10-day roadmap, daily tracking grid, quick-reference sheets, and a cleaner first step for people who want more structure right away.</p>
                  <div className="mt-5 text-sm font-semibold text-[#99F6E4]">Founder pricing: $17</div>
                </div>
                <div className="rounded-[2rem] border border-white/10 bg-white p-8 text-slate-900">
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0D9488]">Full system</div>
                  <h3 className="mt-3 text-2xl font-semibold text-[#1B2A4A]">30/60/90-Day Recovery System</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">The premium educational framework with profile pages, mechanism summaries, worksheets, citation library, and a 60-Day Research Guarantee.</p>
                  <div className="mt-5 text-sm font-semibold text-[#0D9488]">Founder pricing: $67</div>
                </div>
              </div>
            </div>
          </section>

          <section id="faq" className="border-b border-white/10 bg-[#0B1426] px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#99F6E4]">Section 6 · FAQ</p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Questions readers ask before they move.</h2>
              <div className="mt-10 grid gap-4 lg:grid-cols-2">
                {faqs.map((faq) => (
                  <details key={faq.question} className="group rounded-[1.75rem] border border-white/10 bg-white/5 p-6 open:bg-white/7 backdrop-blur-sm">
                    <summary className="cursor-pointer list-none text-lg font-semibold">{faq.question}</summary>
                    <p className="mt-4 text-sm leading-7 text-slate-300">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section className="relative isolate overflow-hidden border-b border-white/10 px-4 py-16 sm:px-6 lg:px-8">
            <img src={photos.final} alt="Hiker reaching a mountain summit at golden hour" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,20,38,0.78),rgba(11,20,38,0.9))]" />
            <div className="relative mx-auto max-w-5xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#99F6E4]">Section 7 · Final CTA</p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-5xl">Start with clarity. Then choose the next layer only when you want more structure.</h2>
              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-200">
                Free guide first. 10-day Quick Start second. Full 30/60/90-day system third. That’s the entire path.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a href="#optin" className="rounded-full bg-[#0D9488] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#14B8A6]">Get the 5-Peptide Recovery Guide</a>
                <a href="#offer" className="rounded-full border border-white/15 px-6 py-4 text-base font-semibold text-white transition hover:bg-white/5">Review the Offer Ladder</a>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-200">
                <span className="rounded-full border border-white/10 px-4 py-2">Research-backed positioning</span>
                <span className="rounded-full border border-white/10 px-4 py-2">10x value before price reveal</span>
                <span className="rounded-full border border-white/10 px-4 py-2">Instant digital access</span>
              </div>
            </div>
          </section>
        </main>
      )}

      {stage !== "landing" && (
        <main className="min-h-[calc(100vh-81px)] bg-[linear-gradient(180deg,#0B1426_0%,#10203A_100%)] px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-8">
            <section className="rounded-[2rem] border border-white/10 bg-white p-8 text-slate-900 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0D9488]">State 2 · Thank-you page</p>
              <h1 className="mt-4 text-3xl font-semibold text-[#1B2A4A] sm:text-4xl">
                {name ? `${name}, your free recovery guide is on the way.` : "Your free recovery guide is on the way."}
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
                Watch for it at <strong>{email || "your inbox"}</strong>. Before you leave, there’s a one-time $17 offer that turns the overview into a simple 10-day plan.
              </p>
            </section>

            {stage === "tripwire" && (
              <section className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
                <div className="rounded-[2rem] border border-[#0D9488]/30 bg-[#0D9488]/10 p-8 text-white">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#99F6E4]">One-time Quick Start</p>
                  <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Before you go, turn the free guide into a 10-day recovery plan you can actually follow.</h2>
                  <p className="mt-4 text-lg leading-8 text-slate-200">
                    The free guide gives you the big picture. The Quick Start gives you the first 10 days mapped out so you know what to track, what to compare, and how to build momentum before moving into the full system.
                  </p>
                  <ul className="mt-8 space-y-3 text-sm leading-7 text-slate-200">
                    {tripwireBullets.map((bullet) => (
                      <li key={bullet}>• {bullet}</li>
                    ))}
                  </ul>
                  <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/5 p-5 text-sm leading-7 text-slate-200">
                    <strong>Value stack:</strong> 10-Day Roadmap ($27) + Tracking Grid ($17) + Quick-Reference Sheets ($19) + Decision Framework ($17).
                  </div>
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                    <a href="https://checkout.example.com/pain-recovery-quick-start" className="rounded-full bg-white px-6 py-4 text-center text-base font-semibold text-[#1B2A4A] transition hover:bg-slate-100">
                      Yes — Give Me the 10-Day Recovery Plan
                    </a>
                    <button onClick={advanceFromTripwire} className="rounded-full border border-white/15 px-6 py-4 text-base font-semibold text-white transition hover:bg-white/5">
                      I bought it — show me the full system
                    </button>
                    <button onClick={skipTripwire} className="rounded-full border border-white/15 px-6 py-4 text-base font-semibold text-white transition hover:bg-white/5">
                      Skip this and show me the full recovery system
                    </button>
                  </div>
                </div>
                <aside className="space-y-6">
                  <PhotoCard src={photos.tripwire} alt="Athlete in post-workout recovery stretch" className="h-[250px]" />
                  <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-white">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#67E8F9]">Why this converts</p>
                    <div className="mt-5 space-y-4 text-sm leading-7 text-slate-300">
                      <p>Free guide = the overview.</p>
                      <p>$17 Quick Start = the first 10 days organized for you.</p>
                      <p>$67 full system = the complete 30/60/90-day framework.</p>
                    </div>
                  </div>
                </aside>
              </section>
            )}

            {stage === "core" && (
              <section className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-white">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#99F6E4]">Full system</p>
                  <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Ready for the full 30/60/90-day recovery system?</h2>
                  <p className="mt-4 text-lg leading-8 text-slate-200">
                    This is the premium educational framework that helps the reader move from random peptide guesses and scattered notes to a structured system with mechanism summaries, profile pages, worksheets, and citations.
                  </p>
                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                      <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#67E8F9]">Founder pricing</div>
                      <div className="mt-2 text-4xl font-semibold">$67</div>
                      <p className="mt-2 text-sm leading-7 text-slate-300">Shown only after the value stack is clear.</p>
                    </div>
                    <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                      <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#67E8F9]">Stacked value</div>
                      <div className="mt-2 text-2xl font-semibold">$402+</div>
                      <p className="mt-2 text-sm leading-7 text-slate-300">Framework, profile library, worksheets, appendix, and guarantee.</p>
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
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0D9488]">Included</p>
                    <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-700">
                      {coreBullets.map((bullet) => (
                        <li key={bullet}>• {bullet}</li>
                      ))}
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
