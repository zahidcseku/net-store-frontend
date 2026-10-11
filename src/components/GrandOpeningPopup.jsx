// Grand opening popup — shows once per visit, on any landing page.
// Rendered into document.body via a portal, mounted once at the app root
// (App.jsx). While open, the page behind it recedes (#root.go-recede) and
// the body goes navy so the receded corners read as depth, not a bug.
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./GrandOpeningPopup.css";

const OPENING_DATE = "24 October 2026";

const TITLE_WORDS = [
  { word: "We're", delay: "0.85s" },
  { word: "open", delay: "0.93s" },
  { word: "for", delay: "1.01s" },
  { word: "business", delay: "1.09s" },
];

export default function GrandOpeningPopup() {
  const [phase, setPhase] = useState("open"); // 'open' | 'leaving' | 'closed'
  const modalRef = useRef(null);
  const closeTimer = useRef(null);
  const prevFocus = useRef(null);
  const phaseRef = useRef("open");

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  const close = useCallback(() => {
    if (phaseRef.current !== "open") return;
    phaseRef.current = "leaving";
    setPhase("leaving");
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setPhase("closed"), 520);
  }, []);

  // Drop any pending close timer if the popup unmounts mid-animation.
  useEffect(() => () => clearTimeout(closeTimer.current), []);

  // On open: remember what was focused, move focus into the dialog.
  useEffect(() => {
    prevFocus.current = document.activeElement;
    modalRef.current?.focus();
  }, []);

  // Lock the page behind the modal: scroll lock, navy body, recede on #root.
  useEffect(() => {
    const root = document.getElementById("root");
    root.classList.add("go-recede");
    document.body.style.background = "var(--navy-950)";
    document.body.style.overflow = "hidden";
    return () => {
      root.classList.remove("go-recede", "go-return");
      document.body.style.background = "";
      document.body.style.overflow = "";
    };
  }, []);

  // Phase transitions: 'leaving' springs the page back, 'closed' cleans
  // up and restores focus to whatever had it before the popup opened.
  useEffect(() => {
    const root = document.getElementById("root");
    if (phase === "leaving") {
      root.classList.remove("go-recede");
      root.classList.add("go-return");
      document.body.style.overflow = "";
    } else if (phase === "closed") {
      root.classList.remove("go-recede", "go-return");
      document.body.style.background = "";
      if (prevFocus.current && document.contains(prevFocus.current)) {
        prevFocus.current.focus();
      }
    }
  }, [phase]);

  // Esc closes; Tab stays trapped inside the dialog while it's up.
  useEffect(() => {
    if (phase === "closed") return;
    function onKey(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === "Tab" && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, close]);

  if (phase === "closed") return null;

  return createPortal(
    <div
      className={phase === "leaving" ? "go-ov go-ov-out" : "go-ov"}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="go-stage">
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="go-title"
          tabIndex={-1}
          className={phase === "leaving" ? "go-modal go-modal-out" : "go-modal"}
        >
          <span className="go-grab" aria-hidden="true" />

          <div className="go-strip">
            <img src="/logo.webp" alt="the net store" className="go-logo" />
          </div>

          <button type="button" className="go-x" aria-label="Close" onClick={close}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          <div className="go-body">
            <span className="go-pill go-in" style={{ animationDelay: "0.75s" }}>
              Grand opening · {OPENING_DATE}
            </span>

            <h2 id="go-title" className="go-title">
              {TITLE_WORDS.map(({ word, delay }, i) => (
                <span key={word}>
                  <span className="go-w">
                    <span className="go-wi" style={{ animationDelay: delay }}>
                      {word}
                    </span>
                  </span>
                  {i < TITLE_WORDS.length - 1 ? " " : null}
                </span>
              ))}
            </h2>

            <p className="go-copy go-in" style={{ animationDelay: "1.2s" }}>
              Welcome to Net Store — laptops, phones, monitors and components, delivered fast.
              Take a look around and find your next upgrade.
            </p>

            <div className="go-trust">
              <div className="go-rule go-rule-top" style={{ animationDelay: "1.25s" }} />
              <ul>
                <li className="go-in" style={{ animationDelay: "1.35s" }}>
                  <svg className="go-draw" style={{ animationDelay: "1.4s" }} width="20" height="20" viewBox="0 0 24 24">
                    <path d="M12 3l7 3v5c0 4.6-3 7.6-7 9-4-1.4-7-4.4-7-9V6l7-3z" />
                    <path d="M9 11.5l2 2 4-4.5" />
                  </svg>
                  <span>Genuine warranty</span>
                </li>
                <li className="go-in" style={{ animationDelay: "1.45s" }}>
                  <svg className="go-draw" style={{ animationDelay: "1.5s" }} width="20" height="20" viewBox="0 0 24 24">
                    <path d="M2 7h11v8H2z" />
                    <path d="M13 10h4l3 3v2h-7v-5z" />
                    <circle cx="7" cy="17.5" r="1.8" />
                    <circle cx="17" cy="17.5" r="1.8" />
                    <path d="M9 17.5h6" />
                  </svg>
                  <span>Fast UK delivery</span>
                </li>
                <li className="go-in go-trust-3" style={{ animationDelay: "1.55s" }}>
                  <svg className="go-draw" style={{ animationDelay: "1.6s" }} width="20" height="20" viewBox="0 0 24 24">
                    <rect x="5" y="4" width="14" height="10" rx="1.5" />
                    <path d="M4 14h16l2 3.5H2L4 14z" />
                  </svg>
                  <span>Laptops to components</span>
                </li>
              </ul>
              <div className="go-rule go-rule-bottom" style={{ animationDelay: "1.35s" }} />
            </div>

            <div className="go-actions go-in" style={{ animationDelay: "1.65s" }}>
              <button type="button" className="btn btn-primary go-cta" onClick={close}>
                Start shopping
                <svg
                  className="go-arrow"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </button>
              <button type="button" className="btn btn-outline go-ghost" onClick={close}>
                Maybe later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
