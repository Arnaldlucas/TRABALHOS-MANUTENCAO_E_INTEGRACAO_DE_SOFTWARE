// src/components/ErrorState.jsx
import React from "react";

export default function ErrorState({ message = "Ocorreu um erro.", onRetry = null }) {
  return (
    <div className="error-state" role="alert" aria-live="assertive" style={{ marginTop: 12 }}>
      <p>{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="mt-2 px-3 py-1 bg-gray-200 rounded">
          Tentar novamente
        </button>
      )}
    </div>
  );
}
