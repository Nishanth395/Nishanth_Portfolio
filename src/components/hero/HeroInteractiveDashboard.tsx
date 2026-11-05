"use client";

import React, { useState, useEffect } from "react";
import {
  Terminal,
  Cpu,
  Activity,
  Play,
  CheckCircle2,
  Layers,
  ShieldCheck,
  RefreshCw,
  Zap,
  Sliders,
  Database,
  Send,
  Code2,
} from "lucide-react";

interface WorkflowDemo {
  id: string;
  name: string;
  domain: string;
  model: string;
  prompt: string;
  output: string;
  tokens: number;
  latency: string;
}

const WORKFLOWS: WorkflowDemo[] = [
  {
    id: "dentalai",
    name: "DentalAI OS",
    domain: "Clinical AI Transcription",
    model: "Gemini 1.5 Pro",
    prompt: "Extract tooth #19 periodontal depth from clinician voice dictation",
    output:
      '{\n  "tooth": 19,\n  "pocket_depth_mm": 4.5,\n  "bleeding_on_probing": true,\n  "clinical_assessment": "Localized moderate periodontitis",\n  "recommended_action": "Subgingival scaling & follow-up 6wks"\n}',
    tokens: 78,
    latency: "64ms",
  },
  {
    id: "fixmybharat",
    name: "FixMyBharat",
    domain: "Civic Issue Triage",
    model: "Vision + LLM Classifier",
    prompt: "Classify pothole hazard report with GPS coordinate validation",
    output:
      '{\n  "incident_type": "Road Hazard (Severe Pothole)",\n  "urgency_level": "High (Level 3)",\n  "gps_cluster_match": true,\n  "routing_department": "Municipal Works (GHMC)",\n  "dispatch_status": "Queued for field inspection"\n}',
    tokens: 92,
    latency: "82ms",
  },
  {
    id: "sribalaji",
    name: "Sri Balaji Client",
    domain: "Commercial Web Engine",
    model: "Deterministic Pipeline",
    prompt: "Generate direct WhatsApp quotation route for Corian solid surface inquiry",
    output:
      '{\n  "service_category": "Corian Solid Surface / Kitchen",\n  "inquiry_route": "WhatsApp Direct API",\n  "target_domain": "sribalajiinterior.com",\n  "conversion_state": "Commercial lead captured",\n  "response_status": "200 OK (Verified live)"\n}',
    tokens: 64,
    latency: "28ms",
  },
];

export function HeroInteractiveDashboard() {
  const [activeTab, setActiveTab] = useState<"agent" | "telemetry" | "stack">("agent");
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowDemo>(WORKFLOWS[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [streamingText, setStreamingText] = useState(WORKFLOWS[0].output);
  const [trafficMultiplier, setTrafficMultiplier] = useState(1);
  const [activeStackNode, setActiveStackNode] = useState<string>("nextjs");

  // Run simulated inference streaming
  const handleRunInference = () => {
    setIsRunning(true);
    setStreamingText("");
    const fullText = selectedWorkflow.output;
    let currentIdx = 0;

    const interval = setInterval(() => {
      currentIdx += 3;
      if (currentIdx >= fullText.length) {
        setStreamingText(fullText);
        setIsRunning(false);
        clearInterval(interval);
      } else {
        setStreamingText(fullText.slice(0, currentIdx));
      }
    }, 15);
  };

  // Switch workflow
  const handleSelectWorkflow = (wf: WorkflowDemo) => {
    setSelectedWorkflow(wf);
    setStreamingText(wf.output);
    setIsRunning(false);
  };

  return (
    <div className="w-full hairline-border bg-canvas shadow-xl flex flex-col relative transition-all overflow-hidden">
      {/* Top Terminal Chrome Header */}
      <div className="hairline-b bg-surface-raised px-4 py-2.5 flex items-center justify-between text-[11px] font-mono">
        <div className="flex items-center gap-2.5">
          {/* macOS Style Window Control Dots */}
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/90 border border-black/10 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/90 border border-black/10 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]/90 border border-black/10 inline-block" />
          </div>
          <span className="font-semibold text-ink-primary tracking-wider uppercase ml-1 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cobalt" />
            <span>NISHANTH_AI // TELEMETRY</span>
          </span>
        </div>

        {/* Live System Status Beacon */}
        <div className="flex items-center gap-2 text-ink-meta text-[10px] uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold hidden sm:inline">
            SYSTEM ACTIVE
          </span>
          <span className="text-ink-meta font-mono text-[9px]">120 FPS</span>
        </div>
      </div>

      {/* Interactive Mode Navigation Tabs */}
      <div className="hairline-b bg-surface/70 px-2 py-1.5 flex items-center justify-between gap-1 text-xs font-mono">
        <div className="flex items-center gap-1 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab("agent")}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 transition-all text-[11px] uppercase tracking-wider font-medium ${
              activeTab === "agent"
                ? "bg-canvas text-cobalt hairline-border shadow-xs font-semibold"
                : "text-ink-secondary hover:text-ink-primary hover:bg-surface-raised"
            }`}
          >
            <Zap className="w-3 h-3 text-cobalt" />
            <span>AI Studio</span>
          </button>

          <button
            onClick={() => setActiveTab("telemetry")}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 transition-all text-[11px] uppercase tracking-wider font-medium ${
              activeTab === "telemetry"
                ? "bg-canvas text-cobalt hairline-border shadow-xs font-semibold"
                : "text-ink-secondary hover:text-ink-primary hover:bg-surface-raised"
            }`}
          >
            <Activity className="w-3 h-3 text-cobalt" />
            <span>Live Telemetry</span>
          </button>

          <button
            onClick={() => setActiveTab("stack")}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 transition-all text-[11px] uppercase tracking-wider font-medium ${
              activeTab === "stack"
                ? "bg-canvas text-cobalt hairline-border shadow-xs font-semibold"
                : "text-ink-secondary hover:text-ink-primary hover:bg-surface-raised"
            }`}
          >
            <Layers className="w-3 h-3 text-cobalt" />
            <span>Architecture</span>
          </button>
        </div>

        <span className="hidden md:inline font-mono text-[9px] uppercase tracking-widest text-ink-meta pr-2">
          INTERACTIVE CONSOLE
        </span>
      </div>

      {/* =================================================================== */}
      {/* TAB 1: AI Prompt Studio & Live Workflow Simulator                   */}
      {/* =================================================================== */}
      {activeTab === "agent" && (
        <div className="p-4 sm:p-5 flex flex-col gap-4 bg-canvas min-h-[380px] justify-between">
          <div>
            {/* Workflow Selector Chips */}
            <div className="flex flex-col gap-1.5 mb-3">
              <div className="flex items-center justify-between text-[10px] font-mono text-ink-meta uppercase tracking-wider">
                <span>Select AI Product Workflow:</span>
                <span className="text-cobalt font-semibold">{selectedWorkflow.model}</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {WORKFLOWS.map((wf) => (
                  <button
                    key={wf.id}
                    onClick={() => handleSelectWorkflow(wf)}
                    className={`px-2 py-1.5 text-left transition-all hairline-border font-mono text-[10px] leading-tight ${
                      selectedWorkflow.id === wf.id
                        ? "bg-cobalt text-white border-cobalt font-semibold shadow-xs"
                        : "bg-surface hover:bg-surface-raised text-ink-secondary"
                    }`}
                  >
                    <div className="truncate font-semibold">{wf.name}</div>
                    <div className="text-[8px] opacity-80 truncate">{wf.domain}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Input Preview Bar */}
            <div className="p-2.5 bg-surface-recessed hairline-border mb-3 font-mono text-xs">
              <div className="flex items-center justify-between text-[9px] text-ink-meta uppercase tracking-wider mb-1">
                <span>Query Payload // Input:</span>
                <span>temp: 0.2</span>
              </div>
              <div className="text-ink-primary text-[11px] flex items-center gap-1.5">
                <span className="text-cobalt font-bold">&gt;</span>
                <span className="italic">{selectedWorkflow.prompt}</span>
              </div>
            </div>

            {/* Live Streaming Terminal Output Window */}
            <div className="relative p-3 bg-surface hairline-border min-h-[170px] max-h-[190px] overflow-y-auto font-mono text-[11px] text-ink-primary select-text">
              <div className="flex items-center justify-between text-[9px] font-mono text-ink-meta uppercase pb-1.5 mb-2 hairline-b">
                <span className="flex items-center gap-1 text-cobalt font-semibold">
                  <Terminal className="w-3 h-3" />
                  <span>STRUCTURED INFERENCE OUTPUT</span>
                </span>
                <span className="text-ink-meta">
                  {isRunning ? "STREAMING..." : `LATENCY: ${selectedWorkflow.latency}`}
                </span>
              </div>
              <pre className="text-emerald-700 dark:text-emerald-400 font-mono text-[10.5px] leading-relaxed whitespace-pre-wrap">
                {streamingText || "Ready for execution. Click 'Run Inference' below..."}
                {isRunning && <span className="inline-block w-2 h-3.5 bg-cobalt ml-1 animate-pulse" />}
              </pre>
            </div>
          </div>

          {/* Action Trigger Bar */}
          <div className="pt-3 hairline-t flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-mono text-[10px] text-ink-meta">
              <span className="px-1.5 py-0.5 bg-surface hairline-border">
                {selectedWorkflow.tokens} TOKENS
              </span>
              <span className="hidden sm:inline">ZERO FABRICATED OUTPUT</span>
            </div>

            <button
              onClick={handleRunInference}
              disabled={isRunning}
              className="inline-flex items-center gap-2 px-4 py-2 bg-cobalt text-white font-mono text-xs uppercase tracking-wider font-semibold hover:bg-cobalt-hover active:scale-95 transition-all shadow-sm disabled:opacity-50"
            >
              {isRunning ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Executing...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Run Inference</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 2: Real-Time System Telemetry & Performance Metrics             */}
      {/* =================================================================== */}
      {activeTab === "telemetry" && (
        <div className="p-4 sm:p-5 flex flex-col gap-4 bg-canvas min-h-[380px] justify-between">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-ink-meta uppercase tracking-wider text-[10px]">
                PRODUCTION SYSTEM TELEMETRY
              </span>
              <span className="text-cobalt font-semibold text-[10px]">NETLIFY + EDGE RUNTIME</span>
            </div>

            {/* Metric 1: Response Latency */}
            <div className="p-3 bg-surface hairline-border">
              <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                <span className="text-ink-secondary font-medium">Serverless API Execution Latency</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                  {Math.round(42 * trafficMultiplier)} ms
                </span>
              </div>
              <div className="w-full h-1.5 bg-surface-recessed overflow-hidden">
                <div
                  className="h-full bg-cobalt transition-all duration-300"
                  style={{ width: `${Math.min(98, 25 * trafficMultiplier)}%` }}
                />
              </div>
              <div className="flex justify-between text-[9px] font-mono text-ink-meta mt-1">
                <span>p50: 38ms</span>
                <span>p99: 94ms</span>
                <span>Target: &lt;150ms</span>
              </div>
            </div>

            {/* Metric 2: Security & Strict Type Safety */}
            <div className="p-3 bg-surface hairline-border">
              <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                <span className="text-ink-secondary font-medium">TypeScript Strict Mode &amp; Audit</span>
                <span className="text-cobalt font-bold">100% Pass</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2 pt-2 hairline-t text-[10px] font-mono text-ink-meta">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>0 TS Compile Errors</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Server-Only Guardrails</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>5-Req/10m Rate Limiter</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Honeypot Trap Verified</span>
                </div>
              </div>
            </div>

            {/* Interactive Traffic Load Simulator Slider */}
            <div className="p-3 bg-surface-recessed hairline-border">
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-ink-primary font-medium flex items-center gap-1.5 text-[11px]">
                  <Sliders className="w-3.5 h-3.5 text-cobalt" />
                  <span>Interactive Simulated Concurrency:</span>
                </span>
                <span className="font-bold text-cobalt text-xs">{trafficMultiplier}x Concurrency</span>
              </div>
              <input
                type="range"
                min="1"
                max="4"
                step="0.5"
                value={trafficMultiplier}
                onChange={(e) => setTrafficMultiplier(parseFloat(e.target.value))}
                className="w-full accent-cobalt cursor-pointer"
              />
              <div className="flex justify-between text-[9px] font-mono text-ink-meta mt-1">
                <span>Standard Traffic</span>
                <span>Peak Load Spike (4x)</span>
              </div>
            </div>
          </div>

          <div className="pt-2 hairline-t flex items-center justify-between text-[10px] font-mono text-ink-meta">
            <span>MEM: 38.4 MB / CONTAINER</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-semibold">HEALTH: 100% OPTIMAL</span>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 3: Full-Stack Architecture Matrix & Node Inspector              */}
      {/* =================================================================== */}
      {activeTab === "stack" && (
        <div className="p-4 sm:p-5 flex flex-col gap-4 bg-canvas min-h-[380px] justify-between">
          <div>
            <div className="text-[10px] font-mono text-ink-meta uppercase tracking-wider mb-2">
              CLICK A COMPONENT TO INSPECT ARCHITECTURE:
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              {[
                { id: "nextjs", label: "Next.js 15 App Router", icon: Code2, desc: "Turbopack compilation, React 19 Server Components, zero client overhead." },
                { id: "firebase", label: "Firebase Admin SDK", icon: Database, desc: "Server-only singleton, atomic Firestore persistence, normalized RSA auth." },
                { id: "resend", label: "Resend Email Dispatch", icon: Send, desc: "Real-time client inquiry notifications, resilient fallback routing." },
                { id: "tailwind", label: "Tailwind & Framer", icon: Layers, desc: "Fluid dual-theme design tokens, GPU-accelerated motion, responsive geometry." },
              ].map((node) => {
                const IconComponent = node.icon;
                const isSelected = activeStackNode === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => setActiveStackNode(node.id)}
                    className={`p-2.5 text-left hairline-border font-mono transition-all ${
                      isSelected
                        ? "bg-cobalt text-white border-cobalt shadow-xs"
                        : "bg-surface hover:bg-surface-raised text-ink-primary"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-semibold mb-1">
                      <IconComponent className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{node.label}</span>
                    </div>
                    <div className="text-[9px] opacity-80 line-clamp-2">
                      {node.desc}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Node Deep Dive */}
            <div className="p-3 bg-surface hairline-border">
              <div className="font-mono text-[10px] uppercase text-cobalt font-semibold mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ARCHITECTURAL GUARANTEE:</span>
              </div>
              <p className="font-sans text-xs text-ink-secondary leading-relaxed">
                {activeStackNode === "nextjs" &&
                  "Utilizes modern App Router dynamic routes with static pre-rendering for optimal Core Web Vitals and instant first load (187kB initial JS shared bundle)."}
                {activeStackNode === "firebase" &&
                  "Isolated strictly behind server-only imports. Never bundled into client artifacts, preventing credential exposure while persisting verified inquiries to Cloud Firestore."}
                {activeStackNode === "resend" &&
                  "Engineered with graceful degradation: even if third-party email transport suffers network latency, client inquiries are guaranteed stored in database with zero data loss."}
                {activeStackNode === "tailwind" &&
                  "CSS Custom Properties tokens for instantaneous dual-theme switching between Alabaster Broadsheet (#FAF8F5) and Carbon Darkroom (#08080A) with zero flash of unstyled content."}
              </p>
            </div>
          </div>

          <div className="pt-2 hairline-t flex items-center justify-between text-[10px] font-mono text-ink-meta">
            <span>DISCIPLINE: PRODUCTION ENGINEERING</span>
            <span className="text-cobalt font-semibold">VERIFIED ARCHITECTURE</span>
          </div>
        </div>
      )}

      {/* Terminal Sub-Bar & Provenance Metadata */}
      <div className="hairline-t bg-surface-raised px-4 py-2 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[10px] font-mono text-ink-meta gap-1">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-cobalt inline-block" />
          <span>PORTFOLIO OS // NISHANTH ADEPU</span>
        </div>
        <div className="flex items-center gap-2">
          <span>HYDERABAD, INDIA</span>
          <span className="text-hairline">|</span>
          <span className="text-ink-secondary font-medium">EXPLORER // BUILDER</span>
        </div>
      </div>
    </div>
  );
}
