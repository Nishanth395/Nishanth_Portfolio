import React from "react";

export function DentalAIGraphic({ className = "w-full h-32" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-surface-recessed p-4 flex flex-col justify-between font-mono text-[9px] uppercase tracking-wider select-none ${className}`}>
      {/* Top Telemetry */}
      <div className="flex justify-between items-center text-ink-meta">
        <span>SCHEMA: CLINICAL PIPELINE</span>
        <span className="text-cobalt">AI WORKFLOW INTEGRATION</span>
      </div>

      {/* SVG Pipeline */}
      <svg viewBox="0 0 400 90" className="w-full h-16 text-hairline" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* Connection Bus */}
        <line x1="50" y1="45" x2="350" y2="45" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        
        {/* Node 1: Intake */}
        <rect x="20" y="25" width="60" height="40" fill="var(--canvas-substrate)" stroke="currentColor" strokeWidth="1" />
        <text x="50" y="48" fill="var(--ink-primary)" fontSize="8" fontFamily="monospace" textAnchor="middle">PATIENT</text>
        
        {/* Node 2: Records */}
        <rect x="120" y="25" width="60" height="40" fill="var(--canvas-substrate)" stroke="currentColor" strokeWidth="1" />
        <text x="150" y="48" fill="var(--ink-primary)" fontSize="8" fontFamily="monospace" textAnchor="middle">CHART</text>

        {/* Node 3: AI Engine */}
        <rect x="220" y="20" width="60" height="50" fill="var(--surface-raised)" stroke="var(--accent-cobalt)" strokeWidth="1.5" />
        <text x="250" y="44" fill="var(--accent-cobalt)" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">AI ASSIST</text>
        <text x="250" y="56" fill="var(--ink-meta)" fontSize="7" fontFamily="monospace" textAnchor="middle">INSIGHTS</text>

        {/* Node 4: Operatory */}
        <rect x="320" y="25" width="60" height="40" fill="var(--canvas-substrate)" stroke="currentColor" strokeWidth="1" />
        <text x="350" y="48" fill="var(--ink-primary)" fontSize="8" fontFamily="monospace" textAnchor="middle">CLINIC</text>

        {/* Status dots */}
        <circle cx="50" cy="18" r="2.5" fill="var(--accent-cobalt)" />
        <circle cx="150" cy="18" r="2.5" fill="var(--accent-cobalt)" />
        <circle cx="250" cy="12" r="3" fill="var(--accent-cobalt)" />
        <circle cx="350" cy="18" r="2.5" fill="var(--accent-cobalt)" />
      </svg>

      <div className="flex justify-between items-center text-[8px] text-ink-meta">
        <span>INPUT: PATIENT RECORDS</span>
        <span>OUTPUT: CLINICAL COORDINATION</span>
      </div>
    </div>
  );
}

export function FixMyBharatGraphic({ className = "w-full h-32" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-surface-recessed p-4 flex flex-col justify-between font-mono text-[9px] uppercase tracking-wider select-none ${className}`}>
      <div className="flex justify-between items-center text-ink-meta">
        <span>TOPOLOGY: CIVIC STATE MACHINE</span>
        <span className="text-cobalt">GEO-LOCATED REPORTING</span>
      </div>

      <svg viewBox="0 0 400 90" className="w-full h-16 text-hairline" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* Coordinate grid lines */}
        <line x1="20" y1="45" x2="380" y2="45" stroke="currentColor" strokeWidth="1" />
        <line x1="110" y1="15" x2="110" y2="75" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
        <line x1="200" y1="15" x2="200" y2="75" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
        <line x1="290" y1="15" x2="290" y2="75" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />

        {/* State Pillars */}
        <circle cx="65" cy="45" r="14" fill="var(--canvas-substrate)" stroke="currentColor" strokeWidth="1" />
        <text x="65" y="48" fill="var(--ink-primary)" fontSize="7" fontFamily="monospace" textAnchor="middle">REPORT</text>

        <circle cx="155" cy="45" r="14" fill="var(--canvas-substrate)" stroke="currentColor" strokeWidth="1" />
        <text x="155" y="48" fill="var(--ink-primary)" fontSize="7" fontFamily="monospace" textAnchor="middle">VERIFY</text>

        <circle cx="245" cy="45" r="14" fill="var(--surface-raised)" stroke="var(--accent-cobalt)" strokeWidth="1.5" />
        <text x="245" y="48" fill="var(--accent-cobalt)" fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">DISPATCH</text>

        <circle cx="335" cy="45" r="14" fill="var(--canvas-substrate)" stroke="currentColor" strokeWidth="1" />
        <text x="335" y="48" fill="var(--ink-primary)" fontSize="7" fontFamily="monospace" textAnchor="middle">RESOLVE</text>

        {/* Flow indicator */}
        <path d="M 82 45 L 138 45" stroke="var(--accent-cobalt)" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <path d="M 172 45 L 228 45" stroke="var(--accent-cobalt)" strokeWidth="1.5" />
        <path d="M 262 45 L 318 45" stroke="var(--accent-cobalt)" strokeWidth="1.5" strokeDasharray="3 3" />
      </svg>

      <div className="flex justify-between items-center text-[8px] text-ink-meta">
        <span>LOC: GEO-COORDINATES</span>
        <span>STATUS: TICKET LIFECYCLE</span>
      </div>
    </div>
  );
}

export function SyncMatesGraphic({ className = "w-full h-32" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-surface-recessed p-4 flex flex-col justify-between font-mono text-[9px] uppercase tracking-wider select-none ${className}`}>
      <div className="flex justify-between items-center text-ink-meta">
        <span>ARCHITECTURE: DIGITAL ENABLEMENT</span>
        <span className="text-cobalt">CLIENT SOLUTIONS</span>
      </div>

      <svg viewBox="0 0 400 90" className="w-full h-16 text-hairline" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* Layered rectangles representing web layers */}
        <rect x="40" y="20" width="130" height="50" fill="var(--canvas-substrate)" stroke="currentColor" strokeWidth="1" />
        <text x="105" y="42" fill="var(--ink-primary)" fontSize="8" fontFamily="monospace" textAnchor="middle">CLIENT BUSINESS</text>
        <text x="105" y="54" fill="var(--ink-meta)" fontSize="7" fontFamily="monospace" textAnchor="middle">REQUIREMENTS</text>

        <line x1="170" y1="45" x2="230" y2="45" stroke="var(--accent-cobalt)" strokeWidth="1.5" strokeDasharray="4 2" />
        <polygon points="225,41 233,45 225,49" fill="var(--accent-cobalt)" />

        <rect x="230" y="15" width="130" height="60" fill="var(--surface-raised)" stroke="var(--accent-cobalt)" strokeWidth="1.5" />
        <text x="295" y="38" fill="var(--accent-cobalt)" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">DIGITAL INFRA</text>
        <text x="295" y="50" fill="var(--ink-primary)" fontSize="7" fontFamily="monospace" textAnchor="middle">FAST RESPONSIVE WEB</text>
        <text x="295" y="62" fill="var(--ink-meta)" fontSize="7" fontFamily="monospace" textAnchor="middle">LEAD GATEWAY</text>
      </svg>

      <div className="flex justify-between items-center text-[8px] text-ink-meta">
        <span>FOCUS: LOCAL BUSINESS CONVERSION</span>
        <span>OUTPUT: MODERN WEB ASSETS</span>
      </div>
    </div>
  );
}

export function ProjectUnknownGraphic({ className = "w-full h-32" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-surface-recessed p-4 flex flex-col justify-between font-mono text-[9px] uppercase tracking-wider select-none ${className}`}>
      <div className="flex justify-between items-center text-ink-meta">
        <span>SANDBOX: 0-TO-1 R&amp;D</span>
        <span className="text-cobalt">HYPOTHESIS DRIVEN</span>
      </div>

      <svg viewBox="0 0 400 90" className="w-full h-16 text-hairline" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* Exploratory graph matrix */}
        <circle cx="80" cy="45" r="22" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
        <text x="80" y="47" fill="var(--ink-primary)" fontSize="7" fontFamily="monospace" textAnchor="middle">PROBLEM</text>

        <line x1="102" y1="45" x2="160" y2="45" stroke="currentColor" strokeWidth="1" />

        <rect x="160" y="25" width="80" height="40" fill="var(--canvas-substrate)" stroke="var(--accent-cobalt)" strokeWidth="1.2" />
        <text x="200" y="44" fill="var(--accent-cobalt)" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">PROTOTYPE</text>
        <text x="200" y="56" fill="var(--ink-meta)" fontSize="7" fontFamily="monospace" textAnchor="middle">ITERATION</text>

        <line x1="240" y1="45" x2="298" y2="45" stroke="currentColor" strokeWidth="1" />

        <circle cx="320" cy="45" r="22" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
        <text x="320" y="47" fill="var(--ink-primary)" fontSize="7" fontFamily="monospace" textAnchor="middle">VALIDATE</text>
      </svg>

      <div className="flex justify-between items-center text-[8px] text-ink-meta">
        <span>CYCLE: PROBLEM → PROTOTYPE → EVALUATION</span>
        <span>STATUS: ACTIVE R&amp;D</span>
      </div>
    </div>
  );
}

export function SriBalajiInteriorsGraphic({ className = "w-full h-36" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-surface-recessed p-4 flex flex-col justify-between font-mono text-[9px] uppercase tracking-wider select-none ${className}`}>
      <div className="flex justify-between items-center text-ink-meta">
        <span className="text-cobalt font-semibold">DELIVERED CLIENT SPECIFICATION</span>
        <span>LIVE: SRIBALAJIINTERIOR.COM</span>
      </div>

      <svg viewBox="0 0 400 95" className="w-full h-20 text-hairline" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* Drafting blueprint box */}
        <rect x="10" y="10" width="380" height="75" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" />
        
        {/* Showroom Sections */}
        <rect x="25" y="22" width="100" height="52" fill="var(--canvas-substrate)" stroke="currentColor" strokeWidth="1" />
        <text x="75" y="44" fill="var(--ink-primary)" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">SHOWROOM</text>
        <text x="75" y="56" fill="var(--ink-meta)" fontSize="7" fontFamily="monospace" textAnchor="middle">CATALOG</text>

        {/* Middle: Service Specs */}
        <rect x="145" y="22" width="110" height="52" fill="var(--canvas-substrate)" stroke="currentColor" strokeWidth="1" />
        <text x="200" y="44" fill="var(--ink-primary)" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">SERVICE SPECS</text>
        <text x="200" y="56" fill="var(--ink-meta)" fontSize="7" fontFamily="monospace" textAnchor="middle">MODULAR / WOOD</text>

        {/* Right: Direct Consultation */}
        <rect x="275" y="20" width="100" height="56" fill="var(--surface-raised)" stroke="var(--accent-cobalt)" strokeWidth="1.5" />
        <text x="325" y="42" fill="var(--accent-cobalt)" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">WHATSAPP</text>
        <text x="325" y="54" fill="var(--ink-primary)" fontSize="7" fontFamily="monospace" textAnchor="middle">CONSULTATION</text>
        <circle cx="325" cy="65" r="2.5" fill="var(--accent-cobalt)" />
      </svg>

      <div className="flex justify-between items-center text-[8px]">
        <span className="text-ink-secondary">COMMERCIAL VALUE: DIRECT CLIENT ENGAGEMENT</span>
        <span className="text-cobalt font-semibold">PRODUCTION LIVE ↗</span>
      </div>
    </div>
  );
}
