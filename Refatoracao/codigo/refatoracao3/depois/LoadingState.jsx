import {React} from "react";

export default function LoadingState({ message = "Carregando..." }) {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <svg width="20" height="20" viewBox="0 0 50 50" aria-hidden>
          <circle cx="25" cy="25" r="20" fill="none" strokeWidth="4" stroke="currentColor" strokeLinecap="round" />
        </svg>
        <span>{message}</span>
      </div>
    </div>
  );
}

