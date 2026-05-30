import React from "react";

const toastCopy = {
  success: {
    title: "Заявка отправлена",
    defaultMessage: "Спасибо. Скоро свяжемся с вами.",
  },
  error: {
    title: "Не удалось отправить",
    defaultMessage: "Проверьте данные или попробуйте позже.",
  },
};

export default function FormToast({ status, message, onClose }) {
  if (status !== "success" && status !== "error") return null;

  const copy = toastCopy[status];

  return (
    <div className={`form-toast ${status}`} role="status" aria-live="polite">
      <div className="form-toast-icon" aria-hidden="true">
        {status === "success" ? "✓" : "!"}
      </div>
      <div className="form-toast-content">
        <strong>{copy.title}</strong>
        <span>{message || copy.defaultMessage}</span>
      </div>
      <button type="button" onClick={onClose} aria-label="Закрыть уведомление">
        ×
      </button>
    </div>
  );
}
