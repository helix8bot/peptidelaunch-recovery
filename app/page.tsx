"use client";

import { FormEvent, useState } from "react";

const citations = [
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
      "A concise research-first overview of the 5 peptides most discussed in the recovery conversation — what pathways they are studied for, and how to think about them without guesswork.",
  },
  {
    question: "Do I need injections or dosing guidance?",
    answer:
      "No. Everything here is educational and research-first. The focus is on understanding the literature, mechanisms, and framework clearly.",
  },
  {
    question: "How is this different from what I find on Reddit or forums?",
    answer:
      "This guide is built from 50+ peer-reviewed studies, organized into a clear framework. Instead of sorting through contradictory forum posts, you get the research distilled into one place with citations you can verify yourself.",
  },
  {
    question: "What if peptides aren't right for me?",
    answer:
      "That's exactly why education comes first. The guide helps you understand what each compound is studied for so you can have an informed conversation with your healthcare provider — not make decisions based on hype.",
  },
  {
    question: "Is my email safe?",
    answer:
      "Yes. We'll send you the guide and occasional research updates. You can unsubscribe with one click anytime. We never share or sell your information.",
  },
];

const painPoints = [
  "Still cycling through painkillers and procedures that only mask what's happening underneath?",
  "Still hearing conflicting opinions from different providers — without understanding which recovery pathway actually applies to you?",
  "Still trying to piece together BPC-157, TB-500, GHK-Cu, and KPV research from scattered Reddit threads and forum fragments?",
  "Still unsure what belongs in a serious recovery conversation versus what's just marketing noise?",
];

const guideContents = [
  {
    title: "BPC-157 — The Repair Anchor",
    desc: "What the research says about tissue repair signaling and why it's the most-discussed compound in the recovery space.",
  },
  {
    title: "TB-500 — The Remodeling Partner",
    desc: "How thymosin beta-4 research relates to wound healing, flexibility, and tissue remodeling pathways.",
  },
  {
    title: "GHK-Cu — The Collagen Signal",
    desc: "The copper peptide research on skin, tissue, and connective-tissue gene expression.",
  },
  {
    title: "KPV — The Inflammation Logic",
    desc: "What published studies suggest about alpha-MSH fragments and inflammatory signaling modulation.",
  },
  {
    title: "SS-31 — The Cellular Energy Factor",
    desc: "Mitochondrial-targeted research and why cellular energy matters in the recovery conversation.",
  },
];

const photos = {
  hero: "https://images.unsplash.com/photo-1626440861759-b3d7e45ee88e?w=1200&q=80",
  pain: "https://images.unsplash.com/photo-1562771379-eafdca7a02f8?w=800&q=80",
  research: "https://images.unsplash.com/photo-1614308459036-779d0dfe51ff?w=800&q=80",
  final: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1200&q=80",
};

function Disclaimer() {
  return (
    <p className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
      Educational use only. Research suggests these compounds may support recovery-related pathways, but evidence quality varies and much of the literature is preclinical or investigational. Nothing here is medical advice or a personal-use directive. These statements have not been evaluated by the FDA.
    </p>
  );
}

function OptinForm({ id, compact = false }: { id: string; compact?: boolean }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = { name, email, source: "pain-recovery-landing-page", submittedAt: new Date().toISOString() };

      await fetch("https://services.leadconnectorhq.com/hooks/recovery-optin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        mode: "cors",
      }).catch(() => null);

      window.location.href = "/thank-you";
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (compact) {
    return (
      <form id={id} className="flex flex-col gap-3 sm:flex-row sm:items-end" onSubmit={handleSubmit}>
        <input required value={name} onChange={(e) => setName(e.target.value)} className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-[#0D9488] focus:ring-4 focus:ring-[#0D9488]/10" placeholder="First name" />
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-[#0D9488] focus:ring-4 focus:ring-[#0D9488]/10" placeholder="Email address" />
        <button type="submit" disabled={loading} className="rounded-2xl bg-[#0D9488] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#14B8A6] disabled:cursor-not-allowed disabled:opacity-70">
          {loading ? "Sending..." : "Get the Free Guide"}
        </button>
        {error && <p className="text-sm font-medium text-rose-400">{error}</p>}
      </form>
    );
  }

  return (
    <div id={id} className="rounded-[2rem] border border-white/10 bg-white p-6 text-slate-900 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-8">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0D9488]">Free guide</p>
        <h2 className="mt-3 text-3xl font-semibold text-[#1B2A4A]">Get the 5 Peptides Most Studied in the Recovery Conversation</h2>
        <p className="mt-3 text-base leading-7 text-slate-600">
          Enter your name and email for instant access. No cost, no obligation — just the research, organized clearly.
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
        <p className="text-sm leading-6 text-slate-500">We&apos;ll also send occasional research updates. Unsubscribe anytime.</p>
        {error && <p className="text-sm font-medium text-rose-600">{error}</p>}
      </form>
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-[#0B1426] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(11,20,38,0.82)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#top" className="text-lg font-semibold uppercase tracking-[0.2em] text-white">
            PeptideLaunch
          </a>
          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a href="#problem">The Problem</a>
            <a href="#mechanism">How It Works</a>
            <a href="#proof">Research</a>
            <a href="#guide">What&apos;s Inside</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a href="#optin" className="rounded-full bg-[#0D9488] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#14B8A6]">
            Get the Free Guide
          </a>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
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

              <p className="max-w-2xl text-base leading-7 text-slate-300">
                Get the free guide that breaks down the 5 peptides most studied in the recovery conversation — with the research organized clearly so you can finally stop guessing.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <a href="#optin" className="rounded-full bg-[#0D9488] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#14B8A6]">
                  Get the 5-Peptide Recovery Guide
                </a>
                <a href="#guide" className="rounded-full border border-white/15 px-6 py-4 text-base font-semibold text-white transition hover:bg-white/5">
                  See What&apos;s Inside
                </a>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  { value: "50+", label: "peer-reviewed studies referenced" },
                  { value: "5", label: "key peptides covered in depth" },
                  { value: "7–14", label: "day initial research window" },
                  { value: "Instant", label: "access — check your inbox" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                    <div className="text-3xl font-semibold text-[#67E8F9]">{stat.value}</div>
                    <div className="mt-2 text-sm leading-6 text-slate-200">{stat.label}</div>
                  </div>
                ))}
              </div>

              <Disclaimer />
            </div>

            <OptinForm id="optin" />
          </div>
        </section>

        {/* Pain Points */}
        <section id="problem" className="border-b border-white/10 bg-[#1B2A4A] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_24px_60px_rgba(15,23,42,0.18)] h-[320px] lg:h-[520px]">
              <img src={photos.pain} alt="Person holding painful shoulder during training" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#99F6E4]">Sound familiar?</p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">The frustration isn&apos;t just pain. It&apos;s trying to make sense of too many fragmented answers.</h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                Most people bounce between symptom suppression, conflicting provider opinions, and scattered compound research without ever getting a simple framework they can actually trust.
              </p>
              <div className="mt-8 grid gap-4">
                {painPoints.map((point) => (
                  <div key={point} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 text-sm leading-7 text-slate-200">
                    <span className="mr-2 text-[#67E8F9]">→</span> {point}
                  </div>
                ))}
              </div>
              <p className="mt-6 text-base leading-7 text-slate-300">
                If you&apos;re nodding along, you don&apos;t need another random product recommendation. You need a clear framework that organizes the research so you can think — and talk to your provider — with confidence.
              </p>
              <div className="mt-8">
                <a href="#optin" className="inline-flex rounded-full bg-[#0D9488] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#14B8A6]">
                  Get the 5-Peptide Recovery Guide
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Mechanism */}
        <section id="mechanism" className="border-b border-white/10 bg-[linear-gradient(180deg,#10203A_0%,#0B1426_100%)] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#99F6E4]">Why this approach is different</p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Education first. Decisions second. That&apos;s the only order that works.</h2>
              <div className="mt-6 space-y-5 text-base leading-8 text-slate-300">
                <p>
                  Most recovery content online either oversimplifies (&ldquo;just take BPC-157!&rdquo;) or overwhelms with contradictory claims. Neither helps you make a clear decision.
                </p>
                <p>
                  Peptide research is real and growing — but the quality of evidence varies widely. Some compounds have decades of published studies. Others are mostly anecdotal. The difference matters, and this guide helps you see it.
                </p>
                <p>
                  Instead of telling you what to do, this guide organizes <em>what the research actually says</em> — the mechanisms, the study contexts, the strength of evidence — so you can evaluate it for yourself.
                </p>
                <p>
                  That&apos;s the difference between making decisions from hype and making decisions from understanding.
                </p>
              </div>
              <div className="mt-8">
                <Disclaimer />
              </div>
            </div>
            <div className="space-y-4">
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_24px_60px_rgba(15,23,42,0.18)] h-[280px]">
                <img src={photos.research} alt="Researcher studying samples in a modern laboratory" loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="grid gap-4">
                {[
                  { icon: "📖", title: "Understand the landscape", desc: "Know what each peptide is studied for, what kind of evidence exists, and where the research is strongest." },
                  { icon: "🔬", title: "See the mechanisms clearly", desc: "Learn how each compound relates to specific recovery pathways — tissue repair, remodeling, inflammation, and cellular energy." },
                  { icon: "🧭", title: "Make informed next steps", desc: "Have a real conversation with your healthcare provider based on organized research — not forum fragments." },
                ].map((item) => (
                  <div key={item.title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                    <div className="text-2xl">{item.icon}</div>
                    <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-300">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof / Research */}
        <section id="proof" className="border-b border-white/10 bg-[#1B2A4A] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#99F6E4]">The research behind it</p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Built on published science, not internet hype</h2>
              <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-300">
                Every claim in this guide traces back to published, peer-reviewed research. Here&apos;s a sample of what you&apos;ll find inside.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { value: "50+", label: "peer-reviewed studies cited" },
                { value: "5", label: "key compounds profiled" },
                { value: "4", label: "recovery pathways mapped" },
                { value: "11", label: "page research overview" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm">
                  <div className="text-4xl font-semibold text-[#67E8F9]">{stat.value}</div>
                  <div className="mt-2 text-sm leading-6 text-slate-200">{stat.label}</div>
                </div>
              ))}
            </div>

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

        {/* What You'll Learn */}
        <section id="guide" className="border-b border-white/10 bg-[#0B1426] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#99F6E4]">Inside the free guide</p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Here&apos;s what you&apos;ll learn</h2>
              <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-300">
                The guide covers each of the 5 most-studied peptides in the recovery conversation — what the research says, which pathways they target, and how to think about them clearly.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {guideContents.map((item) => (
                <div key={item.title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.desc}</p>
                </div>
              ))}
              <div className="rounded-[1.5rem] border border-[#0D9488]/30 bg-[#0D9488]/10 p-6">
                <h3 className="text-lg font-semibold text-white">Plus: How to Think About All 5 Together</h3>
                <p className="mt-3 text-sm leading-7 text-slate-200">
                  The guide doesn&apos;t just cover each peptide in isolation. It shows how they relate to different recovery pathways — so you understand the landscape, not just individual compounds.
                </p>
              </div>
            </div>

            <div className="mt-10 text-center">
              <a href="#optin" className="inline-flex rounded-full bg-[#0D9488] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#14B8A6]">
                Get the 5-Peptide Recovery Guide — Free
              </a>
            </div>
          </div>
        </section>

        {/* Opt-in Form (standalone section) */}
        <section className="border-b border-white/10 bg-[#1B2A4A] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <OptinForm id="optin-mid" />
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-b border-white/10 bg-[#0B1426] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
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
        <section className="relative isolate overflow-hidden border-b border-white/10 px-4 py-16 sm:px-6 lg:px-8">
          <img src={photos.final} alt="Hiker reaching a mountain summit at golden hour" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,20,38,0.78),rgba(11,20,38,0.9))]" />
          <div className="relative mx-auto max-w-3xl space-y-8 text-center">
            <h2 className="text-3xl font-semibold sm:text-5xl">Stop guessing. Start understanding.</h2>
            <p className="mx-auto max-w-2xl text-lg leading-8 text-slate-200">
              The free guide gives you the organized research on the 5 peptides most discussed in the recovery conversation. No cost. No obligation. Just clarity.
            </p>
            <OptinForm id="optin-final" compact />
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-slate-200">
              <span className="rounded-full border border-white/10 px-4 py-2">50+ peer-reviewed studies</span>
              <span className="rounded-full border border-white/10 px-4 py-2">5 key compounds covered</span>
              <span className="rounded-full border border-white/10 px-4 py-2">Instant access</span>
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
