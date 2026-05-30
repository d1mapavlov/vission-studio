import React, { useEffect, useRef, useState } from "react";
import ArrowRight from "../ui/ArrowRight";
import ChipGroup from "../ui/ChipGroup";
import FormToast from "../ui/FormToast";
import Reveal from "../ui/Reveal";

function CheckIcon() {
  return (
    <svg className="request-benefit-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default function ProcessAndRequest({ data }) {
  const { budgets, goals, needs, request, requestBenefits, toast, workSteps } = data;
  const [goal, setGoal] = useState(goals[0]);
  const [need, setNeed] = useState(needs[0]);
  const [budget, setBudget] = useState(budgets[1]);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    description: "",
  });
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [highlightNeed, setHighlightNeed] = useState("");
  const highlightTimer = useRef(0);

  useEffect(() => {
    const selectNeed = (event) => {
      const selectedNeed = event.detail?.need;
      if (needs.includes(selectedNeed)) {
        setNeed(selectedNeed);
        setHighlightNeed("");
        window.clearTimeout(highlightTimer.current);
        window.requestAnimationFrame(() => {
          document.getElementById("request-needs")?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          setHighlightNeed(selectedNeed);
          highlightTimer.current = window.setTimeout(() => setHighlightNeed(""), 1400);
        });
      }
    };

    window.addEventListener("vission:select-need", selectNeed);
    return () => {
      window.removeEventListener("vission:select-need", selectNeed);
      window.clearTimeout(highlightTimer.current);
    };
  }, []);

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const submitLead = async (event) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "";
      const response = await fetch(`${apiUrl}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          goal,
          need,
          budget,
          language: data.locale.toUpperCase(),
          ...form,
        }),
      });
      const responseData = await response.json();

      if (!response.ok || !responseData.ok) {
        throw new Error(responseData.message || request.errorMessage);
      }

      setStatus("success");
      setMessage(request.successMessage);
      setForm({ firstName: "", lastName: "", contact: "", description: "" });
      window.setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 4500);
    } catch (error) {
      setStatus("error");
      setMessage(error.message || request.errorMessage);
      window.setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 6000);
    }
  };

  return (
    <section id="contact" className="request">
      <div className="container request-grid">
        <div className="process-copy">
          <div className="process-heading">
            <Reveal>
              <p className="mono eyebrow">{request.processEyebrow}</p>
              <h2>{request.processTitle}</h2>
            </Reveal>
          </div>
          <div className="step-list">
            {workSteps.map(([num, title, text], index) => (
              <Reveal className="step-row" delay={index * 55} key={title}>
                <span className="mono">{num}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal className="request-form-wrap">
          <form
            className="request-form"
            onSubmit={submitLead}
          >
            <div className="request-form-head">
              <p className="mono eyebrow">{request.formEyebrow}</p>
              <h2>{request.formTitle}</h2>
              {requestBenefits.length > 0 && (
                <div className="request-benefits">
                  {requestBenefits.map((benefit) => (
                    <span key={benefit}>
                      <CheckIcon />
                      {benefit}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div>
              <label className="mono">{request.goalLabel}</label>
              <ChipGroup items={goals} value={goal} onChange={setGoal} />
            </div>
            <div id="request-needs" className="request-needs">
              <label className="mono">{request.needLabel}</label>
              <ChipGroup items={needs} value={need} onChange={setNeed} highlightValue={highlightNeed} />
            </div>
            <div>
              <label className="mono">{request.budgetLabel}</label>
              <ChipGroup items={budgets} value={budget} onChange={setBudget} />
            </div>
            <div className="form-grid">
              <label>
                <span className="mono">{request.firstNameLabel}</span>
                <input required placeholder={request.firstNamePlaceholder} value={form.firstName} onChange={updateField("firstName")} />
              </label>
              <label>
                <span className="mono">{request.lastNameLabel}</span>
                <input required placeholder={request.lastNamePlaceholder} value={form.lastName} onChange={updateField("lastName")} />
              </label>
            </div>
            <label>
              <span className="mono">{request.contactLabel}</span>
              <input required placeholder={request.contactPlaceholder} value={form.contact} onChange={updateField("contact")} />
            </label>
            <label>
              <span className="mono">{request.descriptionLabel}</span>
              <textarea
                required
                rows="3"
                placeholder={request.descriptionPlaceholder}
                value={form.description}
                onChange={updateField("description")}
              />
            </label>
            <button className="submit-button" type="submit" disabled={status === "loading"}>
              <span>{status === "loading" ? request.loading : request.submit}</span>
              <ArrowRight />
            </button>
          </form>
        </Reveal>
      </div>
      <FormToast
        status={status}
        message={message}
        copy={toast}
        onClose={() => {
          setStatus("idle");
          setMessage("");
        }}
      />
    </section>
  );
}
