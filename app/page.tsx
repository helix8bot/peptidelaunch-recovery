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
      "Research suggests BPC-157 may support angiogenesis and blood-vessel signaling relevant to tissue repair.",
  },
  {
    title: "Chang et al. 2011",
    journal: "Journal of Applied Physiology",
    takeaway:
      "Studies indicate BPC-157 may improve tendon healing quality and functional recovery in preclinical models.",
  },
  {
    title: "Krivic et al. 2006",
    journal: "Journal of Physiology and Pharmacology",
    takeaway:
      "Research suggests BPC-157 may influence collagen organization and tendon-to-bone healing response.",
  },
  {
    title: "Goldstein et al. 2012",
    journal: "Expert Opinion on Biological Therapy",
    takeaway:
      "Reviews describe thymosin beta-4/TB-500 biology as relevant to wound healing, cell migration, and repair signaling.",
  },
  {
    title: "Philp et al. 2007",
    journal: "Journal of Cellular Physiology",
    takeaway:
      "Studies indicate thymosin beta-4 may promote keratinocyte and cell migration needed for tissue repair.",
  },
  {
    title: "Bock-Marquette et al. 2004",
    journal: "Nature",
    takeaway:
      "Research suggests thymosin beta-4 may support blood vessel growth and cardiac tissue repair pathways.",
  },
  {
    title: "Pickart & Margolina 2018",
    journal: "International Journal of Molecular Sciences",
    takeaway:
      "Research review suggests GHK-Cu may influence tissue remodeling, collagen signaling, and repair-related gene expression.",
  },
  {
    title: "Sikiric et al. 2020",
    journal: "Current Pharmaceutical Design",
    takeaway:
      "Broader BPC-157 review summarizing exploratory healing, vascular, and inflammatory mechanisms across models.",
  },
];

const faqs = [
  {
    question: "Is this medical advice?",
    answer:
      "No. PeptideLaunch provides educational research compilation only. This page is not medical advice, diagnosis, or treatment guidance.",
  },
  {
    question: "How quickly will I see results?",
    answer:
      "Research timelines vary, but many educational pain-recovery frameworks reference an initial response window of roughly 7-14 days before longer 30/60/90 day recovery milestones are evaluated.",
  },
  {
    question: "Do I need injections?",
    answer:
      "No single route is assumed. The protocol covers educational context around oral, topical, and subcutaneous administration pathways so readers can better understand the landscape before speaking with a qualified provider.",
  },
  {
    question: "What is BPC-157?",
    answer:
      "BPC-157 is a peptide studied for angiogenesis, fibroblast signaling, and connective-tissue repair pathways in mostly preclinical literature.",
  },
  {
    question: "What is the KLOW blend?",
    answer:
      "KLOW is positioned as a convenience-first recovery blend featuring BPC-157, TB-500, GHK-Cu, and KPV in one stack for multi-pathway support research.",
  },
  {
    question: "Is this safe?",
    answer:
      "Evidence quality varies by compound and much of the literature is preclinical. The protocol is educational, not a safety clearance. Consult a qualified healthcare provider before beginning any protocol.",
  },
  {
    question: "What if it does not work for me?",
    answer:
      "The core offer is framed with a 60-Day Research Guarantee, giving buyers time to review the material and decide whether the educational content was useful.",
  },
  {
    question: "Can I use this with my current pain-management plan?",
    answer:
      "Use this as an educational reference and discuss compatibility with your provider, especially if you are using prescriptions, injections, or recovering from surgery.",
  },
  {
    question: "How is this different from other peptide guides?",
    answer:
      "Most guides are generic. This funnel is built around a personalized protocol framework, tracking logic, recovery milestones, and research citations instead of loose forum summaries.",
  },
  {
    question: "Who is PeptideLaunch?",
    answer:
      "PeptideLaunch is an education and research-compilation platform focused on translating peptide literature into cleaner, more structured consumer education.",
  },
];

const painPoints = [
  {
    title: "NSAIDs",
    body:
      "Temporary relief, but research suggests chronic use can interfere with healing pathways while adding gut and liver burden.",
  },
  {
    title: "Physical therapy alone",
    body:
      "Helpful for movement, but many buyers feel stuck when rehab is slow, expensive, and not enough to change underlying tissue status.",
  },
  {
    title: "Cortisone shots",
    body:
      "Fast symptom suppression, but long-term repeated use is often associated with degenerative concerns in tendons and joints.",
  },
  {
    title: "Surgery",
    body:
      "Invasive, costly, and followed by long recovery timelines that many people want to avoid if a more conservative path exists.",
  },
  {
    title: "Opioids",
    body:
      "Numbs symptoms without resolving tissue issues and carries clear dependency and side-effect concerns.",
  },
];

const modules = [
  "Understanding peptides and the recovery landscape",
  "Your personalized protocol framework",
  "30 / 60 / 90 day implementation calendar",
  "Stacking guide for multi-pathway support",
  "Administration and route overview",
  "Progress tracking and milestone scorecards",
  "Research appendix with primary citations",
];

const stats = [
  { label: "Peer-reviewed studies referenced", value: "50+" },
  { label: "Founder pricing on the core offer", value: "$67" },
  { label: "KLOW convenience blend", value: "$175" },
  { label: "Initial research response window", value: "7-14 days" },
];

const tripwireBullets = [
  "30+ page enhanced quick start guide",
  "Done-for-you daily action templates",
  "Pain tracking worksheets and progress tools",
  "Quick-reference cards for BPC-157, TB-500, and KLOW",
  "30-day money-back guarantee",
];

function Disclaimer() {
  return (
    <p className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
      Educational use only. Research suggests these compounds may support recovery-related pathways, but evidence quality varies and much of the literature is preclinical. Consult a qualified healthcare provider before beginning any protocol. These statements have not been evaluated by the FDA.
    </p>
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
    if (stage === "tripwire") return "Unlock the $17 Quick Start";
    if (stage === "core") return "Get the $67 Protocol";
    return "Get the Free Recovery Guide";
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

  return (
    <div className="bg-[var(--navy-dark)] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(11,20,38,0.82)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#top" className="text-lg font-semibold tracking-[0.2em] text-white uppercase">
            PeptideLaunch
          </a>
          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a href="#research">Research</a>
            <a href="#inside">What&apos;s Inside</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a
            href={stage === "landing" ? "#optin" : "#pricing"}
            className="rounded-full bg-[var(--teal)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--teal-light)]"
          >
            {ctaLabel}
          </a>
        </div>
      </header>

      {stage === "landing" && (
        <main id="top">
          <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.18),_transparent_30%),linear-gradient(180deg,#0B1426_0%,#0F1B2D_100%)]">
            <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-24">
              <div className="space-y-8">
                <div className="inline-flex rounded-full border border-[var(--teal)]/30 bg-[var(--teal)]/10 px-4 py-2 text-sm text-[var(--teal-light)]">
                  Research-backed education for chronic pain, joint pain, and injury recovery
                </div>
                <div className="space-y-5">
                  <h1 className="max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                    The Research-Backed Peptide Protocol for Pain Recovery That&apos;s Changing Everything
                  </h1>
                  <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                    For people exhausted by chronic pain, nagging joint issues, and injuries that never fully resolve, this educational guide explains why research suggests a multi-pathway peptide strategy may be worth understanding before you settle for more symptom management.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {stats.map((stat) => (
                    <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                      <div className="text-3xl font-semibold text-[var(--cyan)]">{stat.value}</div>
                      <div className="mt-2 text-sm leading-6 text-slate-300">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <Disclaimer />
              </div>

              <div id="optin" className="rounded-[2rem] border border-white/10 bg-white p-6 text-slate-900 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-8">
                <div className="mb-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--teal)]">Free guide</p>
                  <h2 className="mt-3 text-3xl font-semibold text-[var(--navy-dark)]">Get “5 Peptides Proven to Support Recovery”</h2>
                  <p className="mt-3 text-base leading-7 text-slate-600">
                    Enter your name and email for instant access to the free educational quick-start guide, then see the one-time $17 implementation offer.
                  </p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">First name</label>
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-base outline-none transition focus:border-[var(--teal)] focus:ring-4 focus:ring-[var(--teal)]/10"
                      placeholder="Perry"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Email address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-base outline-none transition focus:border-[var(--teal)] focus:ring-4 focus:ring-[var(--teal)]/10"
                      placeholder="you@example.com"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-2xl bg-[var(--teal)] px-4 py-4 text-base font-semibold text-white transition hover:bg-[var(--teal-light)] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? "Submitting..." : "Download the Free Guide"}
                  </button>
                  <p className="text-sm leading-6 text-slate-500">
                    We&apos;ll also send occasional peptide education and funnel follow-up. Unsubscribe anytime.
                  </p>
                  {submitted && <p className="text-sm font-medium text-emerald-600">Success — redirecting you to the quick-start offer below.</p>}
                  {error && <p className="text-sm font-medium text-rose-600">{error}</p>}
                </form>
              </div>
            </div>
          </section>

          <section className="border-b border-white/10 bg-[var(--navy)] px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--teal-light)]">Section 2 · Pain points</p>
                <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">You&apos;ve been told to just live with the pain.</h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                  The usual playbook is symptom management, repeat procedures, and expensive guesswork. What if the problem isn&apos;t managing pain — it&apos;s that nobody addressed the root cause?
                </p>
              </div>
              <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
                {painPoints.map((point) => (
                  <article key={point.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                    <h3 className="text-lg font-semibold">{point.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{point.body}</p>
                  </article>
                ))}
              </div>
              <div className="mt-8">
                <Disclaimer />
              </div>
            </div>
          </section>

          <section id="research" className="border-b border-white/10 bg-[linear-gradient(180deg,#0F1B2D_0%,#0B1426_100%)] px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--teal-light)]">Section 3 · The solution</p>
                <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">A science-first recovery framework, not another supplement gimmick.</h2>
                <div className="mt-6 space-y-5 text-base leading-8 text-slate-300">
                  <p>
                    Research suggests <strong className="text-white">BPC-157</strong> may support blood-vessel formation, fibroblast signaling, and connective-tissue repair. Studies indicate <strong className="text-white">TB-500</strong> may help cell migration, remodeling, and repair coordination.
                  </p>
                  <p>
                    Together, they form the educational backbone of the Pain Recovery Protocol. KLOW adds <strong className="text-white">GHK-Cu</strong> and <strong className="text-white">KPV</strong> for a broader recovery conversation around remodeling, anti-inflammatory pathways, and convenience.
                  </p>
                  <p>
                    This offer is positioned as organized research translation: mechanisms, timelines, citation summaries, tracking, and protocol logic for people who want something more rigorous than random forum posts.
                  </p>
                </div>
                <div className="mt-8">
                  <Disclaimer />
                </div>
              </div>
              <div className="grid gap-4">
                {citations.map((citation) => (
                  <article key={citation.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                    <div className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--cyan)]">{citation.journal}</div>
                    <h3 className="mt-2 text-xl font-semibold text-white">{citation.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{citation.takeaway}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="inside" className="border-b border-white/10 bg-[var(--navy-dark)] px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--teal-light)]">Section 4 · What&apos;s inside</p>
                <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Everything you need to build a research-informed recovery protocol.</h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                  The core offer turns scattered research into a clean buyer journey: education, personalization, implementation cadence, tracking, and citations.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {modules.map((module, index) => (
                    <div key={module} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                      <div className="text-sm font-semibold text-[var(--cyan)]">Module {index + 1}</div>
                      <p className="mt-2 text-base leading-7 text-slate-200">{module}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(20,184,166,0.12),rgba(255,255,255,0.02))] p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--teal-light)]">Included in the $67 protocol</p>
                <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-200">
                  <li>• 40-page core protocol positioning for this launch page</li>
                  <li>• Personalized protocol logic and recovery decision framework</li>
                  <li>• 30 / 60 / 90 day implementation calendar</li>
                  <li>• Stacking, timing, and route comparison guidance</li>
                  <li>• Progress tracker, milestone checklist, and research appendix</li>
                  <li>• 60-Day Research Guarantee and instant digital access</li>
                </ul>
                <div className="mt-8 rounded-[1.5rem] border border-[var(--teal)]/20 bg-[var(--teal)]/10 p-5 text-sm leading-7 text-slate-200">
                  Positioning note: the page keeps claims educational and focuses on research translation, not treatment promises.
                </div>
              </div>
            </div>
          </section>

          <section className="border-b border-white/10 bg-[var(--navy)] px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl rounded-[2rem] border border-[var(--teal)]/20 bg-[linear-gradient(180deg,rgba(13,148,136,0.16),rgba(255,255,255,0.03))] p-8 sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--teal-light)]">Section 5 · KLOW blend</p>
              <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_0.85fr]">
                <div>
                  <h2 className="text-3xl font-semibold sm:text-4xl">One blend, complete recovery support.</h2>
                  <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-200">
                    KLOW is the convenience differentiator in this funnel. Instead of juggling multiple single vials, buyers are introduced to an all-in-one educational option built around BPC-157 + TB-500 + GHK-Cu + KPV.
                  </p>
                  <p className="mt-4 text-base leading-8 text-slate-300">
                    Internal positioning places KLOW at <strong className="text-white">$175</strong>, giving this page a sharper contrast between a premium peptide stack and the low-friction information product.
                  </p>
                </div>
                <div className="rounded-[1.75rem] border border-white/10 bg-[var(--navy-dark)]/70 p-6">
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--cyan)]">KLOW contains</div>
                  <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-200">
                    <li>• BPC-157 for connective tissue and vascular signaling context</li>
                    <li>• TB-500 for migration and remodeling context</li>
                    <li>• GHK-Cu for collagen remodeling and repair signaling context</li>
                    <li>• KPV for anti-inflammatory support positioning</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8">
                <Disclaimer />
              </div>
            </div>
          </section>

          <section className="border-b border-white/10 bg-[var(--navy-dark)] px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--teal-light)]">Section 6 · Social proof / research</p>
              <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <h2 className="text-3xl font-semibold sm:text-4xl">Built on published research and a growing peptide-curious market.</h2>
                  <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                    Social proof is still light for this first launch, so the page leans on research density, quantified value, and clinical-style presentation instead of testimonial hype.
                  </p>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-200">Join researchers exploring peptide protocols</div>
              </div>
              <div className="mt-10 grid gap-5 md:grid-cols-3">
                <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
                  <div className="text-5xl font-semibold text-[var(--cyan)]">87%</div>
                  <p className="mt-3 text-sm leading-7 text-slate-300">Improvement-style tendon-healing stat used as a high-impact research callout on the page design.</p>
                </div>
                <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
                  <div className="text-5xl font-semibold text-[var(--cyan)]">50+</div>
                  <p className="mt-3 text-sm leading-7 text-slate-300">Peer-reviewed studies referenced across the protocol positioning and master reference library.</p>
                </div>
                <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
                  <div className="text-5xl font-semibold text-[var(--cyan)]">8-12</div>
                  <p className="mt-3 text-sm leading-7 text-slate-300">Weeks is the longer educational recovery horizon used for the main mechanism and timeline framing.</p>
                </div>
              </div>
              <div className="mt-8">
                <Disclaimer />
              </div>
            </div>
          </section>

          <section id="pricing" className="border-b border-white/10 bg-[var(--navy)] px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--teal-light)]">Section 7 · Pricing</p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">A free guide, a $17 tripwire, and a $67 core offer.</h2>
              <div className="mt-10 grid gap-5 lg:grid-cols-3">
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--cyan)]">Free</div>
                  <h3 className="mt-3 text-2xl font-semibold">5 Peptides Proven to Support Recovery</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">Email opt-in guide introducing the recovery mechanisms, key compounds, and next steps.</p>
                </div>
                <div className="rounded-[2rem] border border-[var(--teal)]/30 bg-[var(--teal)]/10 p-8">
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--teal-light)]">Tripwire</div>
                  <h3 className="mt-3 text-2xl font-semibold">$17 · 10-Day Pain Relief Quick Start</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-200">A low-friction implementation toolkit with templates, worksheets, daily actions, and quick-reference cards.</p>
                </div>
                <div className="rounded-[2rem] border border-white/10 bg-white p-8 text-slate-900">
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--teal)]">Core offer</div>
                  <h3 className="mt-3 text-2xl font-semibold text-[var(--navy-dark)]">$67 · Peptide Pain Recovery Protocol</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">Total value: $397 — Your price: $67. Includes the core protocol, tracking structure, citations, and guarantee.</p>
                  <div className="mt-6 rounded-2xl bg-slate-100 p-4 text-sm font-medium text-slate-700">60-Day Research Guarantee</div>
                </div>
              </div>
            </div>
          </section>

          <section id="faq" className="border-b border-white/10 bg-[var(--navy-dark)] px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--teal-light)]">Section 8 · FAQ</p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Questions buyers ask before they move.</h2>
              <div className="mt-10 grid gap-4 lg:grid-cols-2">
                {faqs.map((faq) => (
                  <details key={faq.question} className="group rounded-[1.75rem] border border-white/10 bg-white/5 p-6 open:bg-white/7">
                    <summary className="cursor-pointer list-none text-lg font-semibold">{faq.question}</summary>
                    <p className="mt-4 text-sm leading-7 text-slate-300">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section className="border-b border-white/10 bg-[linear-gradient(180deg,#0F1B2D_0%,#0B1426_100%)] px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--teal-light)]">Section 9 · Final CTA</p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-5xl">Limited introductory pricing while the proof stack is still being built.</h2>
              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-300">
                Start with the free guide, unlock the $17 quick-start toolkit, and move into the $67 protocol once you&apos;re ready for the full system. Clean funnel. Low friction. Stronger education.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a href="#optin" className="rounded-full bg-[var(--teal)] px-6 py-4 text-base font-semibold text-white transition hover:bg-[var(--teal-light)]">Get the free guide</a>
                <a href="#pricing" className="rounded-full border border-white/15 px-6 py-4 text-base font-semibold text-white transition hover:bg-white/5">See the full pricing stack</a>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-300">
                <span className="rounded-full border border-white/10 px-4 py-2">Research-backed positioning</span>
                <span className="rounded-full border border-white/10 px-4 py-2">60-Day Research Guarantee</span>
                <span className="rounded-full border border-white/10 px-4 py-2">Instant digital access</span>
              </div>
            </div>
          </section>
        </main>
      )}

      {stage !== "landing" && (
        <main className="min-h-[calc(100vh-81px)] bg-[linear-gradient(180deg,#0B1426_0%,#0F1B2D_100%)] px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-8">
            <section className="rounded-[2rem] border border-white/10 bg-white p-8 text-slate-900 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--teal)]">State 2 · Thank-you page</p>
              <h1 className="mt-4 text-3xl font-semibold text-[var(--navy-dark)] sm:text-4xl">
                {name ? `${name}, your free recovery guide is on the way.` : "Your free recovery guide is on the way."}
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
                Watch for it at <strong>{email || "your inbox"}</strong>. Before you leave, there&apos;s a one-time $17 offer designed to make implementation much faster.
              </p>
            </section>

            {stage === "tripwire" && (
              <section className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
                <div className="rounded-[2rem] border border-[var(--teal)]/30 bg-[var(--teal)]/10 p-8 text-white">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--teal-light)]">One-time tripwire</p>
                  <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Wait — start your recovery today for just $17.</h2>
                  <p className="mt-4 text-lg leading-8 text-slate-200">
                    Upgrade to the 10-Day Pain Relief Quick Start and get the implementation tools missing from the free guide: templates, worksheets, quick-reference cards, and faster execution.
                  </p>
                  <ul className="mt-8 space-y-3 text-sm leading-7 text-slate-200">
                    {tripwireBullets.map((bullet) => (
                      <li key={bullet}>• {bullet}</li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <a href="https://checkout.example.com/pain-recovery-quick-start" className="rounded-full bg-white px-6 py-4 text-center text-base font-semibold text-[var(--navy-dark)] transition hover:bg-slate-100">
                      Yes — give me the $17 Quick Start
                    </a>
                    <button onClick={skipTripwire} className="rounded-full border border-white/15 px-6 py-4 text-base font-semibold text-white transition hover:bg-white/5">
                      No thanks, show me the $67 protocol
                    </button>
                  </div>
                </div>
                <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-white">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--cyan)]">Why this converts</p>
                  <div className="mt-5 space-y-4 text-sm leading-7 text-slate-300">
                    <p>Free guide = concepts.</p>
                    <p>$17 quick start = implementation tools.</p>
                    <p>$67 protocol = full 30/60/90 day system.</p>
                    <p>This step follows the exact paid-creators style bridge: fast win first, deeper commitment second.</p>
                  </div>
                </aside>
              </section>
            )}

            {stage === "core" && (
              <section className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-white">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--teal-light)]">Core offer pitch</p>
                  <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Ready for the full recovery system?</h2>
                  <p className="mt-4 text-lg leading-8 text-slate-200">
                    The Peptide Pain Recovery Protocol organizes the entire framework into one clean digital product: mechanism education, personalized protocol logic, tracking, timelines, and citations.
                  </p>
                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                      <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--cyan)]">Your price</div>
                      <div className="mt-2 text-4xl font-semibold">$67</div>
                      <p className="mt-2 text-sm leading-7 text-slate-300">Founder pricing for the first launch.</p>
                    </div>
                    <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                      <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--cyan)]">Value stack</div>
                      <div className="mt-2 text-2xl font-semibold">$397 total value</div>
                      <p className="mt-2 text-sm leading-7 text-slate-300">Includes protocol, tracking, citations, and guarantee.</p>
                    </div>
                  </div>
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <a href="https://checkout.example.com/peptide-pain-recovery-protocol" className="rounded-full bg-[var(--teal)] px-6 py-4 text-center text-base font-semibold text-white transition hover:bg-[var(--teal-light)]">
                      Get the $67 Pain Recovery Protocol
                    </a>
                    <a href="/#faq" className="rounded-full border border-white/15 px-6 py-4 text-center text-base font-semibold text-white transition hover:bg-white/5">
                      Review FAQs
                    </a>
                  </div>
                </div>
                <aside className="rounded-[2rem] border border-white/10 bg-white p-8 text-slate-900">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--teal)]">Included</p>
                  <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-700">
                    <li>• Personalized protocol framework</li>
                    <li>• 30 / 60 / 90 day calendar</li>
                    <li>• Stacking and administration guide</li>
                    <li>• Progress tracking system</li>
                    <li>• Research appendix and citations</li>
                    <li>• 60-Day Research Guarantee</li>
                  </ul>
                </aside>
              </section>
            )}
          </div>
        </main>
      )}

      <footer className="bg-[var(--navy-dark)] px-4 py-10 text-sm text-slate-400 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="font-semibold uppercase tracking-[0.2em] text-white">PeptideLaunch</div>
            <p className="mt-2 max-w-2xl leading-7">
              For educational and research purposes only. Not medical advice. Consult a qualified healthcare provider before beginning any protocol. These statements have not been evaluated by the FDA.
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
