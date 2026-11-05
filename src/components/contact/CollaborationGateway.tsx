"use client";

import React, { useState } from "react";
import { brandDossier } from "@/content/dossier";
import { Mail, ArrowUpRight, CheckCircle2, AlertCircle, Copy, Send, Sparkles, ShieldCheck } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export type CollaborationIntent =
  | "Internship / Technical Role"
  | "Startup Collaboration"
  | "Client Web Services"
  | "Founder Conversations"
  | "General Enquiry";

interface FormData {
  name: string;
  email: string;
  organization: string;
  intent: CollaborationIntent;
  message: string;
  honeypot: string; // Anti-spam hidden field
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface SubmissionResult {
  success: boolean;
  savedToDatabase: boolean;
  emailNotificationSent: boolean;
  submissionId?: string;
  message: string;
}

export function CollaborationGateway() {
  const intents: CollaborationIntent[] = [
    "Internship / Technical Role",
    "Startup Collaboration",
    "Client Web Services",
    "Founder Conversations",
    "General Enquiry",
  ];

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    organization: "",
    intent: "Internship / Technical Role",
    message: "",
    honeypot: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!formData.name.trim()) {
      errs.name = "Please enter your name.";
    }
    if (!formData.email.trim()) {
      errs.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) {
      errs.message = "Please write a brief message.";
    } else if (formData.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters long.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Spam honeypot detection
    if (formData.honeypot) {
      console.warn("Spam detected via honeypot.");
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setServerError(
          data.error ||
            "Unable to send dispatch. Please reach out directly via adepunishanth1@gmail.com."
        );
        setIsSubmitting(false);
        return;
      }

      setSubmissionResult(data);
      setSubmittedData({ ...formData });
      setIsSubmitting(false);
    } catch {
      setServerError(
        "Network connection issue while communicating with server. Please try again or email directly."
      );
      setIsSubmitting(false);
    }
  };

  const handleCopyDispatch = () => {
    if (!submittedData) return;
    const text = `COLLABORATION DISPATCH
------------------------------------------------
From: ${submittedData.name} (${submittedData.email})
Organization: ${submittedData.organization || "Independent"}
Intent: ${submittedData.intent}
------------------------------------------------
Message:
${submittedData.message}
------------------------------------------------
Sent to Nishanth Adepu (adepunishanth1@gmail.com)`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const mailtoHref = submittedData
    ? `mailto:${brandDossier.links.email}?subject=${encodeURIComponent(
        `[${submittedData.intent}] Dispatch from ${submittedData.name}`
      )}&body=${encodeURIComponent(
        `Hi Nishanth,\n\n${submittedData.message}\n\n---\nName: ${submittedData.name}\nEmail: ${submittedData.email}\nOrganization: ${
          submittedData.organization || "N/A"
        }\nIntent: ${submittedData.intent}`
      )}`
    : `mailto:${brandDossier.links.email}`;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="w-full hairline-b bg-canvas py-16 sm:py-20 lg:py-24 transition-colors"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-8 mb-10 hairline-b gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 bg-cobalt inline-block" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-widest text-cobalt font-semibold">
                COLLABORATION GATEWAY // DIRECT ACCESS
              </span>
            </div>
            <h2
              id="contact-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink-primary"
            >
              Let&apos;s build something that matters.
            </h2>
          </div>

          <p className="max-w-md font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
            Open to meaningful conversations, technical opportunities, startup collaborations, and business projects.
          </p>
        </div>

        {/* 12-Column Layout: Left Direct Channels, Right Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ========================================================= */}
          {/* LEFT COLUMN: Verified Channels & Direct Routing (5 Cols)  */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {/* Primary Communication Card */}
            <div className="p-6 sm:p-8 bg-surface hairline-border space-y-6">
              <div className="pb-4 hairline-b">
                <div className="font-mono text-[10px] uppercase tracking-widest text-cobalt font-semibold mb-1">
                  DIRECT CONTACT INBOX
                </div>
                <div className="font-serif text-2xl text-ink-primary font-normal">
                  Primary Routing Channel
                </div>
                <p className="font-sans text-xs sm:text-sm text-ink-secondary mt-2 leading-relaxed">
                  Monitored daily for engineering inquiries, venture collaborations, and direct business proposals.
                </p>
              </div>

              {/* Direct Email Trigger */}
              <div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-ink-meta mb-2">
                  Verified Email:
                </div>
                <a
                  href={`mailto:${brandDossier.links.email}`}
                  className="w-full inline-flex items-center justify-between p-3.5 bg-canvas hairline-border text-ink-primary hover:text-cobalt hover:border-cobalt transition-colors group focus-visible:outline-2 focus-visible:outline-cobalt"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Mail className="w-4 h-4 text-cobalt shrink-0" />
                    <span className="font-mono text-xs sm:text-sm truncate">
                      {brandDossier.links.email}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-ink-meta group-hover:text-cobalt shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>

              {/* Professional Profiles */}
              <div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-ink-meta mb-2">
                  Verified Profiles:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={brandDossier.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-canvas hairline-border flex items-center justify-between text-ink-primary hover:text-cobalt hover:border-cobalt transition-colors group focus-visible:outline-2 focus-visible:outline-cobalt"
                  >
                    <div className="flex items-center gap-2">
                      <LinkedinIcon className="w-4 h-4 text-cobalt" />
                      <span className="font-mono text-xs uppercase tracking-wider">LinkedIn</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-ink-meta group-hover:text-cobalt" />
                  </a>

                  <a
                    href={brandDossier.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-canvas hairline-border flex items-center justify-between text-ink-primary hover:text-cobalt hover:border-cobalt transition-colors group focus-visible:outline-2 focus-visible:outline-cobalt"
                  >
                    <div className="flex items-center gap-2">
                      <GithubIcon className="w-4 h-4 text-cobalt" />
                      <span className="font-mono text-xs uppercase tracking-wider">GitHub</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-ink-meta group-hover:text-cobalt" />
                  </a>
                </div>
              </div>
            </div>

            {/* Operating Grounding Ledger */}
            <div className="p-5 bg-surface/40 hairline-border font-mono text-[11px] text-ink-meta space-y-2">
              <div className="flex items-center justify-between text-ink-secondary">
                <span>LOCATION: {brandDossier.location.toUpperCase()}</span>
                <span className="text-cobalt">UTC+05:30</span>
              </div>
              <div>TYPICAL RESPONSE: WITHIN 24 TO 48 HOURS</div>
              <div className="pt-2 hairline-t text-[10px] text-ink-meta uppercase">
                Zero automated recruiters or unsolicited mass newsletters.
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Interactive Intent-Based Form (7 Cols)      */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 bg-surface/50 p-6 sm:p-8 lg:p-10 hairline-border">
            {!submittedData ? (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Honeypot field (hidden from screen readers & visual users) */}
                <div style={{ display: "none" }} aria-hidden="true">
                  <label htmlFor="website_trap">Leave this blank</label>
                  <input
                    type="text"
                    id="website_trap"
                    name="website_trap"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  />
                </div>

                {/* 1. Opportunity Type / Intent Selection */}
                <div>
                  <label className="block font-mono text-xs uppercase tracking-widest text-ink-meta mb-2.5">
                    Select Opportunity Intent:
                  </label>
                  <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Opportunity Intent">
                    {intents.map((intent) => {
                      const isSelected = formData.intent === intent;
                      return (
                        <button
                          key={intent}
                          type="button"
                          role="radio"
                          aria-checked={isSelected}
                          onClick={() => setFormData({ ...formData, intent })}
                          className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-all duration-150 focus-visible:outline-2 focus-visible:outline-cobalt ${
                            isSelected
                              ? "bg-cobalt text-white font-semibold shadow-sm"
                              : "bg-canvas text-ink-secondary hover:text-ink-primary hover:bg-surface-raised hairline-border"
                          }`}
                        >
                          {intent}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block font-mono text-xs uppercase tracking-wider text-ink-secondary mb-1.5"
                    >
                      Your Name <span className="text-cobalt">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      aria-invalid={errors.name ? "true" : "false"}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      placeholder="e.g. Alex Chen"
                      className={`w-full px-3.5 py-2.5 bg-canvas font-sans text-sm text-ink-primary hairline-border focus:outline-none focus:border-cobalt transition-colors ${
                        errors.name ? "border-red-500" : ""
                      }`}
                    />
                    {errors.name && (
                      <p id="name-error" role="alert" className="mt-1 text-xs font-mono text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block font-mono text-xs uppercase tracking-wider text-ink-secondary mb-1.5"
                    >
                      Email Address <span className="text-cobalt">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      placeholder="alex@company.com"
                      className={`w-full px-3.5 py-2.5 bg-canvas font-sans text-sm text-ink-primary hairline-border focus:outline-none focus:border-cobalt transition-colors ${
                        errors.email ? "border-red-500" : ""
                      }`}
                    />
                    {errors.email && (
                      <p id="email-error" role="alert" className="mt-1 text-xs font-mono text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* 3. Organization (Optional) */}
                <div>
                  <label
                    htmlFor="contact-org"
                    className="block font-mono text-xs uppercase tracking-wider text-ink-secondary mb-1.5"
                  >
                    Organization / Company <span className="text-ink-meta font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="contact-org"
                    name="organization"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. Acme Corp or Independent Founder"
                    className="w-full px-3.5 py-2.5 bg-canvas font-sans text-sm text-ink-primary hairline-border focus:outline-none focus:border-cobalt transition-colors"
                  />
                </div>

                {/* 4. Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block font-mono text-xs uppercase tracking-wider text-ink-secondary mb-1.5"
                  >
                    Message &amp; Overview <span className="text-cobalt">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: undefined });
                    }}
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    placeholder="Describe your initiative, technical challenge, or opportunity..."
                    className={`w-full px-3.5 py-2.5 bg-canvas font-sans text-sm text-ink-primary hairline-border focus:outline-none focus:border-cobalt transition-colors resize-y ${
                      errors.message ? "border-red-500" : ""
                    }`}
                  />
                  {errors.message && (
                    <p id="message-error" role="alert" className="mt-1 text-xs font-mono text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Server Error Alert */}
                {serverError && (
                  <div className="p-3 bg-red-500/10 hairline-border text-xs font-mono text-red-500 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{serverError}</span>
                  </div>
                )}

                {/* Submit Action */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-cobalt text-white font-mono text-xs sm:text-sm uppercase tracking-widest hover:bg-cobalt-hover transition-colors shadow-sm disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-cobalt"
                  >
                    {isSubmitting ? (
                      <span>Transmitting Dispatch...</span>
                    ) : (
                      <>
                        <span>Format &amp; Send Dispatch</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <div className="text-[10px] font-mono text-ink-meta uppercase text-center sm:text-right">
                    Zero Spam • End-to-End Client Verified
                  </div>
                </div>
              </form>
            ) : (
              /* Confirmation & Verified Dispatch State */
              <div className="p-6 sm:p-8 bg-canvas hairline-border space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center gap-3 pb-4 hairline-b text-cobalt font-mono text-xs uppercase font-semibold">
                  <CheckCircle2 className="w-5 h-5 text-cobalt shrink-0" />
                  <span>DISPATCH CONFIRMED &amp; RECORDED</span>
                </div>

                {/* Notification Delivery Telemetry */}
                {submissionResult && (
                  <div
                    className={`p-3.5 hairline-border text-xs font-mono flex items-start gap-2.5 ${
                      submissionResult.emailNotificationSent
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                        : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
                    }`}
                  >
                    {submissionResult.emailNotificationSent ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-0.5">
                      <div className="font-semibold uppercase tracking-wider text-[11px]">
                        {submissionResult.emailNotificationSent
                          ? "DATABASE RECORDED & EMAIL NOTIFICATION ROUTED"
                          : "DATABASE RECORDED • EMAIL NOTIFICATION DELAYED"}
                      </div>
                      <div className="text-[11px] opacity-90 leading-relaxed font-sans">
                        {submissionResult.message}
                        {submissionResult.submissionId && (
                          <span className="block font-mono text-[10px] mt-1 text-ink-meta">
                            Record Hash: #{submissionResult.submissionId}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2 text-ink-primary">
                  <div className="font-mono text-xs text-ink-meta uppercase tracking-wider">
                    Dispatch Summary:
                  </div>
                  <div className="p-4 bg-surface hairline-border font-mono text-xs space-y-1.5">
                    <div><span className="text-ink-meta">SENDER:</span> {submittedData.name} ({submittedData.email})</div>
                    <div><span className="text-ink-meta">INTENT:</span> {submittedData.intent}</div>
                    {submittedData.organization && (
                      <div><span className="text-ink-meta">ORG:</span> {submittedData.organization}</div>
                    )}
                    <div className="pt-2 hairline-t text-ink-secondary font-sans text-xs sm:text-sm">
                      {submittedData.message}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-surface/60 hairline-border text-xs font-mono text-ink-secondary space-y-2">
                  <div className="font-semibold text-ink-primary flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-cobalt" />
                    <span>Guaranteed Direct Delivery Route</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    To guarantee immediate delivery without third-party email drops, you can send this directly via your email client or copy the formatted dispatch text.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <a
                    href={mailtoHref}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-cobalt text-white font-mono text-xs uppercase tracking-wider hover:bg-cobalt-hover transition-colors shadow-sm focus-visible:outline-2 focus-visible:outline-cobalt text-center"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Open Email Client</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyDispatch}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-surface hairline-border text-ink-primary font-mono text-xs uppercase tracking-wider hover:bg-surface-raised transition-colors focus-visible:outline-2 focus-visible:outline-cobalt"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copied ? "Copied to Clipboard!" : "Copy Formatted Text"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedData(null);
                      setSubmissionResult(null);
                      setServerError(null);
                    }}
                    className="px-3 py-3 text-ink-meta hover:text-ink-primary font-mono text-xs uppercase tracking-wider"
                  >
                    Edit Form / Send Another
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section Footnote */}
        <div className="mt-10 p-4 bg-surface/50 hairline-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-ink-meta uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-cobalt inline-block" />
            <span>DIRECT INBOX: ADEPU.NISHANTH • ALL COMMUNICATIONS RESPECT PRIVACY</span>
          </div>
          <div className="text-ink-secondary">
            {brandDossier.location.toUpperCase()} • 2026
          </div>
        </div>
      </div>
    </section>
  );
}
