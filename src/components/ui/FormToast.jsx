import React from "react";

export default function FormToast({ status, message, copy, onClose }) {
  if (status !== "success" && status !== "error") return null;

  const currentCopy = copy[status];

  return (
    <div className={`form-toast ${status}`} role="status" aria-live="polite">
      <div className="form-toast-icon" aria-hidden="true">
        {status === "success" ? "✓" : "!"}
      </div>
      <div className="form-toast-content">
        <strong>{currentCopy.title}</strong>
        <span>{message || currentCopy.defaultMessage}</span>
      </div>
      <button type="button" onClick={onClose} aria-label={copy.closeLabel}>
        ×
      </button>
    </div>
  );
}
