import React, { useEffect, useRef, useState } from "react";
import { budgets, goals, needs, requestBenefits, workSteps } from "../../data/siteData";
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

export default function ProcessAndRequest() {
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
          ...form,
        }),
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.message || "Не удалось отправить заявку.");
      }

      setStatus("success");
      setMessage("Заявка отправлена. Скоро свяжемся с вами.");
      setForm({ firstName: "", lastName: "", contact: "", description: "" });
      window.setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 4500);
    } catch (error) {
      setStatus("error");
      setMessage(error.message || "Не удалось отправить заявку.");
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
              <p className="mono eyebrow">Процесс</p>
              <h2>Как мы работаем</h2>
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
              <p className="mono eyebrow">Заявка</p>
              <h2>Расскажите о проекте</h2>
              
                
            </div>
            <div>
              <label className="mono">Цель</label>
              <ChipGroup items={goals} value={goal} onChange={setGoal} />
            </div>
            <div id="request-needs" className="request-needs">
              <label className="mono">Что нужно?</label>
              <ChipGroup items={needs} value={need} onChange={setNeed} highlightValue={highlightNeed} />
            </div>
            <div>
              <label className="mono">Бюджет</label>
              <ChipGroup items={budgets} value={budget} onChange={setBudget} />
            </div>
            <div className="form-grid">
              <label>
                <span className="mono">Имя</span>
                <input required placeholder="Иван" value={form.firstName} onChange={updateField("firstName")} />
              </label>
              <label>
                <span className="mono">Фамилия</span>
                <input required placeholder="Иванов" value={form.lastName} onChange={updateField("lastName")} />
              </label>
            </div>
            <label>
              <span className="mono">Telegram / телефон</span>
              <input required placeholder="@username или +7..." value={form.contact} onChange={updateField("contact")} />
            </label>
            <label>
              <span className="mono">О проекте</span>
              <textarea
                required
                rows="3"
                placeholder="Расскажите о задаче..."
                value={form.description}
                onChange={updateField("description")}
              />
            </label>
            <button className="submit-button" type="submit" disabled={status === "loading"}>
              <span>{status === "loading" ? "Отправляем..." : "Отправить заявку"}</span>
              <ArrowRight />
            </button>
          </form>
        </Reveal>
      </div>
      <FormToast
        status={status}
        message={message}
        onClose={() => {
          setStatus("idle");
          setMessage("");
        }}
      />
    </section>
  );
}
