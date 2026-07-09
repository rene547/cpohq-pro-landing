"use client";

import { useEffect, useRef } from "react";
import { hero } from "@/lib/content";

type JoinModalProps = {
  open: boolean;
  email: string;
  onClose: () => void;
};

/* Placeholder for the existing cpohq.com application form; fields mirror it
   so swapping in the real embed/action is a one-line change. */
export default function JoinModal({ open, email, onClose }: JoinModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Apply to join CPOHQ"
    >
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px] cursor-default"
      />
      <div
        ref={panelRef}
        className="relative w-full max-w-md bg-card text-ink rounded-brand border border-line shadow-2xl p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl leading-tight">
              Apply to join CPOHQ.
            </h3>
            <p className="mt-2 text-sm text-muted">{hero.microcopy}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="shrink-0 rounded-full border border-line w-8 h-8 flex items-center justify-center text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        <form
          className="mt-6 grid gap-3"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="grid grid-cols-2 gap-3">
            <input className="modal-field" placeholder="First name" aria-label="First name" />
            <input className="modal-field" placeholder="Last name" aria-label="Last name" />
          </div>
          <input
            className="modal-field"
            placeholder="Work email"
            aria-label="Work email"
            type="email"
            defaultValue={email}
          />
          <input className="modal-field" placeholder="Company" aria-label="Company" />
          <input className="modal-field" placeholder="Title" aria-label="Title" />
          <input className="modal-field" placeholder="LinkedIn URL" aria-label="LinkedIn URL" />
          <button
            type="submit"
            className="mt-2 rounded-brand bg-accent text-accent-ink py-3 font-medium hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Submit application
          </button>
          <p className="text-xs text-muted text-center">
            Wired to the existing cpohq.com application on launch.
          </p>
        </form>
      </div>
    </div>
  );
}
