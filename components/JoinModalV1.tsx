"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { applyForm } from "@/lib/content-v1";

type JoinModalV1Props = {
  open: boolean;
  email: string;
  onClose: () => void;
};

type FormState = {
  firstName: string;
  lastName: string;
  workEmail: string;
  personalEmail: string;
  linkedinUrl: string;
  activeCpo: boolean;
  professionalLevel: string;
  reportingLevels: string;
  hris: string[];
  ats: string[];
};

type Errors = Partial<Record<keyof FormState, string>>;

const EMPTY: FormState = {
  firstName: "",
  lastName: "",
  workEmail: "",
  personalEmail: "",
  linkedinUrl: "",
  activeCpo: false,
  professionalLevel: "",
  reportingLevels: "",
  hris: [],
  ats: [],
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* "None" is exclusive within its group: picking it clears the rest, and
   picking anything else clears "None". */
function toggleOption(list: string[], value: string): string[] {
  if (value === "None") return list.includes("None") ? [] : ["None"];
  const rest = list.filter((v) => v !== "None" && v !== value);
  return list.includes(value) ? rest : [...rest, value];
}

/* V1 fork of JoinModal: the full cpohq.com application form as a 3-step
   modal on the brand near-black (#0b0d12, same as the investor bar and the
   featured love wall card). The panel keeps one fixed size across steps so
   nothing jumps on Continue. Submit collects the payload only; network
   wiring is the next phase and the payload shape is final. */
export default function JoinModalV1({ open, email, onClose }: JoinModalV1Props) {
  const stepRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

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

  /* Carry the email typed into the hero CTA straight into the form. */
  useEffect(() => {
    if (open && email) setForm((f) => ({ ...f, workEmail: email }));
  }, [open, email]);

  useEffect(() => {
    if (!open || submitted) return;
    stepRef.current
      ?.querySelector<HTMLElement>("input, select, button")
      ?.focus();
  }, [open, step, submitted]);

  if (!open) return null;

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  };

  const validateStep = (s: number): boolean => {
    const errs: Errors = {};
    const msg = applyForm.errors;
    if (s === 0) {
      if (!form.firstName.trim()) errs.firstName = msg.required;
      if (!form.lastName.trim()) errs.lastName = msg.required;
      if (!form.workEmail.trim()) errs.workEmail = msg.required;
      else if (!EMAIL_RE.test(form.workEmail.trim())) errs.workEmail = msg.email;
      if (!form.personalEmail.trim()) errs.personalEmail = msg.required;
      else if (!EMAIL_RE.test(form.personalEmail.trim()))
        errs.personalEmail = msg.email;
      if (!form.linkedinUrl.trim()) errs.linkedinUrl = msg.required;
      else if (!/linkedin\.com\//i.test(form.linkedinUrl))
        errs.linkedinUrl = msg.linkedin;
    } else if (s === 1) {
      if (!form.professionalLevel) errs.professionalLevel = msg.required;
      if (!form.reportingLevels) errs.reportingLevels = msg.required;
    } else {
      if (form.hris.length === 0) errs.hris = msg.selectOne;
      if (form.ats.length === 0) errs.ats = msg.selectOne;
    }
    setErrors(errs);
    return Object.keys(errs).filter((k) => errs[k as keyof FormState]).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(step)) return;
    if (step < applyForm.steps.length - 1) {
      setStep(step + 1);
      return;
    }
    /* Wiring phase replaces this log with the real submission call. */
    console.log("CPOHQ application payload", form);
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    if (submitted) {
      setForm(EMPTY);
      setStep(0);
      setErrors({});
      setSubmitted(false);
    }
  };

  /* Every field in the form is required; the asterisk marks it like the
     original cpohq.com form did. */
  const req = (
    <span className="apply-req" aria-hidden>
      *
    </span>
  );

  const field = (
    key: keyof FormState,
    label: string,
    props: React.InputHTMLAttributes<HTMLInputElement> = {},
  ) => (
    <div>
      <label htmlFor={`apply-${key}`} className="block text-sm font-medium">
        {label}
        {req}
      </label>
      <input
        id={`apply-${key}`}
        className={`modal-field mt-1.5 ${errors[key] ? "has-error" : ""}`}
        value={form[key] as string}
        onChange={(e) => set(key, e.target.value as FormState[typeof key])}
        aria-invalid={Boolean(errors[key])}
        aria-required
        {...props}
      />
      {errors[key] && <p className="apply-error mt-1">{errors[key]}</p>}
    </div>
  );

  const select = (key: "professionalLevel" | "reportingLevels", label: string, options: string[]) => (
    <div>
      <label htmlFor={`apply-${key}`} className="block text-sm font-medium">
        {label}
        {req}
      </label>
      <select
        id={`apply-${key}`}
        className={`modal-field apply-select mt-1.5 ${form[key] ? "" : "is-placeholder"} ${errors[key] ? "has-error" : ""}`}
        value={form[key]}
        onChange={(e) => set(key, e.target.value)}
        aria-invalid={Boolean(errors[key])}
        aria-required
      >
        <option value="" disabled>
          {applyForm.selectPlaceholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {errors[key] && <p className="apply-error mt-1">{errors[key]}</p>}
    </div>
  );

  const pills = (key: "hris" | "ats", label: string, options: string[]) => (
    <div>
      <span className="block text-sm font-medium">
        {label}
        {req}
      </span>
      <span className="block text-xs text-white/45 mt-0.5">{applyForm.multiHint}</span>
      <div className="mt-2.5 flex flex-wrap gap-2" role="group" aria-label={label}>
        {options.map((o) => (
          <button
            key={o}
            type="button"
            className="apply-pill"
            aria-pressed={form[key].includes(o)}
            onClick={() => set(key, toggleOption(form[key], o))}
          >
            {o}
          </button>
        ))}
      </div>
      {errors[key] && <p className="apply-error mt-1.5">{errors[key]}</p>}
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Apply to join CPOHQ"
    >
      <button
        aria-label="Close"
        onClick={handleClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px] cursor-default"
      />
      <div className="apply-dark relative w-full max-w-lg h-[min(760px,calc(100dvh-2rem))] flex flex-col bg-[#0b0d12] text-white rounded-brand border border-white/10 shadow-2xl p-8">
        {submitted ? (
          <div className="apply-step flex-1 flex flex-col items-center justify-center text-center">
            <span className="apply-success-mark" aria-hidden>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path
                  d="M4.5 11.5l4.5 4.5 8.5-10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h3 className="mt-4 font-display text-2xl leading-tight">
              {applyForm.success.title}
            </h3>
            <p className="mt-2 text-sm text-white/55 max-w-sm mx-auto">
              {applyForm.success.line}
            </p>
            <button
              onClick={handleClose}
              className="mt-6 rounded-full bg-accent text-accent-ink px-8 py-3 font-medium hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {applyForm.success.close}
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between gap-4 shrink-0">
              <div>
                <h3 className="font-display text-2xl leading-tight">
                  {applyForm.title}
                </h3>
                <p className="mt-2 text-sm text-white/55">{applyForm.sub}</p>
              </div>
              <button
                onClick={handleClose}
                aria-label="Close dialog"
                className="shrink-0 rounded-full border border-white/15 w-8 h-8 flex items-center justify-center text-white/60 hover:text-white focus-visible:outline-2 focus-visible:outline-accent"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </div>

            <div className="mt-6 flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-1.5" aria-hidden>
                {applyForm.steps.map((s, i) => (
                  <Fragment key={s.id}>
                    <span className={`apply-dot ${i <= step ? "is-active" : ""}`} />
                    {i < applyForm.steps.length - 1 && (
                      <span className={`apply-dot-line ${i < step ? "is-active" : ""}`} />
                    )}
                  </Fragment>
                ))}
              </div>
              <p className="text-xs text-white/50">
                Step {step + 1} of {applyForm.steps.length}: {applyForm.steps[step].label}
              </p>
            </div>

            <form className="mt-5 flex-1 min-h-0 flex flex-col" onSubmit={handleSubmit} noValidate>
              <div
                ref={stepRef}
                key={step}
                className="apply-step flex-1 min-h-0 overflow-y-auto grid gap-4 content-start pr-2 -mr-2"
              >
                {step === 0 && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      {field("firstName", applyForm.fields.firstName)}
                      {field("lastName", applyForm.fields.lastName)}
                    </div>
                    {field("workEmail", applyForm.fields.workEmail, { type: "email" })}
                    {field("personalEmail", applyForm.fields.personalEmail, { type: "email" })}
                    {field("linkedinUrl", applyForm.fields.linkedinUrl, {
                      type: "url",
                      placeholder: "linkedin.com/in/you",
                    })}
                  </>
                )}

                {step === 1 && (
                  <>
                    <label className="flex items-start gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        className="apply-check mt-0.5"
                        checked={form.activeCpo}
                        onChange={(e) => set("activeCpo", e.target.checked)}
                      />
                      <span className="text-sm">{applyForm.fields.activeCpo}</span>
                    </label>
                    {select(
                      "professionalLevel",
                      applyForm.fields.professionalLevel,
                      applyForm.professionalLevels,
                    )}
                    {select(
                      "reportingLevels",
                      applyForm.fields.reportingLevels,
                      applyForm.reportingLevelOptions,
                    )}
                  </>
                )}

                {step === 2 && (
                  <>
                    {pills("hris", applyForm.fields.hris, applyForm.hrisOptions)}
                    {pills("ats", applyForm.fields.ats, applyForm.atsOptions)}
                    <p className="text-xs text-white/50">
                      {applyForm.consent.before}
                      <a href={applyForm.consent.privacyHref} className="underline underline-offset-2 hover:text-white">
                        {applyForm.consent.privacyLabel}
                      </a>
                      {applyForm.consent.between}
                      <a href={applyForm.consent.termsHref} className="underline underline-offset-2 hover:text-white">
                        {applyForm.consent.termsLabel}
                      </a>
                      {applyForm.consent.after}
                    </p>
                  </>
                )}
              </div>

              <div className="mt-5 flex items-center justify-between gap-3 shrink-0">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={() => {
                      setErrors({});
                      setStep(step - 1);
                    }}
                    className="text-sm text-white/55 hover:text-white focus-visible:outline-2 focus-visible:outline-accent rounded-full px-2 py-1"
                  >
                    {applyForm.back}
                  </button>
                ) : (
                  <span />
                )}
                <button
                  type="submit"
                  className="rounded-full bg-accent text-accent-ink px-7 py-3 font-medium hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {step < applyForm.steps.length - 1 ? applyForm.next : applyForm.submit}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
